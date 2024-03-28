import { apiSlice } from "@/redux/api/apiSlice";

export const devicesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDevices: builder.query({
      query: ({ field, searchTerm }) =>
        searchTerm && field ? `/devices?field=${field}&searchTerm=${searchTerm}` : `/devices`,
    }),
    getDevicesDataById: builder.query({
      query: (id: string) => `/devices/${id}`,
    }),
    insertDevicesIntoDB: builder.mutation({
      query: (data: any) => ({
        url: "/devices",
        method: "POST",
        body: data,
      }),
    }),
    updateOneDevicesInDB: builder.mutation({
      query: ({ id, data }) => ({
        url: `/devices/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteDevicesByIdFromDB: builder.mutation({
      query: (id: string) => ({
        url: `/devices/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetDevicesQuery,
  useGetDevicesDataByIdQuery,
  useInsertDevicesIntoDBMutation,
  useUpdateOneDevicesInDBMutation,
  useDeleteDevicesByIdFromDBMutation,
} = devicesApi;
