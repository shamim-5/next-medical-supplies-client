import type { Metadata } from "next";
import ReagentsPageData from "@/components/reagents/ReagentsPageData";

export const metadata: Metadata = {
  title: "Reagent page",
  description: "Surgical equipments shop app",
};

const ReagentsPage = () => {
  return (
    <>
      <ReagentsPageData />
    </>
  );
};

export default ReagentsPage;
