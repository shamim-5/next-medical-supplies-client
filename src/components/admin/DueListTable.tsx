"use client";

import React from "react";
import type { ColumnsType } from "antd/es/table";
import { Divider, Space, Table } from "antd";
import { useGetDueListFromDBbyEmailQuery } from "@/redux/features/admin/dueList/dueListApi";

interface IDueListTable {
  email: string;
}

const DueListTable: React.FC<IDueListTable> = (email) => {
  const { data: { data: dueList } = [], isLoading } = useGetDueListFromDBbyEmailQuery(email?.email);

  const currentColumns: ColumnsType<any> = [
    {
      title: "S/N",
      key: "id",
      rowScope: "row",
      render: (_, _record, index) => <Space>{index + 1}</Space>,
    },
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "TotalPrice",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Due Amount",
      dataIndex: "discountPrice",
      key: "discountPrice",
    },
  ];
  const data: any[] = dueList ? [...dueList] : [];

  return (
    <>
      {!isLoading && !dueList.paid && (
        <Table
          key={dueList.id}
          columns={currentColumns}
          dataSource={data}
          pagination={false}
          footer={(record) => {
            const totalDiscountPrice = record.reduce((sum, item) => sum + item.discountPrice, 0);

            return (
              <div>
                <div className="">
                  <div className="flex justify-end">
                    <h2 className="mr-9 w-[200px] text-end">Sub-Total :</h2>
                    <div className="mr-4 lg:mr-6 w-[100px]">
                      <div className="">{totalDiscountPrice}.00 /=</div>
                    </div>
                  </div>
                </div>
                <Divider className="mt-4 mb-0" />
              </div>
            );
          }}
          rowKey="id"
        />
      )}
    </>
  );
};

export default DueListTable;
