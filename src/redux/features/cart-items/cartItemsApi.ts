import { apiSlice } from "@/redux/api/apiSlice";

export const cartItemsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToDB: builder.mutation({
      query: (data) => ({
        url: "/cart-items",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          console.log(result);
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const {} = cartItemsApi;
