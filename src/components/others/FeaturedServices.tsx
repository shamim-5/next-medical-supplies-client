"use client";

import React from "react";
import FeaturedCard from "../cards/FeaturedCard";
import { useGetTopProductsQuery } from "@/redux/features/topProducts/topProductsApi";

const FeaturedServices = () => {
  const { data: { data: topProducts } = [], isLoading } = useGetTopProductsQuery({ undefined }) || [];

  return (
    <div className="my-6 md:my-9 lg:my-12">
      <h2 className="text-primary-dark text-2xl md:text-3xl lg:text-4xl uppercase font-semibold mb-4">
        Featured Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-between gap-4 lg:gap-x-12 lg:gap-y-6">
        {!isLoading &&
          topProducts &&
          topProducts.map((topProduct: ITopProduct) => <FeaturedCard key={topProduct.id} topProduct={topProduct} />)}
      </div>
    </div>
  );
};

export default FeaturedServices;
