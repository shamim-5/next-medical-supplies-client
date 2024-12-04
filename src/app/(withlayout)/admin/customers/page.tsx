import CustomersListTable from "@/components/admin/CustomersListTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers page",
  description: "Surgical equipments shop app",
};

const CustomersPage = () => {
  
  return (
    <div>
      <CustomersListTable />
    </div>
  );
};

export default CustomersPage;
