"use client";
import { Button } from "antd";
import React from "react";
import scrollToTopImage from "@/assets/scroll-top.png";
import Image from "next/image";

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 'auto' for instant scroll
    });
  };

  return (
    <Button
      shape="circle"
      ghost
      onClick={scrollToTop}
      className="border-4 border-cyan-light text-primary-light p-1 h-12 w-12 shadow"
      style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}
    >
      <Image src={scrollToTopImage} width={48} alt="scroll-to-top log" />
    </Button>
  );
};

export default ScrollToTopButton;
