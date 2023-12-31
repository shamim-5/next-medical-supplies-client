import { apiSlice } from "@/redux/api/apiSlice";

export const topProductsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopProducts: builder.query({
      query: () => `/top-products`,
    }),
    getDataById: builder.query({
      query: (id: string) => `top-products/${id}`,
    }),
    insertIntoDB: builder.mutation({
      query: (data: any) => ({
        url: "top-products",
        method: "POST",
        body: data,
      }),
    }),
    updateOneInDB: builder.mutation({
      query: ({ id, data }) => ({
        url: `top-products/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteByIdFromDB: builder.mutation({
      query: (id: string) => ({
        url: `top-products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTopProductsQuery,
  useGetDataByIdQuery,
  useInsertIntoDBMutation,
  useUpdateOneInDBMutation,
  useDeleteByIdFromDBMutation,
} = topProductsApi;
