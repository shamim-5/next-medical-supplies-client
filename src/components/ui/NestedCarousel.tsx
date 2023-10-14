"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button, Carousel } from "antd";
import Link from "next/link";

const NestedCarousel: React.FC = () => {
  return (
    <Carousel autoplay dots={false} easing="linear" dotPosition="left" style={{ width: "100%", height: "100%" }}>
      <div>
        <div className="w-[420px] h-[250px] bg-[#19B3BD] text-white px-4 flex flex-col justify-center ">
          <h3 className="text-5xl uppercase pb-2 font-semibold">Surgical Equipments</h3>
          <p className="text-xl py-4">Don&apos;t miss your special offer!</p>
          <Button className="border-4 border-[#5ECAD1] uppercase font-mono font-semibold" size="large">
            <Link className="text-[#19B3BD]" href={"/"}>
              Shop Now
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <div className="w-[420px] h-[250px] bg-[#19B3BD] text-white px-4 flex flex-col justify-center ">
          <h3 className="text-5xl uppercase pb-2 font-semibold">Laboratory Reagents</h3>
          <p className="text-xl py-4">Don&apos;t miss your special offer!</p>
          <Button className="border-4 border-[#5ECAD1] uppercase font-mono font-semibold" size="large">
            <Link className="text-[#19B3BD]" href={"/"}>
              Shop Now
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <div className="w-[420px] h-[250px] bg-[#19B3BD] text-white px-4 flex flex-col justify-center ">
          <h3 className="text-5xl uppercase pb-2 font-semibold">Medical Equipments</h3>
          <p className="text-xl py-4">Don&apos;t miss your special offer!</p>
          <Button className="border-4 border-[#5ECAD1] uppercase font-mono font-semibold" size="large">
            <Link className="text-[#19B3BD]" href={"/"}>
              Shop Now
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <div className="w-[420px] h-[250px] bg-[#19B3BD] text-white px-4 flex flex-col justify-center ">
          <h3 className="text-5xl uppercase pb-2 font-semibold">Disposable Masks</h3>
          <p className="text-xl py-4">Don&apos;t miss your special offer!</p>
          <Button className="border-4 border-[#5ECAD1] uppercase font-mono font-semibold" size="large">
            <Link className="text-[#19B3BD]" href={"/"}>
              Shop Now
            </Link>
          </Button>
        </div>
      </div>
    </Carousel>
  );
};

export default NestedCarousel;
