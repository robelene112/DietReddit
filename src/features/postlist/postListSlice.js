import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchPosts = createAsyncThunk(
  "postListSlice/fetchPosts",
  async (arg, { getState }) => {
    const { selectedSubreddit } = getState().selectedSubReddit;
  }
);

const postListSlice = createSlice({
  name: "postListSlice",
  initialState: { posts: [] },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase();
  },
});

export const postListSliceSelector = (state) => state.postListSlice.value;

export const {} = postListSlice.actions;

export default postListSlice.reducer;
