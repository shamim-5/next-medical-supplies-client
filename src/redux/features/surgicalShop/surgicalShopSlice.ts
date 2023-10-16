import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const surgicalShop = createSlice({
  name: "surgical-shop",
  initialState,
  reducers: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = surgicalShop.actions;
export default surgicalShop.reducer;
