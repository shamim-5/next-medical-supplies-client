"use client";

/* eslint-disable @next/next/no-img-element */
import { useGetShopDetailsQuery } from "@/redux/features/surgicalShop/surgicalShopApi";
import CarouselBuyOnline from "../ui/CarouselBuyOnline";
import { Button, Divider } from "antd";
import Link from "next/link";
import { ContactsOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import storysetImage from "@/assets/world-bro.png";
import Image from "next/image";

const BuyOnline: React.FC = () => {
  const { data: { data: shopDetails } = [], isLoading } = useGetShopDetailsQuery(undefined) || {};

  const { location, contact, sliderImage, sliderImageContent } = (!isLoading && shopDetails && shopDetails[0]) || {};

  return (
    <div className="my-6 md:my-9 lg:my-12">
      <div className="relative ">
        <img
          src={sliderImage?.urlFour}
          style={{ width: "100%", height: "360px", objectFit: "cover" }}
          alt="carousel-image-4"
        />

        <div className="absolute top-0 left-0 w-full py-4">
          <div className="w-auto text-white px-4 flex flex-col justify-center ">
            <h3 className="text-2xl md:text-4xl lg:text-5xl uppercase pb-6 font-semibold w-full lg:w-[calc(100vw-360px)]">
              {sliderImageContent?.urlFourContent?.h1 || "Hospital and Diagnostic Equipments Buy Online at Home"}
            </h3>
          </div>
          <CarouselBuyOnline />
          <Button
            className="border-4 border-[#5ECAD1] mx-4 uppercase font-mono font-semibold w-48 mt-4 lg:mt-6"
            size="large"
          >
            <Link className="text-[#19B3BD]" href="/all-items">
              Order Now
            </Link>
          </Button>

          <div className="text-white p-4 mt-2 lg:mt-6">
            <div className="flex lg:flex-row flex-col lg:space-x-2 leading-none">
              <h3 className=" text-sm mr-1">
                <PhoneOutlined className=" text-sm mr-1 rotate-90" />
                <span className="">Contact us: </span>
                {contact?.phone}
              </h3>
              <Divider className="lg:flex hidden" type="vertical" />
              <h3 className=" text-sm mr-1">
                <MailOutlined className=" text-sm mr-1" />
                <span className="">Email: </span>
                {contact?.email}
              </h3>
            </div>
            <div className="flex space-x-2 leading-none">
              <h3 className=" text-sm mr-1">
                <ContactsOutlined className=" text-sm mr-1" />
                <span className="">Address: </span>
                {location?.address}, {location?.city}-{location?.zipCode}, {location?.country}
              </h3>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 lg:flex hidden">
          <Image src={storysetImage} width={360} className="animate-pulse mt-4 pt-4" alt="order-now-image" />
        </div>
      </div>
    </div>
  );
};

export default BuyOnline;
