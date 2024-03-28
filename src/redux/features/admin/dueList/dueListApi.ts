import { apiSlice } from "@/redux/api/apiSlice";

export const dueListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDueListFromDB: builder.query({
      query: () => "/due-list",

      providesTags: ["due-list"],
    }),

    getDueListFromDBbyEmail: builder.query({
      query: (email) => `/due-list/${email}`,

      providesTags: ["due-list"],
    }),

    addToDueListDB: builder.mutation({
      query: (data) => ({
        url: "/due-list",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["due-list"],
    }),

    updateDueListById: builder.mutation({
      query: ({ data, id }) => ({
        url: `/due-list/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["due-list"],
    }),
  }),
});

export const {
  useGetDueListFromDBQuery,
  useAddToDueListDBMutation,
  useUpdateDueListByIdMutation,
  useGetDueListFromDBbyEmailQuery,
} = dueListApi;
