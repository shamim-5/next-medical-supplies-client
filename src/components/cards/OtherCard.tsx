/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Button, Card, Image } from "antd";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks/hook";
import { addToCart } from "@/redux/features/cart-items/cartItemsSlice";
import { toast } from "react-toastify";

const { Meta } = Card;

interface OtherCardProps {
  consumable?: IProduct;
  medicalEquipment?: IProduct;
}

const OtherCard: React.FC<OtherCardProps> = ({ consumable, medicalEquipment }) => {
  const router = useRouter();
  const price = consumable?.price;
  const priceInt: number | undefined = Number(price);

  const priceME = medicalEquipment?.price;
  const priceIntME: number | undefined = Number(priceME);

  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    if (consumable) {
      dispatch(addToCart(consumable));
      router.push("/user/cart-items");
      toast.success("Add to cart success");
    }
  };
  const handleButtonMe = () => {
    if (medicalEquipment) {
      dispatch(addToCart(medicalEquipment));
      router.push("/user/cart-items");
      toast.success("Add to cart success");
    }
  };

  const handleDetailsButton = () => {
    router.push(`/${consumable?.id}`);
  };
  const handleDetailsButtonForME = () => {
    router.push(`/${medicalEquipment?.id}`);
  };

  return (
    <>
      {consumable && (
        <Card hoverable className="place-self-stretch" cover={<Image alt="example" src={consumable.imageURL} />}>
          <Meta
            title={consumable.name}
            description={
              <div className="h-12 overflow-hidden">
                <p className="line-clamp-3 leading-none">{consumable.description || "This is the description"}</p>
              </div>
            }
          />
          <div className="flex items-center justify-between">
            <p className="line-clamp-1">{consumable.manufacturer}</p>
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
              <Button onClick={handleButtonClick} className="commonBtn" type="primary" htmlType="submit">
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
              <p className="text-lg text-yellow-600/90">{!isNaN(priceInt) ? priceInt : ""}</p>
            </div>
          </div>
        </Card>
      )}
      {medicalEquipment && (
        <Card hoverable className="place-self-stretch" cover={<Image alt="example" src={medicalEquipment.imageURL} />}>
          <Meta
            title={medicalEquipment.name}
            description={
              <div className="h-12 overflow-hidden">
                <p className="line-clamp-3 leading-none">{medicalEquipment.description || "This is the description"}</p>
              </div>
            }
          />
          <div className="flex items-center justify-between">
            <p className="line-clamp-1">{medicalEquipment.manufacturer}</p>
            <Button
              onClick={handleDetailsButtonForME}
              className="text-cyan hover:font-bold m-0 p-0 font-thin font-mono text-xs "
              type="link"
            >
              Details
            </Button>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div>
              <Button onClick={handleButtonMe} className="commonBtn" type="primary" htmlType="submit">
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
              <p className="text-lg text-yellow-600/90">{!isNaN(priceIntME) ? priceIntME : ""}</p>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default OtherCard;
