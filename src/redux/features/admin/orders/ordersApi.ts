import { apiSlice } from "@/redux/api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPendingOrdersFromDB: builder.query({
      query: () => "/cart-items",

      providesTags: ["cart-items"],
    }),

    // orders collection enpoints
    getOrdersFromDB: builder.query({
      query: () => "/orders",

      providesTags: ["orders"],
    }),

    getOrdersFromDBbyEmail: builder.query({
      query: (email) => `/orders/${email}`,

      providesTags: ["orders"],
    }),

    addToOrdersDB: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["orders"],
    }),

    updateStatusById: builder.mutation({
      query: ({ data, id }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["orders"],
    }),

    // delete order from database cart-items collection
    deleteOrderById: builder.mutation({
      query: (orderId) => ({
        url: `/cart-items/${orderId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["cart-items"],
    }),
  }),
});

export const {
  useGetPendingOrdersFromDBQuery,
  useGetOrdersFromDBQuery,
  useAddToOrdersDBMutation,
  useUpdateStatusByIdMutation,
  useDeleteOrderByIdMutation,
  useGetOrdersFromDBbyEmailQuery,
} = ordersApi;
