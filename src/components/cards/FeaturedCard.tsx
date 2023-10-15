/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { EditOutlined, EllipsisOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";

const { Meta } = Card;

interface FeaturedCardProps {
  topProduct: ITopProduct;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ topProduct }) => {
  return (
    <Card
      style={{ width: 280 }}
      cover={
        <img
          alt="example"
          src={topProduct.imageURL || "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
        />
      }
      actions={[<StarOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
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
