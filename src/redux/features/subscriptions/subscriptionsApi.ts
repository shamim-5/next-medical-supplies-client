import { apiSlice } from "@/redux/api/apiSlice";

const subscriptionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query({
      query: () => `/subscriptions`,
    }),

    insertSubscriptionsIntoDB: builder.mutation({
      query: (data: any) => ({
        url: "/subscriptions",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetSubscriptionsQuery, useInsertSubscriptionsIntoDBMutation } = subscriptionsApi;
