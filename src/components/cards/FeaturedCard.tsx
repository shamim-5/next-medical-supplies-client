/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Avatar, Button, Card, Image } from "antd";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks/hook";
import { addToCart } from "@/redux/features/cart-items/cartItemsSlice";
import { toast } from "react-toastify";

const { Meta } = Card;

interface FeaturedCardProps {
  topProduct: ITopProduct;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ topProduct }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    dispatch(addToCart(topProduct));
    // router.push("/user/cart-items");
    toast.success("Add to cart success !");
  };

  const handleDetailsButton = () => {
    router.push(`/${topProduct.id}`);
    sessionStorage.setItem("routes", "top-products");
  };
  return (
    <Card
      className="place-self-stretch pb-0 mb-0"
      cover={
        <Image
          alt="example"
          src={topProduct.imageURL || "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
        />
      }
    >
      <Meta
        avatar={<Avatar src={topProduct.avatarUrl || "https://xsgames.co/randomusers/avatar.php?g=pixel"} />}
        title={topProduct.name || "Card title"}
        description={
          <div className="h-12 overflow-hidden">
            <p className="line-clamp-3 leading-none">{topProduct.description || "This is the description"}</p>
          </div>
        }
      />
      <div className="flex pt-2 items-center justify-between">
        <p className="line-clamp-1">{topProduct.manufacturer}</p>
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
        <div className="flex items-center justify-end ml-4">
          <img
            width={28}
            src="https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/58/external-taka-currency-vitaliy-gorbachev-flat-vitaly-gorbachev.png"
            alt="external-taka-currency-vitaliy-gorbachev-flat-vitaly-gorbachev"
          />
          <p className="text-lg  text-yellow-600/90">{parseInt(`${topProduct?.price}`)}</p>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedCard;
