import { configureStore } from "@reduxjs/toolkit";
import reducer, { fetchPosts, fetchComments } from "./postListSlice";

describe("Reddit requests", () => {
  const originalFetch = global.fetch;
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        postListSlice: reducer,
        subRedditsSlice: () => ({ selectedSubReddit: "AskReddit" }),
      },
    });
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  test("loads posts and comments from the same origin", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { children: [{ data: {
        id: "abc123", subreddit: "AskReddit", title: "Example post",
      } }] } }),
    }).mockResolvedValueOnce({
      ok: true,
      json: async () => [{}, { data: { children: [{ data: { body: "Reply" } }] } }],
    });

    await store.dispatch(fetchPosts());
    await store.dispatch(fetchComments(0));
    expect(global.fetch.mock.calls.map(([url]) => url)).toEqual([
      "/api/reddit?path=%2Fr%2FAskReddit.json",
      "/api/reddit?path=%2Fr%2FAskReddit%2Fcomments%2Fabc123.json",
    ]);
    expect(store.getState().postListSlice.posts[0].comments).toEqual([{ body: "Reply" }]);
  });

  test("exposes a backend error and clears it on retry", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Reddit access is not configured yet." }),
    });
    await store.dispatch(fetchPosts());
    expect(store.getState().postListSlice.error).toBe("Reddit access is not configured yet.");
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { children: [] } }),
    });
    await store.dispatch(fetchPosts());
    expect(store.getState().postListSlice.error).toBeNull();
  });

  test("reports a comment failure on its post", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { children: [{ data: {
        id: "abc123", subreddit: "AskReddit",
      } }] } }),
    }).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Reddit is receiving too many requests." }),
    });
    await store.dispatch(fetchPosts());
    await store.dispatch(fetchComments(0));
    expect(store.getState().postListSlice.posts[0].commentsError)
      .toBe("Reddit is receiving too many requests.");
  });
});
