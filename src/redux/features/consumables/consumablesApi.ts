import { apiSlice } from "@/redux/api/apiSlice";

export const consumablesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsumables: builder.query({
      query: () => `/consumables`,

      providesTags: [""],
    }),
  }),
});

export const { useGetConsumablesQuery } = consumablesApi;
