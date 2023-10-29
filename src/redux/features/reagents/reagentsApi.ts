import { apiSlice } from "@/redux/api/apiSlice";

export const reagentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReagents: builder.query({
      query: ({ field, searchTerm }) =>
        searchTerm && field ? `/reagents?field=${field}&searchTerm=${searchTerm}` : `/reagents`,
    }),
  }),
});

export const { useGetReagentsQuery } = reagentsApi;
