import { apiSlice } from "@/redux/api/apiSlice";

export const medicalEquipmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMedicalEquipments: builder.query({
      query: ({ field, searchTerm }) =>
        searchTerm && field ? `/medical-equipments?field=${field}&searchTerm=${searchTerm}` : `/medical-equipments`,

      providesTags: ["medical-equipments"],
    }),
    getMedicalEquipmentsDataById: builder.query({
      query: (id: string) => `medical-equipments/${id}`,

      providesTags: ["medical-equipments"],
    }),
    insertMedicalEquipmentsIntoDB: builder.mutation({
      query: (data: any) => ({
        url: "medical-equipments",
        method: "POST",
        body: data,
      }),
    }),
    updateOneMedicalEquipmentsInDB: builder.mutation({
      query: ({ id, data }) => ({
        url: `medical-equipments/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteMedicalEquipmentsByIdFromDB: builder.mutation({
      query: (id: string) => ({
        url: `medical-equipments/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMedicalEquipmentsQuery,
  useGetMedicalEquipmentsDataByIdQuery,
  useInsertMedicalEquipmentsIntoDBMutation,
  useUpdateOneMedicalEquipmentsInDBMutation,
  useDeleteMedicalEquipmentsByIdFromDBMutation,
} = medicalEquipmentsApi;
