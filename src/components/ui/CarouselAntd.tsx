"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Carousel } from "antd";
import NestedCarousel from "./NestedCarousel";

const CarouselAntd: React.FC = () => {
  return (
    <div className="">
      <Carousel className="h-[460px]" dotPosition={"bottom"} autoplay>
        <div className="relative">
          <img
            src="https://img.freepik.com/free-photo/electric-microscope-with-teal-background_23-2148264153.jpg?w=1380&t=st=1697283589~exp=1697284189~hmac=6111af97c9cd6337548059951bffc696e2be55abb4621e6f48573914d710117e"
            alt="carousel-image"
            style={{ width: "100%", height: "460px", objectFit: "cover" }}
          />
          <div className="absolute bottom-12 left-12 w-full">
            <NestedCarousel />
          </div>
        </div>
        <div className="relative">
          <img
            src="https://img.freepik.com/free-photo/flat-lay-health-still-life-arrangement-with-copy-space_23-2148854064.jpg?w=1480&t=st=1697278126~exp=1697278726~hmac=4c9f39a8bdb254c8444092a892289facb266319a2d44c167b537dc8ba9d04349"
            style={{ width: "100%", height: "460px", objectFit: "cover" }}
            alt="carousel-image-2"
          />
          <div className="absolute bottom-12 left-12 w-full">
            <NestedCarousel />
          </div>
        </div>
        <div className="relative">
          <img
            src="https://img.freepik.com/free-photo/many-kind-medical-equipment-manage-surgeon-start-operations-operating-room_1301-7802.jpg?w=1380&t=st=1697278296~exp=1697278896~hmac=d3387577547720de9bed5084d01ad0e52f336f1a001806c71b0aa7cc7360444a"
            style={{ width: "100%", height: "460px", objectFit: "cover" }}
            alt="carousel-image-3"
          />
          <div className="absolute bottom-12 left-12 w-full">
            <NestedCarousel />
          </div>
        </div>
        <div className="relative">
          <img
            src="https://img.freepik.com/free-photo/scientific-microscope-laboratory-desk-with-researching-instruments_482257-13971.jpg?w=1480&t=st=1697278268~exp=1697278868~hmac=4a1b328c94a8e0ea2863209d1c3cd31737089b2abd811d2dc1561de474e393ae"
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
