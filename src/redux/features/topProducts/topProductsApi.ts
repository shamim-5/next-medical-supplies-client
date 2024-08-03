import { apiSlice } from "@/redux/api/apiSlice";

export const topProductsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopProducts: builder.query({
      query: () => `/top-products`,

      providesTags: ["top-products"],
    }),
    getDataByIdTopProducts: builder.query({
      query: (id: string) => `top-products/${id}`,

      providesTags: ["top-products"],
    }),
    insertIntoDBTopProducts: builder.mutation({
      query: (data: any) => ({
        url: "top-products",
        method: "POST",
        body: data,
      }),
    }),
    updateOneInDBTopProducts: builder.mutation({
      query: ({ id, data }) => ({
        url: `top-products/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteByIdFromDBTopProducts: builder.mutation({
      query: (id: string) => ({
        url: `top-products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTopProductsQuery,
  useGetDataByIdTopProductsQuery,
  useInsertIntoDBTopProductsMutation,
  useUpdateOneInDBTopProductsMutation,
  useDeleteByIdFromDBTopProductsMutation,
} = topProductsApi;
