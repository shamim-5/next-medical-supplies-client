"use client";

import React from "react";
import { useAppDispatch } from "@/redux/hooks/hook";
import { Divider, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface ICompletedOrdersTableProps {
  order: ICartItems;
}

const CompletedOrdersTable: React.FC<ICompletedOrdersTableProps> = ({ order }) => {
  const dataSource = order?.order;

  const currentColumns: ColumnsType<IRecord> = [
    {
      title: "S/N",
      key: "id",
      rowScope: "row",
      render: (_, _record, index) => <Space>{index + 1}</Space>,
    },
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
      title: "Manufacturer",
      dataIndex: "manufacturer",
      key: "manufacturer",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "priceTotal",
      key: "priceTotal",
    },
  ];
  const data: IRecord[] = dataSource ? [...dataSource] : [];

  const date = order?.timestamp && new Date(parseInt(order?.timestamp));

  const year = date && date.getFullYear();
  const month = date && date.getMonth() + 1;
  const day = date && date.getDate();
  const hours = date && date.getHours();
  const minutes = date && date.getMinutes();
  const seconds = date && date.getSeconds();
  const amOrPm = hours && hours >= 12 ? "PM" : "AM";

  return (
    <>
      {order.status && !order.active && (
        <Table
          key={order.id}
          columns={currentColumns}
          dataSource={data}
          pagination={false}
          title={() => {
            return (
              <div>
                <h2 className="text-lg font-mono pt-2">
                  Order Id: <span className="text-slate-900/70">{order.id}</span>
                </h2>
              </div>
            );
          }}
          footer={(record) => {
            const calculateTotalPrice = (record: any[] | readonly IProduct[]) => {
              if (!record || record.length === 0) {
                return 0;
              }
              const totalPriceFloat = record.reduce((sum: number, obj: IRecord) => sum + (obj.priceTotal || 0), 0);
              return Math.floor(totalPriceFloat);
            };
            const applyDiscount = (totalPrice: number, discountPercentage: number) => {
              const discount = (totalPrice * discountPercentage) / 100;
              const discountPrice = totalPrice - discount;
              return { discountPrice: Math.floor(discountPrice), discount: discount };
            };
            const totalPrice: number = calculateTotalPrice(record);
            const discountPercentage: number = 10;
            const finalPrice = applyDiscount(totalPrice, discountPercentage);

            return (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div>
                    <h3>Order Status : {order.status && !order.active && "Completed"}</h3>
                    <h3>{`Order Date and Time : ${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${amOrPm}`}</h3>
                    <Divider className="mt-2 mb-3" />
                    <h3 className="text-slate-600">Note : Order successfully delivered.</h3>
                  </div>
                  <div>
                    <div className="flex justify-end">
                      <h2 className="mr-9 w-[200px] text-end text-slate-900/70">Total Price :</h2>
                      <div className="mr-4 lg:mr-6 w-[100px]">
                        <div className="">{totalPrice}.00 /=</div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <h2 className="mr-9 w-[200px] text-end text-slate-900/70">10% Discount :</h2>
                      <div className="mr-4 lg:mr-6 w-[100px]">
                        <div className=" "> - {finalPrice?.discount} /=</div>
                        <Divider className="mt-2 mb-3" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <h2 className="mr-9 w-[200px] text-end">Payable Amount :</h2>
                      <div className="mr-4 lg:mr-6 w-[100px]">
                        <div className="">{finalPrice?.discountPrice}.00 /=</div>
                      </div>
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

export default CompletedOrdersTable;
