"use client";
import ProductCard from "@/components/cards/ProductCard";
import { useGetReagentsQuery } from "@/redux/features/reagents/reagentsApi";

const ReagentsPage = () => {
  const { data: products, isLoading } = useGetReagentsQuery({ undefined });

  return (
    <div className="my-4 md:my-6 lg:my-9">
      <h2 className="text-primary-dark text-3xl lg:text-4xl uppercase font-semibold mb-4">All Reagents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-between gap-4 lg:gap-x-12 lg:gap-y-6">
        {!isLoading && products.map((product: IProduct) => <ProductCard key={product._id} product={product} />)}
      </div>
    </div>
  );
};

export default ReagentsPage;
