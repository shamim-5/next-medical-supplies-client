import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NB_Surgical - Cart Items page",
  description: "Surgical equipments shop app",
};
import ManageOrdersTable from "@/components/table/ManageOrdersTable";

const ManageOrdersPage = () => {
  return (
    <div>
      <ManageOrdersTable />
    </div>
  );
};

export default ManageOrdersPage;
