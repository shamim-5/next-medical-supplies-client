import { apiSlice } from "@/redux/api/apiSlice";

export const surgicalShopApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShopDetails: builder.query({
      query: () => `/shop-details`,
    }),
  }),
});

export const { useGetShopDetailsQuery } = surgicalShopApi;
