"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button, Carousel } from "antd";
import Link from "next/link";

const NestedCarousel: React.FC = () => {
  return (
    <Carousel autoplay dots={false} easing="linear" dotPosition="left" style={{ width: "100%", height: "100%" }}>
      <div>
        <div className="w-[320px] md:w-[420px] h-[250px] bg-[#19B3BD] text-white px-2 md:px-4 flex flex-col justify-center ">
          <h3 className="text-3xl md:text-4xl lg:text-5xl uppercase pb-2 font-semibold mr-4">Surgical Equipments</h3>
          <p className="text-sm md:text-xl py-6">Don&apos;t miss your special offer!</p>
          <Button className="border-4 border-[#5ECAD1] uppercase font-mono font-semibold w-32 md:w-full" size="large">
            <Link className="text-[#19B3BD]" href="/devices">
              Shop Now
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <div className="w-[320px] md:w-[420px] h-[250px] bg-[#19B3BD] text-white px-2 md:px-4 flex flex-col justify-center ">
          <h3 className="text-3xl md:text-4xl lg:text-5xl uppercase pb-2 font-semibold mr-4">Laboratory Reagents</h3>
          <p className="text-sm md:text-xl py-6">Don&apos;t miss your special offer!</p>
          <Button className="border-4 border-[#5ECAD1] uppercase font-mono font-semibold w-32 md:w-full" size="large">
            <Link className="text-[#19B3BD]" href="/reagents">
              Shop Now
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <div className="w-[320px] md:w-[420px] h-[250px] bg-[#19B3BD] text-white px-2 md:px-4 flex flex-col justify-center ">
          <h3 className="text-3xl md:text-4xl lg:text-5xl uppercase pb-2 font-semibold mr-4">Medical Equipments</h3>
          <p className="text-sm md:text-xl py-6">Don&apos;t miss your special offer!</p>
          <Button className="border-4 border-[#5ECAD1] uppercase font-mono font-semibold w-32 md:w-full" size="large">
            <Link className="text-[#19B3BD]" href="/others">
              Shop Now
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <div className="w-[320px] md:w-[420px] h-[250px] bg-[#19B3BD] text-white px-2 md:px-4 flex flex-col justify-center ">
          <h3 className="text-3xl md:text-4xl lg:text-5xl uppercase pb-2 font-semibold mr-4">Disposable Masks</h3>
          <p className="text-sm md:text-xl py-6">Don&apos;t miss your special offer!</p>
          <Button className="border-4 border-[#5ECAD1] uppercase font-mono font-semibold w-32 md:w-full" size="large">
            <Link className="text-[#19B3BD]" href="/all-items">
              Shop Now
            </Link>
          </Button>
        </div>
      </div>
    </Carousel>
  );
};

export default NestedCarousel;
