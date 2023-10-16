import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const reagents = createSlice({
  name: "reagents",
  initialState,
  reducers: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = reagents.actions;
export default reagents.reducer;
