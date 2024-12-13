"use client";

import React, { useState } from "react";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import AllProductCard from "../cards/AllProductCard";
import { useAppSelector } from "@/redux/hooks/hook";
import { Button } from "antd";

const AllProducts = () => {
  const { field, searchTerm } = useAppSelector((state) => state.search) || {};
  const { data: { data: products = [] } = {}, isLoading } = useGetProductsQuery({ field, searchTerm });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Paginate products
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!isLoading && products.length === 0) {
    return <p className="text-center text-gray-500">No products found.</p>;
  }

  return (
    <div className="my-6 md:my-9 lg:my-12">
      <h2 className="text-primary-dark text-2xl md:text-3xl lg:text-4xl uppercase font-semibold mb-4">All Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 place-content-between gap-4 lg:gap-x-9 lg:gap-y-6">
        {!isLoading &&
          products &&
          paginatedProducts.map((product: IProduct) => <AllProductCard key={product.id} product={product} />)}
      </div>

      <div className="flex justify-end items-center mt-2">
        <div className="flex justify-center items-center gap-2">
          <Button
            size="small"
            className="bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            size="small"
            className=" bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
