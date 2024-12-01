"use client";

import React from "react";
import EmptyData from "../shared/EmptyData";
import CompletedOrdersTable from "./CompletedOrdersTable";
import { useGetOrdersFromDBQuery } from "@/redux/features/admin/orders/ordersApi";

const CompletedOrders: React.FC = () => {
  const { data: { data: orders } = [], isLoading } = useGetOrdersFromDBQuery(undefined) || [];

  // Sort orders in descending order by timestamp
  const sortedOrders = orders?.slice().sort((a: { timestamp: string; }, b: { timestamp: string; }) => {
    const dateA = a?.timestamp ? new Date(parseInt(a.timestamp)*1000).getTime() : 0;
    const dateB = b?.timestamp ? new Date(parseInt(b.timestamp)*1000).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div>
      {!isLoading && sortedOrders?.length ? (
        sortedOrders.map((order: ICartItems) => <CompletedOrdersTable key={order.id} order={order} />)
      ) : (
        <EmptyData />
      )}
    </div>
  );
};

export default CompletedOrders;
