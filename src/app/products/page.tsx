"use client"
import ProductCard from "@/components/cards/ProductCard";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";

const ProductsPage = () => {
  const { data: products, isLoading } = useGetProductsQuery({ undefined });

   return (
     <div className="my-4 md:my-6 lg:my-9">
       <h2 className="text-primary-dark text-4xl uppercase font-semibold mb-4">All Products</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {!isLoading && products.map((product: IProduct) => <ProductCard key={product._id} product={product} />)}
       </div>
     </div>
   );
};

export default ProductsPage;