"use client";

import OtherCard from "@/components/cards/OtherCard";
import { useGetConsumablesQuery } from "@/redux/features/consumables/consumablesApi";
import { useGetMedicalEquipmentsQuery } from "@/redux/features/medicalEquipments/medicalEquipmentsApi";

const AllItemsPage = () => {
  const { data: consumables, isLoading } = useGetConsumablesQuery({ undefined });
  const { data: medicalEquipments, isLoading: isMedicalEquipments } = useGetMedicalEquipmentsQuery({ undefined });

  // console.log(medicalEquipments, isMedicalEquipments);
  // console.log(consumables, isLoading);
  return (
    <div className="my-4 md:my-6 lg:my-9">
      <h2 className="text-primary-dark text-4xl uppercase font-semibold mb-4">Consumables and Medical Equipments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!isLoading &&
          consumables.map((consumable: IProduct) => <OtherCard key={consumable._id} consumable={consumable} />)}

        {!isMedicalEquipments &&
          medicalEquipments.map((medicalEquipment: IProduct) => (
            <OtherCard key={medicalEquipment._id} medicalEquipment={medicalEquipment} />
          ))}
      </div>
    </div>
  );
};

export default AllItemsPage;