import PendingOrders from "@/components/admin/PendingOrders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NB_Surgical - Pending Orders page",
  description: "Surgical equipments shop app",
};

const PendingOrdersPage = () => {
  return (
    <div className="mb-4 lg:mb-9">
      <h2 className="text-2xl lg:text-3xl font-semibold uppercase py-2 mt-4">Pending Orders</h2>
      <PendingOrders />
    </div>
  );
};

export default PendingOrdersPage;
