"use client";

import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Product {
  key: string;
  name: string;
  category: string;
  manufacturer: string;
  quantity: number;
  price: number;
}

const data: Product[] = [
  {
    key: "1",
    name: "Product 1",
    category: "Category A",
    manufacturer: "Manufacturer X",
    quantity: 10,
    price: 50,
  },
  {
    key: "2",
    name: "Product 2",
    category: "Category B",
    manufacturer: "Manufacturer Y",
    quantity: 20,
    price: 100,
  },
  {
    key: "3",
    name: "Product 3",
    category: "Category C",
    manufacturer: "Manufacturer Z",
    quantity: 5,
    price: 25,
  },
];

const CustomersListTable: React.FC = () => {
  const columns: ColumnsType<Product> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true, // Truncate text
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ellipsis: true, // Truncate text
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      key: "manufacturer",
      ellipsis: true, // Truncate text
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "right",
      width: 100, // Fixed width for better responsiveness
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "right",
      width: 100, // Fixed width for better responsiveness
      render: (value: number) => `${value.toFixed(2)}/=`, // Format as currency
    },
  ];

  return (
    <div className="responsive-table-container">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }} // Enable horizontal scroll for small screens
      />
    </div>
  );
};

export default CustomersListTable;