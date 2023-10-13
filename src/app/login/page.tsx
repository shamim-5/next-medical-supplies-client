"use client";
import { Button, Col, Input, Row } from "antd";
import loginImage from "../../assets/login.png";
import Image from "next/image";
import { SubmitHandler } from "react-hook-form";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import Link from "next/link";

type FormValues = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    try {
      console.log(data);
    } catch (err) {}
  };
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image src={loginImage} width={500} alt="login image" priority />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h1 className="text-primary text-3xl py-2">Please login your account</h1>
        <div>
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput name="email" type="email" size="large" label="User Email" />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput name="password" type="password" size="large" label="User Password" />
            </div>
            <div className="flex flex-row mt-0 mb-2">
              <p className="text-slate-500">Create a new account?</p>{" "}
              <Link href={`/signup`} className="ml-2">
                Please signup...
              </Link>
            </div>
            <Button
              className="bg-gradient-to-l hover:bg-gradient-to-b from-primary/90 to-primary/70 hover:text-slate-900"
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;