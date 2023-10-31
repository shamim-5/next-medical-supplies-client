"use client";
import ProductCard from "@/components/cards/ProductCard";
import { useGetReagentsQuery } from "@/redux/features/reagents/reagentsApi";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import { useAppSelector } from "@/redux/hooks/hook";
import OtherCard from "@/components/cards/OtherCard";
import { useGetConsumablesQuery } from "@/redux/features/consumables/consumablesApi";
import { useGetMedicalEquipmentsQuery } from "@/redux/features/medicalEquipments/medicalEquipmentsApi";

const AllItemsPage = () => {
  const { field, searchTerm } = useAppSelector((state) => state.search) || {};
  const { data: products, isLoading } = useGetProductsQuery({ field, searchTerm }) || [];
  const { data: reagents, isLoading: isReagentsLoading } = useGetReagentsQuery({ field, searchTerm }) || [];

  const { data: consumables, isLoading: isConsumableLoading } = useGetConsumablesQuery({ field, searchTerm }) || [];
  const { data: medicalEquipments, isLoading: isMedicalEquipments } =
    useGetMedicalEquipmentsQuery({ field, searchTerm }) || [];

  return (
    <div>
      <div className="my-4 md:my-6 lg:my-9">
        <h2 className="text-primary text-4xl lg:text-5xl uppercase font-semibold text-center mb-4 py-2">
          Available Products
        </h2>
        <h2 className="text-primary-dark text-3xl lg:text-4xl uppercase font-semibold mb-4">Products and Reagents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-between gap-4 lg:gap-x-12 lg:gap-y-6">
          {!isLoading &&
            products &&
            products.map((product: IProduct) => <ProductCard key={product._id} product={product} />)}
          {!isReagentsLoading &&
            reagents &&
            reagents.map((product: IProduct) => <ProductCard key={product._id} product={product} />)}
        </div>
      </div>
      <div className="my-4 md:my-6 lg:my-9">
        <h2 className="text-primary-dark text-3xl lg:text-4xl uppercase font-semibold mb-4">
          Consumables and Medical Equipments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-between gap-4 lg:gap-x-12 lg:gap-y-6">
          {!isConsumableLoading &&
            consumables &&
            consumables.map((consumable: IProduct) => <OtherCard key={consumable._id} consumable={consumable} />)}

          {!isMedicalEquipments &&
            medicalEquipments &&
            medicalEquipments.map((medicalEquipment: IProduct) => (
              <OtherCard key={medicalEquipment._id} medicalEquipment={medicalEquipment} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllItemsPage;
