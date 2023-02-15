import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
  name: "testslice",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const testSliceSelector = (state) => state.testSlice.value;

export const { increment } = testSlice.actions;

export default testSlice.reducer;
