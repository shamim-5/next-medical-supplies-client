"use client";

import React from "react";
import FeaturedCard from "../cards/FeaturedCard";
import { useGetTopProductsQuery } from "@/redux/features/topProducts/topProductsApi";

const FeaturedServices = () => {
  const { data: topProducts, isLoading } = useGetTopProductsQuery({ undefined }) || [];

  return (
    <div className="my-4 md:my-6 lg:my-9">
      <h2 className="text-primary-dark text-4xl uppercase font-semibold mb-4">Featured Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {!isLoading &&
          topProducts &&
          topProducts.map((topProduct: ITopProduct) => <FeaturedCard key={topProduct._id} topProduct={topProduct} />)}
      </div>
    </div>
  );
};

export default FeaturedServices;
