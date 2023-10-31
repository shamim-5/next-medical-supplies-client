import { apiSlice } from "@/redux/api/apiSlice";

export const topProductsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopProducts: builder.query({
      query: () => `/top-products`,
    }),
  }),
});

export const { useGetTopProductsQuery } = topProductsApi;
