"use client";

import React from "react";
import FeaturedCard from "../cards/FeaturedCard";
import { useGetTopProductsQuery } from "@/redux/features/topProducts/topProductsApi";
import { useGetMedicalEquipmentsQuery } from "@/redux/features/medicalEquipments/medicalEquipmentsApi";
import { useAppSelector } from "@/redux/hooks/hook";
import OtherCard from "../cards/OtherCard";
import FeaturedCardTwo from "../cards/FeaturedCardTwo";

const FeaturedServices = () => {
  const { data: { data: topProducts } = [], isLoading } = useGetTopProductsQuery({ undefined }) || [];
  const { field, searchTerm } = useAppSelector((state) => state.search) || {};
  const { data: { data: medicalEquipments } = [], isLoading: isMedicalEquipments } =
    useGetMedicalEquipmentsQuery({ field, searchTerm }) || [];

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-x-12 lg:gap-y-6 place-content-between mt-6 md:mt-9 lg:mt-12">
        {!isMedicalEquipments &&
          medicalEquipments
            .slice(-0, 2)
            .map((medicalEquipment: IProduct) => (
              <FeaturedCardTwo key={medicalEquipment.id} medicalEquipment={medicalEquipment} />
            ))}
      </div>
    </div>
  );
};

export default FeaturedServices;
