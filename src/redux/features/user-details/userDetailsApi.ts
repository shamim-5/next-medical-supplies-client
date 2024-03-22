import { apiSlice } from "@/redux/api/apiSlice";

export const userDetailsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => "/user-details",
    }),

    getUserDetailsByEmail: builder.query({
      query: (email: string) => `/user-details/${email}`,

      providesTags: ["user-details"],
    }),

    insertUserDetailsIntoDB: builder.mutation({
      query: (data: any) => ({
        url: "/user-details",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["user-details"],
    }),

    updateUserDetailsInDB: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user-details/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["user-details"],
    }),

    deleteUserDetailsFromDB: builder.mutation({
      query: (id: string) => ({
        url: `/user-details/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["user-details"],
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useGetUserDetailsByEmailQuery,
  useInsertUserDetailsIntoDBMutation,
  useUpdateUserDetailsInDBMutation,
  useDeleteUserDetailsFromDBMutation,
} = userDetailsApi;
