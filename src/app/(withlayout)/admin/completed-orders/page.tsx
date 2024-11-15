import type { Metadata } from "next";
import CompletedOrders from "@/components/admin/CompletedOrders";

export const metadata: Metadata = {
  title: "Completed orders page",
  description: "Surgical equipments shop app",
};

const CompletedOrdersPage = () => {
  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-semibold uppercase py-2 mt-4">Completed Orders</h2>
      <CompletedOrders />
    </div>
  );
};

export default CompletedOrdersPage;
