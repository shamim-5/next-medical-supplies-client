import { apiSlice } from "@/redux/api/apiSlice";

export const consumablesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsumables: builder.query({
      query: ({ field, searchTerm }) =>
        searchTerm && field ? `/consumables?field=${field}&searchTerm=${searchTerm}` : `/consumables`,
    }),
  }),
});

export const { useGetConsumablesQuery } = consumablesApi;
