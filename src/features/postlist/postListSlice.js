import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "postListSlice/fetchPosts",
  async (arg, { getState }) => {
    const { selectedSubReddit } = getState().subRedditsSlice;
    const url = `https://www.reddit.com/r/${selectedSubReddit}.json`;
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("Could not fetch resource");
    }
    const json = await response.json();

    return json;
  }
);

export const fetchComments = createAsyncThunk(
  "postListSlice/fetchComments",
  async (postNum, { getState }) => {
    const postToFetch = getState().postListSlice.posts[postNum].content;
    const permaLink = postToFetch.permalink.slice(0, -1);
    const redditUrl = "https://www.reddit.com";
    const url = redditUrl + permaLink + ".json";
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("Could not fetch resource");
    }
    const json = await response.json();

    return { json: json, postNum: postNum };
  }
);

const postListSlice = createSlice({
  name: "postListSlice",
  initialState: { posts: [] },
  reducers: {
    viewComments: (state, action) => {
      state.posts[action.payload].showComments =
        !state.posts[action.payload].showComments;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        let posts = [];
        for (const post of action.payload.data.children) {
          posts.push({
            content: post.data,
            comments: [],
            showComments: false,
          });
        }
        state.posts = posts;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const jsonComments = action.payload.json[1].data.children;
        const comments = [];
        for (const comment of jsonComments) {
          comments.push(comment.data);
        }
        state.posts[action.payload.postNum].comments = comments;
      });
  },
});

export const { viewComments } = postListSlice.actions;

export const postListSliceSelector = (state) => state.postListSlice.posts;

export default postListSlice.reducer;
