import type { Metadata } from "next";
import ProductDetails from "@/components/productDetails/ProductDetails";

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
    <div className="my-4 md:my-6 lg:my-9">
      <ProductDetails id={id} />
    </div>
  );
};

export default ProductDetailsPage;
