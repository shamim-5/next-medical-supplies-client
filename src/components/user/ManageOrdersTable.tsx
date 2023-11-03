/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks/hook";
import EmptyData from "../shared/EmptyData";
import CurrentOrderTable from "./CurrentOrderTable";
import PreviousOrderTable from "./PreviousOrderTable";
import { useGetDataFromDBbyEmailQuery } from "@/redux/features/cart-items/cartItemsApi";
import { useGetOrdersFromDBbyEmailQuery } from "@/redux/features/admin/orders/ordersApi";

const ManageOrdersTable: React.FC = () => {
  const { user: email } = useAppSelector((state) => state.auth);

  const userEmail = email?.toString();
  const { data: orders, isLoading } = useGetDataFromDBbyEmailQuery(userEmail) || [];
  const { data: confirmOrder, isLoading: isConfirmOrderLoading } = useGetOrdersFromDBbyEmailQuery(userEmail) || [];

  return (
    <div>
      {!isLoading && !isConfirmOrderLoading ? (
        <div>
          <div className="mb-4 lg:mb-9">
            <h2 className="text-2xl lg:text-3xl font-semibold uppercase py-2 mt-4">Current Orders</h2>
            {orders && orders.map((order: any) => <CurrentOrderTable key={order._id} order={order} />)}
            {confirmOrder && confirmOrder.map((order: any) => <CurrentOrderTable key={order._id} order={order} />)}
          </div>

          <div className="mb-4 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-semibold uppercase py-2 mt-4">Previous Orders</h2>
            {confirmOrder && confirmOrder.map((order: any) => <PreviousOrderTable key={order._id} order={order} />)}
          </div>
        </div>
      ) : (
        <EmptyData />
      )}
    </div>
  );
};

export default ManageOrdersTable;
