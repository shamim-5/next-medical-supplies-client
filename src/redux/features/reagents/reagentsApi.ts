import { apiSlice } from "@/redux/api/apiSlice";

export const reagentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReagents: builder.query({
      query: ({ field, searchTerm }) =>
        searchTerm && field ? `/reagents?field=${field}&searchTerm=${searchTerm}` : `/reagents`,

      providesTags: ["reagents"],
    }),
    getReagentDataById: builder.query({
      query: (id: string) => `/reagents/${id}`,

      providesTags: ["reagents"],
    }),
    insertReagentIntoDB: builder.mutation({
      query: (data: any) => ({
        url: "/reagents",
        method: "POST",
        body: data,
      }),
    }),
    updateOneReagentInDB: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reagents/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteReagentByIdFromDB: builder.mutation({
      query: (id: string) => ({
        url: `/reagents/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetReagentsQuery,
  useGetReagentDataByIdQuery,
  useInsertReagentIntoDBMutation,
  useUpdateOneReagentInDBMutation,
  useDeleteReagentByIdFromDBMutation,
} = reagentsApi;
