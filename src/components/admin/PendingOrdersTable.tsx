"use client";

import React from "react";
import { useAppDispatch } from "@/redux/hooks/hook";
import { Divider, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ordersApi } from "@/redux/features/admin/orders/ordersApi";
import { cartItemsApi } from "@/redux/features/cart-items/cartItemsApi";
import { toast } from "react-toastify";
import { useGetUserDetailsByEmailQuery } from "@/redux/features/user-details/userDetailsApi";

interface IPendingOrdersTableProps {
  order: ICartItems;
}

const PendingOrdersTable: React.FC<IPendingOrdersTableProps> = ({ order }) => {
  const dataSource = order?.order;

  const { data: { data: [userData] } = { data: [] } } = useGetUserDetailsByEmailQuery(order?.email as string) || [];
  const { phoneNumber, address } = userData || {};

  const dispatch = useAppDispatch();

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
      render: (text) => <a className="line-clamp-1">{text}</a>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => <span className="line-clamp-1">{text}</span>,
      responsive: ["lg"],
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      key: "manufacturer",
      render: (text) => <span className="line-clamp-1">{text}</span>,
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
      render: (text) => <span className="">{Math.round(Number(text))}.00/=</span>,
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
      <div className="overflow-x-auto">
        {!order.status && !order.active && (
          <Table
            key={order.id}
            columns={currentColumns}
            dataSource={data}
            pagination={false}
            rowClassName={() => "leading-none"}
            title={(record) => {
              // confirm pending order and delete from cart-items
              const confirmOrder = async () => {
                try {
                  await dispatch(ordersApi.endpoints.addToOrdersDB.initiate({ ...order, active: true }));
                  dispatch(cartItemsApi.endpoints.deleteOrderById.initiate(order.id));
                  toast.success("Order updated successfully");
                } catch (error) {
                  // do nothing
                }
              };
              return (
                <div className="flex justify-between">
                  <div>
                    <div>
                      <h2 className="text-sm lg:text-md overflow-hidden whitespace-nowrap text-ellipsis font-mono">
                        <p className="w-24 inline-block">Order Id</p>
                        <span className="text-slate-900/70">: {order.id}</span>
                      </h2>
                      <h2 className="text-sm font-mono overflow-hidden whitespace-nowrap text-ellipsis max-w-md ">
                        <p className="w-24 inline-block">User Name</p>
                        <span className="text-slate-900/70">: {order.userName}</span>
                      </h2>
                      <h2 className="text-sm font-mono overflow-hidden whitespace-nowrap text-ellipsis max-w-md ">
                        <p className="w-24 inline-block">Address</p>
                        <span className="text-slate-900/70">
                          : {address?.addressLineOne || "Address not found. Please update your profile."}
                        </span>
                      </h2>
                      <h2 className="text-sm font-mono overflow-hidden whitespace-nowrap text-ellipsis max-w-md ">
                        <p className="w-24 inline-block">Phone</p>
                        <span className="text-slate-900/70">
                          : {phoneNumber ? `0${phoneNumber} ` : "Phone Number not found. Please update your profile."}
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div>
                    <Space size="middle" className="w-full">
                      <a onClick={() => confirmOrder()}>Confirm</a>
                    </Space>
                  </div>
                </div>
              );
            }}
            footer={(record) => {
              const calculateTotalPrice = (record: any[] | readonly IProduct[]) => {
                if (!record || record.length === 0) {
                  return 0;
                }
                const totalPriceFloat = record.reduce((sum: number, obj: IRecord) => sum + (obj.priceTotal || 0), 0);
                return Math.round(totalPriceFloat);
              };
              const applyDiscount = (totalPrice: number, discountPercentage: number) => {
                const discount = (totalPrice * discountPercentage) / 100;
                const discountPrice = totalPrice - discount;
                return { discountPrice: Math.round(discountPrice), discount: Math.round(discount) };
              };
              const totalPrice: number = calculateTotalPrice(record);
              const discountPercentage: number = record?.[0]?.discountPercentage || 0;
              const finalPrice = applyDiscount(totalPrice, discountPercentage);
              return (
                <div>
                  <div className="flex flex-col-reverse gap-2 lg:flex-row">
                    <div>
                      <h3 className="text-slate-900/70 text-xs whitespace-nowrap">
                        Order Status : {!order.status && !order.active && "Processing"}
                      </h3>
                      <h3 className="text-slate-900/70 text-xs whitespace-nowrap">{`Order Date & Time : ${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${amOrPm}`}</h3>
                      <Divider className="mt-2 mb-3" />
                      <h3 className="text-slate-900/70 text-xs whitespace-nowrap">
                        Note : Order will delivery up to two business days.
                      </h3>
                    </div>
                    <div className="ml-auto">
                      <div className="flex justify-start">
                        <h2 className="mr-2 lg:mr-9 w-[150px] text-end">Total Price :</h2>
                        <div className="ml-auto">
                          <div className="whitespace-nowrap">{totalPrice}.00 /=</div>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <h2 className="mr-2 lg:mr-9 w-[150px] text-end">
                          Discount {discountPercentage >= 1 && `${discountPercentage}%`} :
                        </h2>
                        <div className="ml-auto">
                          <div className="whitespace-nowrap "> - {finalPrice?.discount}.00 /=</div>
                          <Divider className="mt-1 mb-2" />
                        </div>
                      </div>
                      <div className="flex justify-start font-semibold">
                        <h2 className="mr-2 lg:mr-9 w-[150px] text-end">Payable Amount :</h2>
                        <div className="ml-auto">
                          <div className="whitespace-nowrap">{finalPrice?.discountPrice}.00 /=</div>
                        </div>
                      </div>
                      <Divider className="mt-2" />
                    </div>
                  </div>
                  <Divider className="mt-2 mb-0" />
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

export default PendingOrdersTable;
