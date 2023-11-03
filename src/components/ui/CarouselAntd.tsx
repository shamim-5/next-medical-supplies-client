"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Carousel } from "antd";
import NestedCarousel from "./NestedCarousel";
import { useGetShopDetailsQuery } from "@/redux/features/surgicalShop/surgicalShopApi";

const CarouselAntd: React.FC = () => {
  const { data, isLoading } = useGetShopDetailsQuery(undefined) || {};

  const { sliderImage } = (!isLoading && data[0]) || {};

  return (
    <div className="relative top-0 left-0">
      <Carousel className="h-[460px]" dotPosition={"bottom"} autoplay>
        <div className="relative">
          <img
            src={sliderImage?.urlOne}
            alt="carousel-image"
            style={{ width: "100%", height: "460px", objectFit: "cover" }}
          />
          <div className="absolute bottom-12 left-12 w-full">
            <NestedCarousel />
          </div>
        </div>
        <div className="relative">
          <img
            src={sliderImage?.urlTwo}
            style={{ width: "100%", height: "460px", objectFit: "cover" }}
            alt="carousel-image-2"
          />
          <div className="absolute bottom-12 left-12 w-full">
            <NestedCarousel />
          </div>
        </div>
        <div className="relative">
          <img
            src={sliderImage?.urlThree}
            style={{ width: "100%", height: "460px", objectFit: "cover" }}
            alt="carousel-image-3"
          />
          <div className="absolute bottom-12 left-12 w-full">
            <NestedCarousel />
          </div>
        </div>
        <div className="relative">
          <img
            src={sliderImage?.urlFour}
            style={{ width: "100%", height: "460px", objectFit: "cover" }}
            alt="carousel-image-4"
          />
          <div className="absolute bottom-12 left-12 w-full">
            <NestedCarousel />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselAntd;
