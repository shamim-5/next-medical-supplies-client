import type { Metadata } from "next";
import OthersPageData from "@/components/others/OthersPageData";

export const metadata: Metadata = {
  title: "Others page",
  description: "Surgical equipments shop app",
};

const OthersPage = () => {
  return (
    <>
      <OthersPageData />
    </>
  );
};

export default OthersPage;
