import type { Metadata } from "next";
import ActiveOrders from "@/components/admin/ActiveOrders";

export const metadata: Metadata = {
  title: "NB_Surgical - Active Orders page",
  description: "Surgical equipments shop app",
};

const ActiveOrdersPage = () => {
  return (
    <div className="mb-4 lg:mb-9">
      <h2 className="text-2xl lg:text-3xl font-semibold uppercase py-2 mt-4">Active Orders</h2>
      <ActiveOrders />
    </div>
  );
};

export default ActiveOrdersPage;
