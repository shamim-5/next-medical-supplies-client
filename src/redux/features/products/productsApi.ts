import { apiSlice } from "@/redux/api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ field, searchTerm }) =>
        searchTerm && field ? `/products?field=${field}&searchTerm=${searchTerm}` : `/products`,
    }),
    getProductsDataById: builder.query({
      query: (id: string) => `products/${id}`,
    }),
    insertProductsIntoDB: builder.mutation({
      query: (data: any) => ({
        url: "products",
        method: "POST",
        body: data,
      }),
    }),
    updateOneProductsInDB: builder.mutation({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteProductsByIdFromDB: builder.mutation({
      query: (id: string) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsDataByIdQuery,
  useInsertProductsIntoDBMutation,
  useUpdateOneProductsInDBMutation,
  useDeleteProductsByIdFromDBMutation,
} = productsApi;
