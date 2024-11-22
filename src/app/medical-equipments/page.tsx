"use client";

import OtherCard from "@/components/cards/OtherCard";
import { useGetMedicalEquipmentsQuery } from "@/redux/features/medicalEquipments/medicalEquipmentsApi";
import { useAppSelector } from "@/redux/hooks/hook";

const MedicalEquipmentsPage = () => {
  const { field, searchTerm } = useAppSelector((state) => state.search) || {};

  const { data: { data: medicalEquipments } = [], isLoading: isMedicalEquipments } =
    useGetMedicalEquipmentsQuery({ field, searchTerm }) || [];

  return (
    <div className="my-4 md:my-6 lg:my-9">
      <h2 className="text-primary-dark text-3xl lg:text-4xl uppercase font-semibold mb-4">Medical Equipments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-between gap-4 lg:gap-x-12 lg:gap-y-6">
        {!isMedicalEquipments &&
          medicalEquipments.map((medicalEquipment: IProduct) => (
            <OtherCard key={medicalEquipment.id} medicalEquipment={medicalEquipment} />
          ))}
      </div>
    </div>
  );
};

export default MedicalEquipmentsPage;
