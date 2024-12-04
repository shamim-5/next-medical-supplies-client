import { apiSlice } from "@/redux/api/apiSlice";
import { ordersApi } from "../orders/ordersApi";

export const dueListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDueListFromDB: builder.query({
      query: () => "/due-list",

      providesTags: ["due-list", "orders"],
    }),

    getDueListFromDBbyEmail: builder.query({
      query: (email) => `/due-list/${email}`,

      providesTags: ["due-list", "orders"],
    }),

    addToDueListDB: builder.mutation({
      query: (data) => ({
        url: "/due-list",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["due-list", "orders"],
    }),

    updateDueListById: builder.mutation({
      query: ({ data, id }) => ({
        url: `/due-list/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;

        // silent update to orders collection
        if (arg?.orderId) {
          const orderId = result?.data?.data?.orderId;
          dispatch(
            ordersApi.endpoints.updateOrdersStatusById.initiate({
              data: { paid: true },
              id: orderId,
            })
          );
        }
      },

      invalidatesTags: ["due-list", "orders"],
    }),
  }),
});

export const {
  useGetDueListFromDBQuery,
  useAddToDueListDBMutation,
  useUpdateDueListByIdMutation,
  useGetDueListFromDBbyEmailQuery,
} = dueListApi;
