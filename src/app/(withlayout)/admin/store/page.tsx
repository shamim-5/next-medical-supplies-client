import StoreForm from "@/components/admin/StoreForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NB_Surgical - Store page",
  description: "Surgical equipments shop app",
};

const CustomersPage = () => {
  return (
    <div>
      <StoreForm />
    </div>
  );
};

export default CustomersPage;
