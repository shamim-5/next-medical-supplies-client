import { apiSlice } from "@/redux/api/apiSlice";

export const reagentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReagents: builder.query({
      query: () => `/reagents`,

      providesTags: [""],
    }),
  }),
});

export const { useGetReagentsQuery } = reagentsApi;
