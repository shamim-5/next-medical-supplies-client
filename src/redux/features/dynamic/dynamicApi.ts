import { apiSlice } from "@/redux/api/apiSlice";

export const dynamicApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDataByIdDynamically: builder.query({
      query: ({ url, id }) => `/${url}/${id}`,

      providesTags: ["dynamic"],
    }),
    insertIntoDBDynamically: builder.mutation({
      query: ({ url, data }) => ({
        url: `/${url}`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["dynamic", "products", "medical-equipments", "consumables", "devices", "top-products", "reagents"],
    }),
    updateOneInDBDynamically: builder.mutation({
      query: ({ url, id, data }) => ({
        url: `/${url}/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["dynamic", "products", "medical-equipments", "consumables", "devices", "top-products", "reagents"],
    }),
    deleteByIdFromDBDynamically: builder.mutation({
      query: ({ url, id }) => ({
        url: `/${url}/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["dynamic", "products", "medical-equipments", "consumables", "devices", "top-products", "reagents"],
    }),
  }),
});

export const {
  useGetDataByIdDynamicallyQuery,
  useInsertIntoDBDynamicallyMutation,
  useUpdateOneInDBDynamicallyMutation,
  useDeleteByIdFromDBDynamicallyMutation,
} = dynamicApi;
