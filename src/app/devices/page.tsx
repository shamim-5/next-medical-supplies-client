import type { Metadata } from "next";
import DevicePageData from "@/components/device/DevicePageData";

export const metadata: Metadata = {
  title: "Device page",
  description: "Surgical equipments shop app",
};

const DevicesPage = () => {
  return (
    <>
      <DevicePageData />
    </>
  );
};

export default DevicesPage;
