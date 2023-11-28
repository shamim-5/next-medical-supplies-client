import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: null,
  finalPrice: null,
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setPrice: (state, action) => {
      state.totalPrice = action.payload.totalPrice;
      state.finalPrice = action.payload.finalPrice;
    },
  },
});

export const { setPrice } = priceSlice.actions;
export default priceSlice.reducer;
