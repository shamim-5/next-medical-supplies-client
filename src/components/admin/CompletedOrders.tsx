"use client";

import React from "react";
import EmptyData from "../shared/EmptyData";
import CompletedOrdersTable from "./CompletedOrdersTable";
import { useGetOrdersFromDBQuery } from "@/redux/features/admin/orders/ordersApi";

const CompletedOrders: React.FC = () => {
  const { data: { data: orders } = [], isLoading } = useGetOrdersFromDBQuery(undefined) || [];

  return (
    <div>
      {!isLoading && orders ? (
        orders.map((order: ICartItems) => <CompletedOrdersTable key={order.id} order={order} />)
      ) : (
        <EmptyData />
      )}
    </div>
  );
};

export default CompletedOrders;
