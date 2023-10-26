import { apiSlice } from "@/redux/api/apiSlice";


const manageOrdersApi = apiSlice.injectEndpoints({
   endpoints: builder => ({
      getDataFromDB: builder.query({
         query: () => '/manage-orders',
         
      })
   })
})

export const { useGetDataFromDBQuery } = manageOrdersApi;