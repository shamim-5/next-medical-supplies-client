import { apiSlice } from "@/redux/api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/products`,

      providesTags: [""],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
