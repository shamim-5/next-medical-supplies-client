import { apiSlice } from "@/redux/api/apiSlice";

export const surgicalShopApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSurgicalShop: builder.query({
      query: () => `/shop-details`,

      providesTags: [""],
    }),
  }),
});

export const { useGetSurgicalShopQuery } = surgicalShopApi;