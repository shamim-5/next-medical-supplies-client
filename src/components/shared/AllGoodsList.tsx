"use client";

import React from "react";
import { Affix, Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import useUserInfo from "@/hooks/useUserInfo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hook";
import { useGetOrdersFromDBQuery } from "@/redux/features/admin/orders/ordersApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import { useGetReagentsQuery } from "@/redux/features/reagents/reagentsApi";
import { useGetMedicalEquipmentsQuery } from "@/redux/features/medicalEquipments/medicalEquipmentsApi";
import { useGetTopProductsQuery } from "@/redux/features/topProducts/topProductsApi";
import { useGetConsumablesQuery } from "@/redux/features/consumables/consumablesApi";
import { useGetDevicesQuery } from "@/redux/features/devices/devicesApi";
import SearchAntd from "@/components/layout/SearchAntd";
import { addToCart } from "@/redux/features/cart-items/cartItemsSlice";
import { PlusSquareOutlined } from "@ant-design/icons";

const AllGoodsList: React.FC = () => {
  const { data: { data: orders } = [], isLoading } = useGetOrdersFromDBQuery(undefined) || [];

  const { field, searchTerm } = useAppSelector((state) => state.search) || {};
  const { data: { data: topProducts } = [], isLoading: isTopProductsLoading } =
    useGetTopProductsQuery({ undefined }) || [];
  const { data: { data: products } = [], isLoading: isProductsLoading } =
    useGetProductsQuery({ field, searchTerm }) || [];
  const { data: { data: reagents } = [], isLoading: isReagntsLoading } =
    useGetReagentsQuery({ field, searchTerm }) || [];
  const { data: { data: medicalEquipments } = [], isLoading: isMedicalEquipmentsLoading } =
    useGetMedicalEquipmentsQuery({ field, searchTerm }) || [];
  const { data: { data: consumables } = [], isLoading: isConsumablesLoading } =
    useGetConsumablesQuery({ field, searchTerm }) || [];
  const { data: { data: devices } = [], isLoading: isDeviceLoading } = useGetDevicesQuery({ field, searchTerm }) || [];

  const { accessToken: firebaseAccessToken } = useUserInfo();
  const { user, accessToken } = useAppSelector((state: { auth: any }) => state?.auth);
  const admin = accessToken === firebaseAccessToken && user === process.env.NEXT_PUBLIC_ADMIN ? true : false;

  const router = useRouter();
  const dispatch = useAppDispatch();

  const allCollection: IProduct[] | undefined | null =
    (!isTopProductsLoading &&
      !isProductsLoading &&
      !isReagntsLoading &&
      !isMedicalEquipmentsLoading &&
      !isConsumablesLoading &&
      !isDeviceLoading && [
        ...topProducts,
        ...products,
        ...reagents,
        ...medicalEquipments,
        ...consumables,
        ...devices,
      ]) ||
    [];

  const handleAddToCartBtn = (record: IProduct) => {
    try {
      dispatch(addToCart(record));

      toast.success("Add to cart success !");
    } catch (err) {
      // do nothing
    }
  };

  const columns: ColumnsType<IProduct> = [
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
      render: (text) => <span className="line-clamp-1">{text}</span>,
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      key: "manufacturer",
      render: (text) => <span className="line-clamp-1">{text}</span>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => <span className="line-clamp-1">{text}</span>,
      responsive: ["lg"],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "right",
      // width: 100,
      render: (value: number) => `${value.toFixed(2)}/=`,
      // ellipsis: true,
    },
    {
      title: () => <span className="">Action</span>,
      key: "action",
      align: "right",
      render: (_, record) => {
        return (
          <Button onClick={() => handleAddToCartBtn(record)} size="small" className="commonBtn text-white leading-none flex items-center">
            Cart
            <PlusSquareOutlined />
          </Button>
        );
      },
    },
  ];

  return (
    <div className="overflow-x-auto">
      <div>
        <h2 className="text-2xl lg:text-3xl font-semibold uppercase py-2 mt-4">All Goods</h2>
        <div className="mb-4 flex justify-end">
          <Affix offsetTop={10}>
            <SearchAntd />
          </Affix>
        </div>
      </div>
      {!isLoading && orders && (
        <Table
          columns={columns}
          dataSource={allCollection}
          pagination={false}
          rowClassName={() => "leading-none"}
          // scroll={{ x: "max-content" }}
        />
      )}
    </div>
  );
};

export default AllGoodsList;
