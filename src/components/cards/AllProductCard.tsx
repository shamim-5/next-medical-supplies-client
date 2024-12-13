/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Button, Card, Image } from "antd";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks/hook";
import { toast } from "react-toastify";
import { addToCart } from "@/redux/features/cart-items/cartItemsSlice";

const { Meta } = Card;

interface AllProductCardProps {
  product: IProduct;
}

const AllProductCard: React.FC<AllProductCardProps> = ({ product }) => {
  const router = useRouter();
  const price = product?.price;
  const priceInt: number | undefined = Number(price);

  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    dispatch(addToCart(product));
    // router.push("/user/cart-items");
    toast.success("Add to cart success !");
  };

  const handleDetailsButton = () => {
    router.push(`/${product.id}`);
  };

  return (
    <Card
      hoverable
      className="place-self-stretch"
      cover={<Image alt="example" src={product.imageURL} style={{ width: "100%" }} />}
    >
      <Meta
        title={product.name}
        description={
          <div className="h-12 overflow-hidden">
            <p className="line-clamp-3 leading-none">{product.description || "This is the description"}</p>
          </div>
        }
      />
      <div className="flex items-center justify-between">
        <p className="line-clamp-1">{product.manufacturer}</p>
        <Button
          onClick={handleDetailsButton}
          className="text-cyan hover:font-bold m-0 p-0 font-thin font-mono text-xs "
          type="link"
        >
          Details
        </Button>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div>
          <Button onClick={handleButtonClick} className="commonBtn" size="small" type="primary" htmlType="submit">
            Add To Cart
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

export default AllProductCard;
