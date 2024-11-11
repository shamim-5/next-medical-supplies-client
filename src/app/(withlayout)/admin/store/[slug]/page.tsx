import type { Metadata } from "next";
import StoreFormPatch from "@/components/admin/StoreFormPatch";

export const metadata: Metadata = {
  title: "NB_Surgical - Product-Details page",
  description: "Surgical equipments shop app",
};

interface ProductDetailsPageParams {
  slug: string;
}
interface ProductDetailsPageProps {
  params?: ProductDetailsPageParams;
}
const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({ params }) => {
  const id = params?.slug;

  return (
    <div>
      <StoreFormPatch id={id} />
    </div>
  );
};

export default ProductDetailsPage;
