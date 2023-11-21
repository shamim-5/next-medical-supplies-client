import { apiSlice } from "@/redux/api/apiSlice";

const manageOrdersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDataFromDB: builder.query({
      query: () => "/manage-orders",
    }),
    getDataById: builder.query({
      query: (id: string) => `manage-orders/${id}`,
    }),
    insertIntoDB: builder.mutation({
      query: (data: any) => ({
        url: "manage-orders",
        method: "POST",
        body: data,
      }),
    }),
    updateOneInDB: builder.mutation({
      query: ({ id, data }) => ({
        url: `manage-orders/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteByIdFromDB: builder.mutation({
      query: (id: string) => ({
        url: `manage-orders/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetDataFromDBQuery,
  useGetDataByIdQuery,
  useInsertIntoDBMutation,
  useUpdateOneInDBMutation,
  useDeleteByIdFromDBMutation,
} = manageOrdersApi;
