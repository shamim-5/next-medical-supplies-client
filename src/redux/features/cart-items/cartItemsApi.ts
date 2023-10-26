import { apiSlice } from "@/redux/api/apiSlice";
import { clearCartItems } from "./cartItemsSlice";

export const cartItemsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDataFromDB: builder.query({
      query: () => "/cart-items",

      providesTags: ["cart-items"],
    }),

    getDataFromDBbyEmail: builder.query({
      query: (email) => `/cart-items/${email}`,

      providesTags: ["cart-items"],
    }),

    addToDB: builder.mutation({
      query: (data) => ({
        url: "/cart-items",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cart-items"],

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result) {
            dispatch(clearCartItems());
          }
        } catch (error) {
          // do nothing
        }
      },
    }),
  }),
});

export const { useAddToDBMutation, useGetDataFromDBQuery, useGetDataFromDBbyEmailQuery } = cartItemsApi;
