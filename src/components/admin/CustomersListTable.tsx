"use client";

import React from "react";
import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import useUserInfo from "@/hooks/useUserInfo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hook";
import { useGetOrdersFromDBQuery } from "@/redux/features/admin/orders/ordersApi";
import { toast } from "react-toastify";
import { userDetails } from "@/redux/features/user-details/userDetailsSlice";
import { useRouter } from "next/navigation";

interface UniqueEntry {
  userName: string;
  email: string;
  userId: string;
}

const CustomersListTable: React.FC = () => {
  const { data: { data: orders } = [], isLoading } = useGetOrdersFromDBQuery(undefined) || [];

  const { accessToken: firebaseAccessToken } = useUserInfo();
  const { user, accessToken } = useAppSelector((state: { auth: any }) => state?.auth);
  const admin = accessToken === firebaseAccessToken && user === process.env.NEXT_PUBLIC_ADMIN ? true : false;

  const router = useRouter();
  const dispatch = useAppDispatch();

  const uniqueEntry =
    orders &&
    Array.from(
      new Map(
        orders.map((entry: UniqueEntry) => [
          entry.email,
          { email: entry.email, userName: entry.userName, userId: entry.userId },
        ])
      ).values()
    );

  const handlePickUser = (record: UniqueEntry) => {
    try {
      admin && dispatch(userDetails(record));
      router.push("/all-items");
      toast.info(`${record?.userName} set as temporary user !`);
    } catch (err) {
      // do nothing
    }
  };

  const columns: ColumnsType<UniqueEntry> = [
    {
      title: "S/N",
      key: "id",
      rowScope: "row",
      render: (_, _record, index) => <Space>{index + 1}</Space>,
    },
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
      render: (text) => <span className="line-clamp-1">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span className="line-clamp-1">{text}</span>,
    },
    {
      title: "UserId",
      dataIndex: "userId",
      key: "userId",
      responsive: ["lg"],
      // align: "right",
      // width: 100,
      // render: (value: number) => `${value.toFixed(2)}/=`,
      // ellipsis: true,
    },
    {
      title: () => admin && <span className="">Action</span>,
      key: "action",
      align: "right",
      render: (_, record) => {
        return (
          <Button onClick={() => handlePickUser(record)} size="small" className="commonBtn text-white leading-none">
            Pick User
          </Button>
        );
      },
    },
  ];

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl lg:text-3xl font-semibold uppercase py-2 mt-4">Customers List</h2>
      {!isLoading && orders && (
        <Table
          columns={columns}
          dataSource={uniqueEntry}
          pagination={false}
          rowClassName={() => "leading-none"}
          // scroll={{ x: "max-content" }}
        />
      )}
    </div>
  );
};

export default CustomersListTable;
