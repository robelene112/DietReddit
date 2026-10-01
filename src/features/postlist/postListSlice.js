import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchReddit } from "../../api/reddit";

export const fetchPosts = createAsyncThunk(
  "postListSlice/fetchPosts",
  async (arg, { getState }) => {
    const { selectedSubReddit } = getState().subRedditsSlice;
    return fetchReddit(`/r/${selectedSubReddit}.json`);
  }
);

export const fetchComments = createAsyncThunk(
  "postListSlice/fetchComments",
  async (postNum, { getState }) => {
    const postToFetch = getState().postListSlice.posts[postNum].content;
    // The ID is sufficient; titles in permalinks may contain encoded characters.
    const json = await fetchReddit(
      `/r/${postToFetch.subreddit}/comments/${postToFetch.id}.json`
    );

    return { json: json, postNum: postNum };
  }
);

const postListSlice = createSlice({
  name: "postListSlice",
  initialState: { posts: [], error: null },
  reducers: {
    viewComments: (state, action) => {
      state.posts[action.payload].showComments =
        !state.posts[action.payload].showComments;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message;
      })
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
      .addCase(fetchComments.pending, (state, action) => {
        state.posts[action.meta.arg].commentsError = null;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        const post = state.posts[action.meta.arg];
        if (post) post.commentsError = action.error.message;
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
