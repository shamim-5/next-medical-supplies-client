/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Button, Card } from "antd";

const { Meta } = Card;

interface AllProductCardProps {
  product: ITopProduct;
}

const AllProductCard: React.FC<AllProductCardProps> = ({ product }) => {
  return (
    <Card hoverable style={{ width: 240 }} cover={<img alt="example" src={product.imageURL} />}>
      <Meta title={product.name} description={product?.description} className="h-32" />
      <Button
        className="bg-gradient-to-l hover:bg-gradient-to-b from-primary/90 to-primary/70 hover:text-slate-900 mt-2 absolute bottom-2"
        type="primary"
        htmlType="submit"
      >
        Shop Now
      </Button>
    </Card>
  );
};

export default AllProductCard;
