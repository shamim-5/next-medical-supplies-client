import { RootState } from "./../store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedOut } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_DATABASE_URL,
  prepareHeaders: async (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state?.auth?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
      api.dispatch(userLoggedOut());
      localStorage.clear();
    }

    return result;
  },

  tagTypes: [
    "cart-items",
    "orders",
    "due-list",
    "reviews",
    "user-details",
    "file-uploads",
    "dynamic",
    "products",
    "medical-equipments",
    "consumables",
    "devices",
    "reagents",
    "top-products",
  ],
  endpoints: () => ({}),
});
