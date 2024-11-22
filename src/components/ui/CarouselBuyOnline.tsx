"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button, Carousel } from "antd";
import Link from "next/link";

const CarouselBuyOnline: React.FC = () => {
  return (
    <Carousel autoplay dots={false} easing="linear" dotPosition="right" style={{ width: "100%", height: "100%" }}>
      <div>
        <div className="w-auto h-[50px] text-white px-4 flex flex-col justify-center">
          <p className="text-sm md:text-xl py-4 leading-none">Don&apos;t miss your special offer!</p>
        </div>
      </div>
      <div>
        <div className="w-auto h-[50px] text-white px-4 flex flex-col justify-center ">
          <p className="text-sm lg:text-xl py-4 leading-none">Don&apos;t miss your special offer!</p>
        </div>
      </div>
    </Carousel>
  );
};

export default CarouselBuyOnline;
