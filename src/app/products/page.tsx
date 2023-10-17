"use client";
import ProductCard from "@/components/cards/ProductCard";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import { useAppSelector } from "@/redux/hooks/hook";

const ProductsPage = () => {
  const { field, searchTerm } = useAppSelector((state) => state.helper) || {};
  const { data: products, isLoading } = useGetProductsQuery({ field, searchTerm }) || [];

  return (
    <div className="my-4 md:my-6 lg:my-9">
      <h2 className="text-primary-dark text-3xl lg:text-4xl uppercase font-semibold mb-4">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-between gap-4 lg:gap-x-12 lg:gap-y-6">
        {!isLoading && products.map((product: IProduct) => <ProductCard key={product._id} product={product} />)}
      </div>
    </div>
  );
};

export default ProductsPage;
