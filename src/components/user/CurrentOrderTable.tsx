"use client";

import React from "react";
import { useAppDispatch } from "@/redux/hooks/hook";
import { Divider, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { modifyCartItems } from "@/redux/features/cart-items/cartItemsSlice";
import { useRouter } from "next/navigation";
import { cartItemsApi } from "@/redux/features/cart-items/cartItemsApi";
import { useGetUserDetailsByEmailQuery } from "@/redux/features/user-details/userDetailsApi";

interface ICurrentOrderTableProps {
  order: ICartItems;
}

const CurrentOrderTable: React.FC<ICurrentOrderTableProps> = ({ order }) => {
  const router = useRouter();
  const dataSource = order?.order;

  const {
    data: { data: [userData] } = { data: [] },
    isError,
    isLoading,
  } = useGetUserDetailsByEmailQuery(order?.email as string) || [];
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
      {!order.status && (
        <div className="overflow-x-auto">
          <Table
            key={order.id}
            columns={currentColumns}
            dataSource={data}
            pagination={false}
            title={(record) => {
              const records: any[] = [...record];
              // modify current order
              const modifyCurrentOrder = async (r: IRecord[]) => {
                try {
                  dispatch(modifyCartItems(r));
                  await dispatch(cartItemsApi.endpoints.deleteOrderById.initiate(order.id));
                  router.push("/user/cart-items");
                } catch (error) {
                  // do nothing
                }
              };
              return (
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-lg font-mono">
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
                  <div>
                    <Space size="middle" className={`w-full ${order?.active && "hidden"}`}>
                      <a onClick={() => modifyCurrentOrder(records)}>Modify</a>
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
              const status = order
                ? !order.status && !order.active
                  ? "Processing"
                  : order.active
                  ? "On the way to delivery !"
                  : "Completed"
                : "";
              return (
                <div>
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div>
                      <h3>Status : {status}</h3>
                      <h3>{`Order Date and Time : ${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${amOrPm}`}</h3>
                      <Divider className="mt-2 mb-3" />
                      <h3 className="text-slate-600">Note : Order will delivery up to two business days.</h3>
                    </div>
                    <div>
                      <div className="flex justify-end">
                        <h2 className="mr-9 w-[200px] text-end text-slate-900/70">Total Price :</h2>
                        <div className="mr-4 lg:mr-6 w-[100px]">
                          <div className="">{totalPrice}.00 /=</div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <h2 className="mr-9 w-[200px] text-end text-slate-900/70">{discountPercentage}% Discount :</h2>
                        <div className="mr-4 lg:mr-6 w-[100px]">
                          <div className=" "> - {finalPrice?.discount}.00 /=</div>
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
        </div>
      )}
    </>
  );
};

export default CurrentOrderTable;
