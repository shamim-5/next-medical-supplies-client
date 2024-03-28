"use client";
import ProductCard from "@/components/cards/ProductCard";
import { useGetReagentsQuery } from "@/redux/features/reagents/reagentsApi";
import { useAppSelector } from "@/redux/hooks/hook";
import OtherCard from "@/components/cards/OtherCard";
import { useGetConsumablesQuery } from "@/redux/features/consumables/consumablesApi";
import { useGetMedicalEquipmentsQuery } from "@/redux/features/medicalEquipments/medicalEquipmentsApi";
import { useGetDevicesQuery } from "@/redux/features/devices/devicesApi";

const AllItemsPageData = () => {
  const { field, searchTerm } = useAppSelector((state) => state.search) || {};
  const { data: { data: reagents } = [], isLoading: isReagentsLoading } =
    useGetReagentsQuery({ field, searchTerm }) || [];
  const { data: { data: devices } = [], isLoading: isDevicesLoading } = useGetDevicesQuery({ field, searchTerm }) || [];

  const { data: { data: consumables } = [], isLoading: isConsumableLoading } =
    useGetConsumablesQuery({ field, searchTerm }) || [];
  const { data: { data: medicalEquipments } = [], isLoading: isMedicalEquipments } =
    useGetMedicalEquipmentsQuery({ field, searchTerm }) || [];

  return (
    <div>
      <div className="my-4 md:my-6 lg:my-9">
        <h2 className="text-primary text-4xl lg:text-5xl uppercase font-semibold text-center mb-4 py-2">
          Available Products
        </h2>
        <h2 className="text-primary-dark text-3xl lg:text-4xl uppercase font-semibold mb-4">Reagents and Devices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-between gap-4 lg:gap-x-12 lg:gap-y-6">
          {!isReagentsLoading &&
            reagents &&
            reagents.map((product: IProduct) => <ProductCard key={product.id} product={product} />)}
          {!isDevicesLoading &&
            devices &&
            devices.map((product: IProduct) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
      <div className="my-4 md:my-6 lg:my-9">
        <h2 className="text-primary-dark text-3xl lg:text-4xl uppercase font-semibold mb-4">
          Consumables and Medical Equipments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-between gap-4 lg:gap-x-12 lg:gap-y-6">
          {!isConsumableLoading &&
            consumables &&
            consumables.map((consumable: IProduct) => <OtherCard key={consumable.id} consumable={consumable} />)}

          {!isMedicalEquipments &&
            medicalEquipments &&
            medicalEquipments.map((medicalEquipment: IProduct) => (
              <OtherCard key={medicalEquipment.id} medicalEquipment={medicalEquipment} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllItemsPageData;
