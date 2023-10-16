"use client";

import { Space } from "antd";
import Search from "antd/es/input/Search";

const SearchAntd: React.FC = () => {
  const onSearch = async (e: { target: { value: string | undefined } }) => {
    const currentSearchTerm = e.target.value;

    console.log(currentSearchTerm);
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
