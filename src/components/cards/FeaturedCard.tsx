/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Avatar, Card, Image } from "antd";

const { Meta } = Card;

interface FeaturedCardProps {
  topProduct: ITopProduct;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ topProduct }) => {
  return (
    <Card
      className="place-self-stretch"
      cover={
        <Image
          alt="example"
          src={topProduct.imageURL || "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
        />
      }
    >
      <Meta
        avatar={<Avatar src={topProduct.avatarUrl || "https://xsgames.co/randomusers/avatar.php?g=pixel"} />}
        title={topProduct.name || "Card title"}
        description={topProduct.description || "This is the description"}
      />
    </Card>
  );
};

export default FeaturedCard;
