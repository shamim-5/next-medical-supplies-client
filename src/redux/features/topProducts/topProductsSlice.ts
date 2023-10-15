import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const topProducts = createSlice({
  name: "top-products",
  initialState,
  reducers: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = topProducts.actions;
export default topProducts.reducer;
