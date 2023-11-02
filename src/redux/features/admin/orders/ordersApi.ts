import { apiSlice } from "@/redux/api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetOrdersFromDBQuery,
  useAddToOrdersDBMutation,
  useUpdateStatusByIdMutation,
  useGetOrdersFromDBbyEmailQuery,
} = ordersApi;
