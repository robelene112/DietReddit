const { test, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert/strict");

let handler;
let originalFetch;
let originalEnv;

beforeEach(() => {
  originalFetch = global.fetch;
  originalEnv = { ...process.env };
  process.env.REDDIT_CLIENT_ID = "test-client";
  process.env.REDDIT_CLIENT_SECRET = "test-secret";
  process.env.REDDIT_USER_AGENT = "web:dietreddit:test";
  delete require.cache[require.resolve("../netlify/functions/reddit")];
  handler = require("../netlify/functions/reddit").handler;
});

afterEach(() => {
  global.fetch = originalFetch;
  process.env = originalEnv;
});

const request = (path = "/r/AskReddit.json", httpMethod = "GET") => ({
  httpMethod,
  queryStringParameters: { path },
});

const tokenResponse = () => Response.json({
  access_token: "test-token",
  expires_in: 3600,
});

test("authenticates once and returns listings and comments through the server", async () => {
  const calls = [];
  const listing = { data: { children: [{ data: { id: "abc123" } }] } };
  const comments = [listing, { data: { children: [] } }];
  global.fetch = async (url, options) => {
    calls.push({ url, options });
    if (url.endsWith("/access_token")) return tokenResponse();
    return Response.json(url.includes("/comments/") ? comments : listing);
  };

  const posts = await handler(request());
  const replies = await handler(request("/r/AskReddit/comments/abc123.json"));
  assert.equal(posts.statusCode, 200);
  assert.deepEqual(JSON.parse(posts.body), listing);
  assert.deepEqual(JSON.parse(replies.body), comments);
  assert.equal(calls.length, 3);
  assert.equal(calls[0].options.body, "grant_type=client_credentials");
  assert.equal(calls[0].options.headers.Authorization,
    `Basic ${Buffer.from("test-client:test-secret").toString("base64")}`);
  assert.equal(calls[1].url, "https://oauth.reddit.com/r/AskReddit.json?raw_json=1");
  assert.equal(calls[1].options.headers.Authorization, "Bearer test-token");
  assert.equal(calls[1].options.headers["User-Agent"], "web:dietreddit:test");
  assert.equal(calls[1].options.redirect, "error");
  assert.ok(!posts.body.includes("test-token"));
});

test("rejects methods and paths outside the app's read-only endpoints", async () => {
  global.fetch = () => assert.fail("Invalid requests must not reach Reddit");
  const result = await handler(request("/r/AskReddit.json", "POST"));
  assert.equal(result.statusCode, 405);
  assert.equal(result.headers.Allow, "GET");
  for (const path of ["", "https://example.com", "//example.com", "/api/me.json",
    "/r/../api/me.json", "/r/test.json?x=1", "/r/test/comments/abc/%2e%2e.json",
    ["/r/test.json"]]) {
    assert.equal((await handler(request(path))).statusCode, 400);
  }
});

test("proxies public posts and comments without credentials", async () => {
  delete process.env.REDDIT_CLIENT_ID;
  delete process.env.REDDIT_CLIENT_SECRET;
  const calls = [];
  global.fetch = async (url, options) => {
    calls.push({ url, options });
    return Response.json({ data: { children: [] } });
  };
  assert.equal((await handler(request())).statusCode, 200);
  assert.equal((await handler(request("/r/AskReddit/comments/abc123.json"))).statusCode, 200);
  assert.deepEqual(calls.map(({ url }) => url), [
    "https://www.reddit.com/r/AskReddit.json?raw_json=1",
    "https://www.reddit.com/r/AskReddit/comments/abc123.json?raw_json=1",
  ]);
  for (const { options } of calls) {
    assert.equal(options.headers.Authorization, undefined);
    assert.equal(options.headers.Cookie, undefined);
    assert.equal(options.headers.Origin, undefined);
  }
});

test("reports incomplete optional authentication configuration", async () => {
  delete process.env.REDDIT_CLIENT_SECRET;
  global.fetch = () => assert.fail("Incomplete credentials should not reach Reddit");
  const result = await handler(request());
  assert.equal(result.statusCode, 503);
  assert.match(JSON.parse(result.body).error, /not configured/);
});

test("converts Reddit HTML errors into readable JSON and preserves status", async () => {
  delete process.env.REDDIT_CLIENT_ID;
  delete process.env.REDDIT_CLIENT_SECRET;
  for (const status of [403, 429]) {
    global.fetch = async (url) => url.endsWith("/access_token")
      ? tokenResponse()
      : new Response("<html>blocked</html>", { status });
    const result = await handler(request());
    assert.equal(result.statusCode, status);
    assert.equal(result.headers["Cache-Control"], "no-store");
    assert.equal(typeof JSON.parse(result.body).error, "string");
    assert.ok(!result.body.includes("<html>"));
  }
});

test("discards a rejected OAuth token before the next request", async () => {
  let tokenRequests = 0;
  global.fetch = async (url) => {
    if (url.endsWith("/access_token")) {
      tokenRequests++;
      return tokenResponse();
    }
    return new Response("", { status: 401 });
  };
  assert.equal((await handler(request())).statusCode, 401);
  assert.equal((await handler(request())).statusCode, 401);
  assert.equal(tokenRequests, 2);
});

test("hides upstream authentication errors and network exception details", async () => {
  global.fetch = async () => new Response("sensitive details", { status: 401 });
  assert.equal((await handler(request())).statusCode, 502);
  global.fetch = async () => { throw new Error("test-secret"); };
  const result = await handler(request());
  assert.equal(result.statusCode, 502);
  assert.ok(!result.body.includes("test-secret"));
});

test("handles invalid JSON from upstream", async () => {
  global.fetch = async (url) => url.endsWith("/access_token")
    ? tokenResponse()
    : new Response("not JSON");
  assert.equal((await handler(request())).statusCode, 502);
});
