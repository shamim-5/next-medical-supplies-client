"use client";
import ProductCard from "@/components/cards/ProductCard";
import { useGetDevicesQuery } from "@/redux/features/devices/devicesApi";
import { useAppSelector } from "@/redux/hooks/hook";

const DevicePageData: React.FC = () => {
  const { field, searchTerm } = useAppSelector((state) => state.search) || {};
  const { data: { data: devices } = [], isLoading } = useGetDevicesQuery({ field, searchTerm }) || [];

  return (
    <div className="my-4 md:my-6 lg:my-9">
      <h2 className="text-primary-dark text-3xl lg:text-4xl uppercase font-semibold mb-4">All Devices</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-between gap-4 lg:gap-x-12 lg:gap-y-6">
        {!isLoading && devices.map((device: IProduct) => <ProductCard key={device.id} product={device} />)}
      </div>
    </div>
  );
};

export default DevicePageData;
