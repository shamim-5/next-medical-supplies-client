"use client";
import React from "react";
import { Button, Empty } from "antd";

const EmptyData: React.FC = () => (
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
      <Button type="primary">
        <a href="/all-items">Buy Now</a>
      </Button>
    </Empty>
  </div>
);

export default EmptyData;
