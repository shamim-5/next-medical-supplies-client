/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hook";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { addToCart, removeFromCart, removeQuantity } from "@/redux/features/cart-items/cartItemsSlice";
import { toast } from "react-toastify";

const CartItemsTable: React.FC = () => {
  const products = useAppSelector((state) => state?.cartItems) || [];

  const dispatch = useAppDispatch();

  const columns: ColumnsType<IProduct> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      key: "manufacturer",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const handleDelete = () => {
          dispatch(removeFromCart(record._id));
          toast.warning("Delete from cart success");
        };
        const handleAddQuantity = () => {
          dispatch(addToCart(record));
          toast.success("Quantity added");
        };
        const handleRemoveQuantity = () => {
          dispatch(removeQuantity(record));
          toast.warning("Quantity removed");
        };

        return (
          <Space size="middle">
            <a onClick={handleAddQuantity}>(+)</a>
            <a onClick={handleRemoveQuantity}>(-)</a>
            <a onClick={handleDelete}>Delete</a>
          </Space>
        );
      },
    },
  ];

  const data: IProduct[] = [...products];

  return (
    <div>
      {products.length > 0 ? (
        <Table columns={columns} dataSource={data} pagination={false} rowKey="_id" />
      ) : (
        <p>No products available in cart...</p>
      )}
    </div>
  );
};

export default CartItemsTable;
