"use client";

import React, { useRef } from "react";
import type { ColumnsType } from "antd/es/table";
import { Button, Divider, Space, Table } from "antd";
import { useGetDueListFromDBbyEmailQuery } from "@/redux/features/admin/dueList/dueListApi";
import { useReactToPrint } from "react-to-print";
import { PrinterOutlined } from "@ant-design/icons";

interface IDueListTable {
  email: string;
}

const DueListTable: React.FC<IDueListTable> = (email) => {
  const { data: { data: dueList } = [], isLoading } = useGetDueListFromDBbyEmailQuery(email?.email);

  // react-to-print
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

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
      render: (text) => <span className="line-clamp-1 mr-2">{text}</span>,
    },
    {
      title: "Date",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (text) => {
        const date = text && new Date(parseInt(text));
        const year = date && date.getFullYear();
        const month = date && date.getMonth() + 1;
        const day = date && date.getDate();

        return (
          <span className="line-clamp-1 mr-2">
            {day}-{month}-{year}
          </span>
        );
      },
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
      title: "DueAmount",
      dataIndex: "discountPrice",
      key: "discountPrice",
      render: (text) => <span className="">{Math.round(Number(text))}.00/=</span>,
    },
  ];
  const data: any[] = dueList ? [...dueList] : [];

  return (
    <>
      {!isLoading && !dueList.paid && (
        <Button
          size="small"
          ghost
          className="text-xs text-cyan hover:border-cyan mt-2"
          onClick={() => reactToPrintFn()}
        >
          Print <PrinterOutlined />
        </Button>
      )}
      <div ref={contentRef} className="overflow-x-auto">
        {!isLoading && !dueList.paid && (
          <Table
            key={dueList.id}
            columns={currentColumns}
            dataSource={data}
            pagination={false}
            rowClassName={() => "leading-none"}
            title={() => {
              console.log(dueList);
              return (
                <div>
                  <h2 className="text-sm whitespace-nowrap max-w-md lg:max-w-lg line-clamp-1 mt-4 lg:mt-0">
                    <p className="w-24 inline-block">User Name</p>
                    <span className="text-slate-900/70">: {dueList[0]?.userName}</span>
                  </h2>
                  <h2 className="text-sm lg:text-md  whitespace-nowrap font-mono">
                    <p className="w-24 inline-block">Email</p>
                    <span className="text-slate-900/70">: {dueList[0]?.email}</span>
                  </h2>
                </div>
              );
            }}
            footer={(record) => {
              const totalDiscountPrice = record.reduce((sum, item) => sum + item.discountPrice, 0);
              return (
                <div>
                  <div className="">
                    <div className="flex justify-end text-base font-semibold">
                      <h2 className="mr-2 lg:mr-6 w-[240px] flex-shrink-0 text-end">Sub-Total :</h2>
                      <div className="">
                        <div className="whitespace-nowrap">{totalDiscountPrice}.00/=</div>
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
      </div>
    </>
  );
};

export default DueListTable;
