import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const consumables = createSlice({
  name: "consumables",
  initialState,
  reducers: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = consumables.actions;
export default consumables.reducer;
