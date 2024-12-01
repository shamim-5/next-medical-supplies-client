import { Metadata } from "next";
import Blank from "@/components/shared/Blank";
import ManageOrdersTable from "@/components/user/ManageOrdersTable";

export const metadata: Metadata = {
  title: "Manage Orders page",
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
