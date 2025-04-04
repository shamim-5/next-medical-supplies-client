import { apiSlice } from "@/redux/api/apiSlice";
import { dueListApi } from "../dueList/dueListApi";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersFromDB: builder.query({
      query: () => "/orders",

      providesTags: ["due-list", "orders"],
    }),

    getOrdersFromDBbyEmail: builder.query({
      query: (email) => `/orders/${email}`,

      providesTags: ["due-list", "orders"],
    }),

    addToOrdersDB: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["due-list", "orders"],
    }),

    updateStatusById: builder.mutation({
      query: ({ data, id }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;

        // silent entry to due-list collection
        if (result?.data?.data && arg.rest) {
          const orderData = result?.data?.data;
          const restData = arg.rest;

          dispatch(
            dueListApi.endpoints.addToDueListDB.initiate({
              userName: orderData.userName,
              email: orderData.email,
              paid: orderData.paid,
              timestamp: orderData.timestamp,
              totalPrice: restData.totalPrice,
              discount: restData.discount,
              discountPrice: restData.discountPrice,
              orderId: orderData.id,
            })
          );
        }
      },

      invalidatesTags: ["due-list", "orders"],
    }),

    updateOrdersStatusById: builder.mutation({
      query: ({ data, id }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["due-list", "orders"],
    }),
  }),
});

export const {
  useGetOrdersFromDBQuery,
  useAddToOrdersDBMutation,
  useUpdateStatusByIdMutation,
  useGetOrdersFromDBbyEmailQuery,
  useUpdateOrdersStatusByIdMutation,
} = ordersApi;
