import type { Metadata } from "next";
import ManageOrdersTable from "@/components/user/ManageOrdersTable";

export const metadata: Metadata = {
  title: "Cart Items page",
  description: "Surgical equipments shop app",
};

const ManageOrdersPage = () => {
  return (
    <div>
      <ManageOrdersTable />
    </div>
  );
};

export default ManageOrdersPage;
