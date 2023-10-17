/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Button, Card } from "antd";
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

  const priceME = consumable?.price;
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

  return (
    <>
      {consumable && (
        <Card hoverable className="place-self-stretch" cover={<img alt="example" src={consumable.imageURL} />}>
          <Meta title={consumable.name} description={consumable?.description} className="h-24" />
          <p>{consumable.manufacturer}</p>
          <div className="flex flex-row items-center justify-between">
            <div>
              <Button
                onClick={handleButtonClick}
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
      )}
      {medicalEquipment && (
        <Card hoverable className="place-self-stretch" cover={<img alt="example" src={medicalEquipment.imageURL} />}>
          <Meta title={medicalEquipment.name} description={consumable?.description} className="h-24" />
          <p>{medicalEquipment.manufacturer}</p>
          <div className="flex flex-row items-center justify-between">
            <div>
              <Button
                onClick={handleButtonMe}
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
              <p className="text-lg text-yellow-600/90">{priceIntME}</p>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default OtherCard;
