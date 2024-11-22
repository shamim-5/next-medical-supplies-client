/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Button, Card } from "antd";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks/hook";
import { addToCart } from "@/redux/features/cart-items/cartItemsSlice";
import { toast } from "react-toastify";

const { Meta } = Card;

interface FeaturedCardTwoProps {
  medicalEquipment?: IProduct;
}

const FeaturedCardTwo: React.FC<FeaturedCardTwoProps> = ({ medicalEquipment }) => {
  const router = useRouter();

  const priceME = medicalEquipment?.price;
  const priceIntME: number | undefined = Number(priceME);

  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    if (medicalEquipment) {
      dispatch(addToCart(medicalEquipment));
      router.push("/user/cart-items");
      toast.success("Add to cart success");
    }
  };

  const handleDetailsButtonForME = () => {
    router.push(`/${medicalEquipment?.id}`);
  };

  return (
    <>
      {medicalEquipment && (
        <Card
          className="place-self-stretch transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          cover={<img onClick={handleDetailsButtonForME} alt="example" src={medicalEquipment.imageURL} />}
        >
          <Meta
            title={
              <>
                <div className="flex flex-row items-center justify-between">
                  <div>{medicalEquipment.name}</div>
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
              </>
            }
            description={
              <>
                <div className="flex flex-row items-center justify-between">
                  <div className="line-clamp-1">{medicalEquipment.manufacturer}</div>
                  <div>
                    <Button
                      onClick={handleButtonClick}
                      className="commonBtn line-clamp-1"
                      size="small"
                      type="primary"
                      htmlType="submit"
                    >
                      Buy now
                    </Button>
                  </div>
                </div>
              </>
            }
          />
        </Card>
      )}
    </>
  );
};

export default FeaturedCardTwo;
