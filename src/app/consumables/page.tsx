"use client";

import OtherCard from "@/components/cards/OtherCard";
import { useGetConsumablesQuery } from "@/redux/features/consumables/consumablesApi";
import { useAppSelector } from "@/redux/hooks/hook";

const ConsumablesPage = () => {
  const { field, searchTerm } = useAppSelector((state) => state.search) || {};

  const { data: { data: consumables } = [], isLoading } = useGetConsumablesQuery({ field, searchTerm }) || [];

  return (
    <div className="my-4 md:my-6 lg:my-9">
      <h2 className="text-primary-dark text-3xl lg:text-4xl uppercase font-semibold mb-4">Consumables</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-between gap-4 lg:gap-x-12 lg:gap-y-6">
        {!isLoading &&
          consumables.map((consumable: IProduct) => <OtherCard key={consumable.id} consumable={consumable} />)}
      </div>
    </div>
  );
};

export default ConsumablesPage;
