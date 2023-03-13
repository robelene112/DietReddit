import { configureStore } from "@reduxjs/toolkit";
import subRedditsSlice from "../features/subredditstate/subRedditsSlice";
import postListSlice from "../features/postlist/postListSlice";
import commentsSlice from "../features/comments/commentsSlice";

export const store = configureStore({
  reducer: {
    subRedditsSlice,
    postListSlice,
    commentsSlice,
  },
});
