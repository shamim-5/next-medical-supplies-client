import { apiSlice } from "@/redux/api/apiSlice";

export const medicalEquipmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMedicalEquipments: builder.query({
      query: () => `/medical-equipments`,

      providesTags: [""],
    }),
  }),
});

export const { useGetMedicalEquipmentsQuery } = medicalEquipmentsApi;
