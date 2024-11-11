import { apiSlice } from "@/redux/api/apiSlice";

export const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => `/reviews`,

      providesTags: ["reviews"],
    }),
    getAllReviewsById: builder.query({
      query: (id: string) => `/reviews/filter/${id}`,

      providesTags: ["reviews"],
    }),
    getDataByIdReviews: builder.query({
      query: (id: string) => `reviews/${id}`,
    }),
    insertIntoDBReviews: builder.mutation({
      query: (data: any) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["reviews"],
    }),
    updateOneInDBReviews: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reviews/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteByIdFromDBReviews: builder.mutation({
      query: (id: string) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetAllReviewsByIdQuery,
  useGetDataByIdReviewsQuery,
  useInsertIntoDBReviewsMutation,
  useUpdateOneInDBReviewsMutation,
  useDeleteByIdFromDBReviewsMutation,
} = reviewsApi;
