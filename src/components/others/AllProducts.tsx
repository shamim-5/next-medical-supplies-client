"use client";

import React from "react";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import AllProductCard from "../cards/AllProductCard";
import { useAppSelector } from "@/redux/hooks/hook";

const AllProducts = () => {
  const { field, searchTerm } = useAppSelector((state) => state.search) || {};
  const { data: { data: products } = [], isLoading } = useGetProductsQuery({ field, searchTerm });

  return (
    <div className="my-6 md:my-9 lg:my-12">
      <h2 className="text-primary-dark text-2xl md:text-3xl lg:text-4xl uppercase font-semibold mb-4">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 place-content-between  gap-4 lg:gap-x-9 lg:gap-y-6">
        {!isLoading &&
          products &&
          products.map((product: IProduct) => <AllProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
};

export default AllProducts;
