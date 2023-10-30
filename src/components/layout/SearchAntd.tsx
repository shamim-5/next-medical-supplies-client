"use client";

import { productsApi } from "@/redux/features/products/productsApi";
import { setSearchTerm } from "@/redux/helper/helperSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hook";
import { Space } from "antd";
import Search from "antd/es/input/Search";

const SearchAntd: React.FC = () => {
  const { field, searchTerm } = useAppSelector((state) => state.helper) || {};

  const dispatch = useAppDispatch();

  const onSearch = async (e: { target: { value: string | undefined } }) => {
    const currentSearchTerm = e.target.value;

    dispatch(setSearchTerm({ field: "name", searchTerm: currentSearchTerm }));
    dispatch(productsApi.endpoints.getProducts.initiate({ field, searchTerm }));
  };

  return (
    <div className="flex items-center justify-center my-0 mt-6">
      <Space direction="vertical" className="max-w-[200px]">
        <Search placeholder="Search by title" allowClear onChange={onSearch} />
      </Space>
    </div>
  );
};

export default SearchAntd;
function dispatch(arg0: { payload: any; type: "helper/setSearchTerm" }) {
  throw new Error("Function not implemented.");
}
