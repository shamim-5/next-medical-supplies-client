"use client";
import React from "react";
import { Button, Empty } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const Blank: React.FC = () => (
  <div>
    <Empty
      className="flex items-center justify-center flex-col my-12"
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 120 }}
      description={
        <span>
          Make Purchase <a href="/all-items">Buy Now</a>
        </span>
      }
    >
      <Button type="primary" className="uppercase">
        <a href="/">
          <HomeOutlined /> Back To Home
        </a>
      </Button>

      <h3 className="text-xl text-primary-light bg-cyan py-6 px-2 border-4 border-cyan-light rounded mt-2 font-mono">
        &quot;This page is in under development. Please keep patience to get this features. We will notify you when
        development process done&quot;
      </h3>
    </Empty>
  </div>
);

export default Blank;
