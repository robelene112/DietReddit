import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
  "commentsSlice/fetchComments",
  async (postNum, { getState }) => {
    const postToFetch = getState().postListSlice.posts[postNum];
    const permaLink = postToFetch.permalink.slice(0, -1);
    const redditUrl = "https://www.reddit.com";
    const url = redditUrl + permaLink + ".json";
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("Could not fetch resource");
    }
    const json = await response.json();

    return json;
  }
);

const commentsSlice = createSlice({
  name: "commentsSlice",
  initialState: { comments: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      const jsonComments = action.payload[1].data.children;
      const comments = [];
      for (const comment of jsonComments) {
        comments.push(comment.data);
      }
      state.comments = comments;
    });
  },
});

export const commentsSelector = (state) => state.commentsSlice.comments;

export default commentsSlice.reducer;
