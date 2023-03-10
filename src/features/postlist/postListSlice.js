import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

const postListSlice = createSlice({
  name: "postListSlice",
  initialState: { posts: [] },
  reducers: {},
  extraReducers: {
    [fetchPosts.fulfilled]: (state, action) => {
      let posts = [];
      for (const post of action.payload.data.children) {
        posts.push(post.data);
      }
      state.posts = posts;
    },
    [fetchPosts.rejected]: (state, action) => {
      console.log("rejected");
    },
  },
});

export const postListSliceSelector = (state) => state.postListSlice.posts;

export default postListSlice.reducer;
