import { apiSlice } from "@/redux/api/apiSlice";

export const cartItemsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToDB: builder.mutation({
      query: (data) => ({
        url: "/cart-items",
        method: "POST",
        body: data,
      }),
     
    }),
  }),
});

export const {useAddToDBMutation} = cartItemsApi;
