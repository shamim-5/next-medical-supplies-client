"use client";

import React from "react";
import FeaturedCard from "../cards/FeaturedCard";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import AllProductCard from "../cards/AllProductCard";
import { useAppSelector } from "@/redux/hooks/hook";

const AllProducts = () => {
  const { field, searchTerm } = useAppSelector((state) => state.helper) || {};
  const { data: products, isLoading } = useGetProductsQuery({ field, searchTerm });

  return (
    <div className="my-4 md:my-6 lg:my-9">
      <h2 className="text-primary-dark text-4xl uppercase font-semibold mb-4">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {!isLoading && products.map((product: IProduct) => <AllProductCard key={product._id} product={product} />)}
      </div>
    </div>
  );
};

export default AllProducts;
