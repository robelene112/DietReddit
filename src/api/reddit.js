export async function fetchReddit(path) {
  const response = await fetch(`/api/reddit?path=${encodeURIComponent(path)}`);
  const json = await response.json().catch(() => {
    throw new Error("Unable to load Reddit. Please try again later.");
  });
  if (!response.ok) {
    throw new Error(json.error || `Reddit request failed (${response.status}).`);
  }
  return json;
}
