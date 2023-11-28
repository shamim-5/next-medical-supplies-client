import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import cartItemsReducer from "./features/cart-items/cartItemsSlice";
import searchSliceReducer from "./features/helper/searchSlice";
import statusSliceReducer from "./features/helper/statusSlice";
import pathSliceReducer from "./features/path/pathSlice";
import priceSliceReducer from "./features/helper/priceSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    path: pathSliceReducer,
    cartItems: cartItemsReducer,
    search: searchSliceReducer,
    status: statusSliceReducer,
    price: priceSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
