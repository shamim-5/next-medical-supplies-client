import React from "react";
import { Button, notification, Space } from "antd";
import { toast } from "react-toastify";

interface NotificationConfirmProps {
  title: string;
  description: string;
  onConfirm: () => void;
}

const NotificationConfirm: React.FC<NotificationConfirmProps> = ({ title, description, onConfirm }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button className=" text-cyan hover:border-cyan" size="small" onClick={() => api.destroy()}>
          Cancel
        </Button>
        <Button
          className="commonBtn text-white leading-none"
          size="small"
          onClick={() => {
            api.destroy(key);
            onConfirm();
          }}
        >
          Confirm
        </Button>
      </Space>
    );

    api.open({
      message: title,
      description,
      btn,
      key,
      duration: 0,
    });
  };

  return (
    <>
      {contextHolder}
      <Button onClick={openNotification} size="small" className="commonBtn text-white leading-none hidden md:block">
        Pay
      </Button>
    </>
  );
};

export default NotificationConfirm;
