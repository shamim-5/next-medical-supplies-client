import { apiSlice } from "@/redux/api/apiSlice";

export const consumablesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsumables: builder.query({
      query: ({ field, searchTerm }) =>
        searchTerm && field ? `/consumables?field=${field}&searchTerm=${searchTerm}` : `/consumables`,
    }),
    getConsumablesDataById: builder.query({
      query: (id: string) => `consumables/${id}`,
    }),
    insertConsumablesIntoDB: builder.mutation({
      query: (data: any) => ({
        url: "consumables",
        method: "POST",
        body: data,
      }),
    }),
    updateOneConsumablesInDB: builder.mutation({
      query: ({ id, data }) => ({
        url: `consumables/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteConsumablesByIdFromDB: builder.mutation({
      query: (id: string) => ({
        url: `consumables/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetConsumablesQuery,
  useGetConsumablesDataByIdQuery,
  useInsertConsumablesIntoDBMutation,
  useUpdateOneConsumablesInDBMutation,
  useDeleteConsumablesByIdFromDBMutation
} = consumablesApi;
