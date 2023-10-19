import { apiSlice } from "@/redux/api/apiSlice";
import { clearCartItems } from "./cartItemsSlice";

export const cartItemsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToDB: builder.mutation({
      query: (data) => ({
        url: "/cart-items",
        method: "POST",
        body: data,
      }),
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

export const { useAddToDBMutation } = cartItemsApi;
