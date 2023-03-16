import { createSlice } from "@reduxjs/toolkit";

const searchBarSlice = createSlice({
  name: "searchBarSlice",
  initialState: { searchedPosts: [], searchBarValue: "" },
  reducers: {
    updateValue: (state, action) => {
      state.searchBarValue = action.payload;
    },
    filterPosts: (state, action) => {
      state.searchedPosts = action.payload;
    },
  },
});

export const { updateValue, filterPosts } = searchBarSlice.actions;

export const searchBarValueSelector = (state) =>
  state.searchBarSlice.searchBarValue;

export const searchedPostsSelector = (state) =>
  state.searchBarSlice.searchedPosts;

export default searchBarSlice.reducer;
