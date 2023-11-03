"use client";

import React from "react";
import EmptyData from "../shared/EmptyData";
import PendingOrdersTable from "./PendingOrdersTable";
import { useGetDataFromDBQuery } from "@/redux/features/cart-items/cartItemsApi";

const PendingOrders: React.FC = () => {
  const { data: orders, isLoading } = useGetDataFromDBQuery(undefined) || [];

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
