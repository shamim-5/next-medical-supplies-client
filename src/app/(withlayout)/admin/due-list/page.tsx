import { Metadata } from "next";
import DueList from "@/components/shared/DueList";

export const metadata: Metadata = {
  title: "Due List",
  description: "Surgical equipments shop app",
};

const DueListPage = () => {
  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-semibold uppercase py-2 mt-4">Due List</h2>
      <DueList />
    </div>
  );
};

export default DueListPage;
