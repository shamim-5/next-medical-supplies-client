"use client";

import React, { useRef } from "react";
import type { ColumnsType } from "antd/es/table";
import { Button, Divider, Space, Table } from "antd";
import { dueListApi, useGetDueListFromDBbyEmailQuery } from "@/redux/features/admin/dueList/dueListApi";
import { useReactToPrint } from "react-to-print";
import { PrinterOutlined } from "@ant-design/icons";
import useUserInfo from "@/hooks/useUserInfo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hook";
import { toast } from "react-toastify";
import NotificationConfirm from "../notification/NotificationConfirm";

interface IDueListTable {
  email: string;
}

const DueListTable: React.FC<IDueListTable> = (email) => {
  const { accessToken: firebaseAccessToken } = useUserInfo();
  const { user, accessToken } = useAppSelector((state) => state?.auth);
  const { data: { data: dueList } = [], isLoading } = useGetDueListFromDBbyEmailQuery(email?.email);

  const admin = accessToken === firebaseAccessToken && user === process.env.NEXT_PUBLIC_ADMIN ? true : false;

  const dispatch = useAppDispatch();

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
    {
      title: () => admin && <span className="hidden md:block">Status</span>,
      key: "action",
      render: (_, record) => {
        const handleStatusOrdersDue = async (record: any) => {
          let { id, ...restData } = record;

          try {
            await dispatch(
              dueListApi.endpoints.updateDueListById.initiate({
                data: { ...restData, paid: true },
                id: id,
              })
            );
            toast.success("Payment status updated");
          } catch (error) {
            // do nothing
          }
        };

        return (
          admin && (
            <NotificationConfirm
              title="Confirm Payment"
              description="Are you sure you want to mark this due as paid?"
              onConfirm={() => handleStatusOrdersDue(record)}
            />
          )
        );
      },
    },
  ];

  const sortedOrders = dueList?.slice().sort((a: { timestamp: string }, b: { timestamp: string }) => {
    const dateA = a?.timestamp ? new Date(parseInt(a.timestamp) * 1000).getTime() : 0;
    const dateB = b?.timestamp ? new Date(parseInt(b.timestamp) * 1000).getTime() : 0;
    return dateB - dateA;
  });

  const dueListPaidFalse = sortedOrders && sortedOrders.filter((item: { paid: boolean }) => !item?.paid);
  const data: any[] = dueListPaidFalse ? [...dueListPaidFalse] : [];

  return (
    <>
      {!isLoading && dueListPaidFalse && dueListPaidFalse.length !== 0 && (
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
        {!isLoading && dueListPaidFalse && dueListPaidFalse.length !== 0 && (
          <Table
            key={dueList.id}
            columns={currentColumns}
            dataSource={data}
            pagination={false}
            rowClassName={() => "leading-none"}
            title={() => {
              return (
                <div>
                  <h2 className="text-base whitespace-nowrap max-w-md lg:max-w-lg line-clamp-1 mt-4 lg:mt-0">
                    <p className="w-24 inline-block">User Name</p>
                    <span className="text-slate-900/70">: {dueList[0]?.userName}</span>
                  </h2>
                  <h2 className="text-base whitespace-nowrap font-mono">
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
                  <div className="mr-4 lg:mr-6">
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
