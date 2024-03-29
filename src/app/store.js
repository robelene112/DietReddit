import { configureStore } from "@reduxjs/toolkit";
import subRedditsSlice from "../features/subreddits/subRedditsSlice";
import postListSlice from "../features/postlist/postListSlice";
import searchBarSlice from "../features/searchbar/searchBarSlice";

export const store = configureStore({
  reducer: {
    subRedditsSlice,
    postListSlice,
    searchBarSlice,
  },
});
