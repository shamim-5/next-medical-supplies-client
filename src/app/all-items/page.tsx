import type { Metadata } from "next";
import AllItemsPageData from "@/components/allItems/AllItemsPageData";

export const metadata: Metadata = {
  title: "All-Items page",
  description: "Surgical equipments shop app",
};

const AllItemsPage = () => {
  return (
    <>
      <AllItemsPageData />
    </>
  );
};

export default AllItemsPage;
