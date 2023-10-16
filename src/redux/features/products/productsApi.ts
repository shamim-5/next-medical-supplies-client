import { apiSlice } from "@/redux/api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ field, searchTerm }) =>
        searchTerm && field ? `/products?field=${field}&searchTerm=${searchTerm}` : `/products`,

      providesTags: [""],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
