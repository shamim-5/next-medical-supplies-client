/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Button, Card } from "antd";
import { useRouter } from "next/navigation";

const { Meta } = Card;

interface ProductCardProps {
  product: ITopProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const price = product?.price;
  const priceInt: number | undefined = Number(price);

  return (
    <Card hoverable style={{ width: 300 }} cover={<img alt="example" src={product.imageURL} />}>
      <Meta title={product.name} description={product?.description} className="h-24" />
      <p>{product.manufacturer}</p>
      <div className="flex flex-row items-center justify-betweeen">
        <div>
          <Button
            onClick={() => router.push("/users/cart-items")}
            className="bg-gradient-to-l hover:bg-gradient-to-b uppercase from-primary/90 to-primary/70 hover:text-slate-900 "
            type="primary"
            htmlType="submit"
          >
            Buy now
          </Button>
        </div>
        <div className="flex items-center ml-4">
          <img
            width="28"
            height="28"
            src="https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/58/external-taka-currency-vitaliy-gorbachev-flat-vitaly-gorbachev.png"
            alt="external-taka-currency-vitaliy-gorbachev-flat-vitaly-gorbachev"
          />
          <p className="text-lg text-yellow-600/90">{priceInt}</p>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;