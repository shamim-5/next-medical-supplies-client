"use client";

import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { RiFacebookBoxFill, RiGoogleFill } from "react-icons/ri";
import { useInsertSubscriptionsIntoDBMutation } from "@/redux/features/subscriptions/subscriptionsApi";

interface IEmailData {
  email: string;
}

const Subscribe: React.FC = () => {
  const [insertSubscriptionsIntoDB] = useInsertSubscriptionsIntoDBMutation();

  const handleSubmit = (values: any) => {
    const emailData: IEmailData = {
      email: values.email,
    };
    insertSubscriptionsIntoDB(emailData);
    console.log(emailData);
  };

  return (
    <div className="pt-12 text-primary-light">
      <div className="bg-cyan w-full h-auto lg:h-[250px] grid grid-cols-1 lg:grid-cols-3 px-4  ">
        <div className="mx-auto my-auto">
          <h3 className="uppercase text-2xl md:text-3xl lg:text-4xl my-4">Join our mailing list</h3>
          <p>10% off your next order when you sign up + be the first to know about new products and special offers.</p>
        </div>
        <div className="my-auto mx-auto">
          <Form onFinish={handleSubmit}>
            <Space.Compact style={{ width: "100%" }} className="">
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email address!",
                  },
                  {
                    required: true,
                    message: "Please enter your email address!",
                  },
                ]}
              >
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  prefix={<UserOutlined />}
                  size="large"
                  className="bg-primary-light border-1 border-r-0 border-cyan-light"
                />
              </Form.Item>
              <Button
                type="primary"
                ghost
                size="large"
                className="bg-primary-light text-primary-dark uppercase font-semibold border-0"
                htmlType="submit"
              >
                Submit
              </Button>
            </Space.Compact>
          </Form>
        </div>
        <div className="mx-auto my-auto flex pb-2">
          <RiFacebookBoxFill className="h-9 w-9 lg:h-12 lg:w-12 rounded-full border-4 border-cyan-light mr-2" />
          <RiGoogleFill className="h-9 w-9 lg:h-12 lg:w-12 rounded-full border-4 border-cyan-light " />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
