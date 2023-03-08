import { configureStore } from "@reduxjs/toolkit";
import subRedditsSlice from "../features/subredditstate/subRedditsSlice";

export const store = configureStore({
  reducer: {
    subRedditsSlice,
  },
});
