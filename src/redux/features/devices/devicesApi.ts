import { apiSlice } from "@/redux/api/apiSlice";

export const devicesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDevices: builder.query({
      query: ({ field, searchTerm }) =>
        searchTerm && field ? `/devices?field=${field}&searchTerm=${searchTerm}` : `/devices`,
    }),
  }),
});

export const { useGetDevicesQuery } = devicesApi;
