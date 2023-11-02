"use client";

import React from "react";
import EmptyData from "../shared/EmptyData";
import ActiveOrdersTable from "./ActiveOrdersTable";
import { useGetOrdersFromDBQuery } from "@/redux/features/admin/orders/ordersApi";

const ActiveOrders: React.FC = () => {
  const { data: orders, isLoading } = useGetOrdersFromDBQuery(undefined) || [];

  return (
    <div>
      {!isLoading && orders ? (
        orders.map((order: ICartItems) => <ActiveOrdersTable key={order._id} order={order} />)
      ) : (
        <EmptyData />
      )}
    </div>
  );
};

export default ActiveOrders;
