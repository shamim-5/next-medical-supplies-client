import { Metadata } from "next";
import DueList from "@/components/shared/DueList";

export const metadata: Metadata = {
  title: "Due List",
  description: "Surgical equipments shop app",
};

const DueListPage = () => {
  return (
    <div>
      <DueList />
    </div>
  );
};

export default DueListPage;
