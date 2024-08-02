import { apiSlice } from "@/redux/api/apiSlice";

export const fileUploadsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFileUploads: builder.query({
      query: () => "/file-uploads",
    }),

    insertFileUploadsIntoDB: builder.mutation({
      query: (formData) => ({
        url: "/file-uploads",
        method: "POST",
        body: formData,
        contentType: "multipart/form-data",
      }),

      invalidatesTags: ["file-uploads", "user-details"],
    }),

    insertSecureUrlIntoDB: builder.mutation({
      query: (formData) => ({
        url: "/secure-url",
        method: "POST",
        body: formData,
        contentType: "multipart/form-data",
      }),
    }),

    updateFileUploadsInDB: builder.mutation({
      query: ({ id, data }) => ({
        url: `/file-uploads/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["file-uploads", "user-details"],
    }),

    deleteFileUploadsFromDB: builder.mutation({
      query: (id: string) => ({
        url: `/file-uploads/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["file-uploads", "user-details"],
    }),
  }),
});

export const {
  useGetFileUploadsQuery,
  useInsertFileUploadsIntoDBMutation,
  useInsertSecureUrlIntoDBMutation,
  useUpdateFileUploadsInDBMutation,
  useDeleteFileUploadsFromDBMutation,
} = fileUploadsApi;
