import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const products = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = products.actions;
export default products.reducer;
