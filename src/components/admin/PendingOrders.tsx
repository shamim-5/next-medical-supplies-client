"use client";

import React from "react";
import EmptyData from "../shared/EmptyData";
import { useGetPendingOrdersFromDBQuery } from "@/redux/features/admin/orders/ordersApi";
import PendingOrdersTable from "./PendingOrdersTable";

const PendingOrders: React.FC = () => {
  const { data: orders, isLoading } = useGetPendingOrdersFromDBQuery(undefined) || [];

  return (
    <div>
      {!isLoading && orders ? (
        orders.map((order: ICartItems) => <PendingOrdersTable key={order._id} order={order} />)
      ) : (
        <EmptyData />
      )}
    </div>
  );
};

export default PendingOrders;
