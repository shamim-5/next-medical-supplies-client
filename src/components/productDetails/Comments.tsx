"use client";

import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Avatar, Divider, List, Skeleton, Space } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/redux/hooks/hook";
import useUserInfo from "@/hooks/useUserInfo";
import { reviewsApi } from "@/redux/features/reviews/reviewsApi";

interface ICommentsProps {
  id: string;
}
const Comments: React.FC<ICommentsProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IReview[]>([]);
  const { displayName } = useUserInfo();

  const dispatch = useAppDispatch();

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const {
      data: { data: reviews },
    } = await dispatch(reviewsApi.endpoints.getAllReviewsById.initiate(id));
    setData([...reviews]);
    setLoading(false);
  };

  useEffect(() => {
    loadMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const IconText = ({ icon, text }: { icon: React.FC; text: string | number }) => (
    <Space className="ml-4 text-red-900/70">
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 200,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item, i) => (
            <List.Item key={id}>
              <List.Item.Meta
                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`} />}
                title={
                  <div>
                    {displayName}
                    <IconText icon={StarOutlined} text={item.rating} key="list-vertical-star-o" />
                  </div>
                }
                description={item.comment}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default Comments;
