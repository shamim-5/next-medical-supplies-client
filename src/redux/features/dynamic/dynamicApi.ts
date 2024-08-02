import { apiSlice } from "@/redux/api/apiSlice";

export const dynamicApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDataByIdDynamically: builder.query({
      query: ({ url, id }) => `/${url}/${id}`,
    }),
    insertIntoDBDynamically: builder.mutation({
      query: ({ url, data }) => ({
        url: `/${url}`,
        method: "POST",
        body: data,
      }),
    }),
    updateOneInDBDynamically: builder.mutation({
      query: ({ url, id, data }) => ({
        url: `/${url}/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteByIdFromDBDynamically: builder.mutation({
      query: ({ url, id }) => ({
        url: `/${url}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetDataByIdDynamicallyQuery,
  useInsertIntoDBDynamicallyMutation,
  useUpdateOneInDBDynamicallyMutation,
  useDeleteByIdFromDBDynamicallyMutation,
} = dynamicApi;
