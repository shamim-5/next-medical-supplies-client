import AllGoodsList from "@/components/shared/AllGoodsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Goods page",
  description: "Surgical equipment shop app",
};

const AllGoodsPage = () => {
  return (
    <div>
      <AllGoodsList />
    </div>
  );
};

export default AllGoodsPage;
