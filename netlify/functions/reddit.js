const userAgent = () =>
  process.env.REDDIT_USER_AGENT || "web:dietreddit:v0.1.0";

let cachedToken;

const reply = (statusCode, data, headers = {}) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...headers,
  },
  body: JSON.stringify(data),
});

async function getToken(signal) {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }

  const credentials = Buffer.from(
    `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`
  ).toString("base64");
  const response = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": userAgent(),
    },
    body: "grant_type=client_credentials",
    redirect: "error",
    signal,
  });

  if (!response.ok) {
    throw new Error("Reddit authentication failed");
  }
  const token = await response.json();
  if (!token.access_token || !Number.isFinite(token.expires_in)) {
    throw new Error("Invalid Reddit authentication response");
  }
  cachedToken = {
    value: token.access_token,
    expiresAt: Date.now() + Math.max(0, token.expires_in - 60) * 1000,
  };
  return cachedToken.value;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return reply(405, { error: "Method not allowed." }, { Allow: "GET" });
  }

  // Only the public listing and comment paths used by this app are allowed.
  const path = event.queryStringParameters?.path || "";
  if (typeof path !== "string" || !/^\/r\/[A-Za-z0-9_]+(?:\/comments\/[a-z0-9]+)?\.json$/.test(path)) {
    return reply(400, { error: "Invalid Reddit path." });
  }
  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;
  if (Boolean(clientId) !== Boolean(clientSecret)) {
    return reply(503, {
      error: "Reddit access is not configured yet. Please try again later.",
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const headers = { "User-Agent": userAgent(), Accept: "application/json" };
    let origin = "https://www.reddit.com";
    if (clientId && clientSecret) {
      headers.Authorization = `Bearer ${await getToken(controller.signal)}`;
      origin = "https://oauth.reddit.com";
    }
    const response = await fetch(`${origin}${path}?raw_json=1`, {
      headers,
      redirect: "error",
      signal: controller.signal,
    });

    if (!response.ok) {
      if (response.status === 401) cachedToken = undefined;
      const error = response.status === 429
        ? "Reddit is receiving too many requests. Please try again shortly."
        : `Reddit could not load this content (${response.status}). Please try again later.`;
      return reply(response.status, { error });
    }
    return reply(200, await response.json());
  } catch (error) {
    return reply(controller.signal.aborted ? 504 : 502, {
      error: "Unable to connect to Reddit. Please try again later.",
    });
  } finally {
    clearTimeout(timeout);
  }
};
