import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NB_Surgical - Cart Items page",
  description: "Surgical equipments shop app",
};
import CartItemsTable from "@/components/user/CartItemsTable";

const CartItemPage = () => {
  return (
    <div>
      <CartItemsTable />
    </div>
  );
};

export default CartItemPage;
