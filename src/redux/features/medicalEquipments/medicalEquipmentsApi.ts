import { apiSlice } from "@/redux/api/apiSlice";

export const medicalEquipmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMedicalEquipments: builder.query({
      query: ({ field, searchTerm }) =>
        searchTerm && field ? `/medical-equipments?field=${field}&searchTerm=${searchTerm}` : `/medical-equipments`,

      providesTags: [""],
    }),
  }),
});

export const { useGetMedicalEquipmentsQuery } = medicalEquipmentsApi;
