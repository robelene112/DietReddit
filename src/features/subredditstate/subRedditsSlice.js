import { createSlice } from "@reduxjs/toolkit";
import askreddit from "./assets/askreddit.png";
import funny from "./assets/funny.png";
import mildlyinfuriating from "./assets/mildlyinfuriating.png";
import interestingasfuck from "./assets/interestingasf.png";
import gaming from "./assets/gaming.png";
import minecraft from "./assets/minecraft.png";
import movies from "./assets/movies.png";

const subRedditsSlice = createSlice({
  name: "subRedditsSlice",
  initialState: {
    selectedSubReddit: "AskReddit",
    subReddits: {
      AskReddit: askreddit,
      Mildlyinfuriating: mildlyinfuriating,
      Interestingasfuck: interestingasfuck,
      Gaming: gaming,
      Minecraft: minecraft,
      Movies: movies,
      Funny: funny,
    },
  },
  reducers: {
    selectSubReddit: (state, action) => {
      state.selectedSubReddit = action.payload;
    },
  },
});

export const selectedSubRedditSelector = (state) =>
  state.subRedditsSlice.selectedSubReddit;

export const SubRedditsSelector = (state) => state.subRedditsSlice.subReddits;

export const { selectSubReddit } = subRedditsSlice.actions;

export default subRedditsSlice.reducer;
