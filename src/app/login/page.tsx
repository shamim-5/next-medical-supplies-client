"use client";
import { useRouter } from "next/navigation";
import { Button, Col, Row } from "antd";
import loginImage from "../../assets/login.png";
import Image from "next/image";
import { SubmitHandler } from "react-hook-form";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hook";
import useAuth from "@/redux/hooks/useAuth";
import { cleanPath } from "@/redux/features/path/pathSlice";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const isLoggedin = useAuth();
  const path = useAppSelector((state) => state.path.path);
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { email, password } = data;

      await login({ email, password });
    } catch (err) {
      // do nothing
    }
  };

  if (isLoggedin) {
    router.push(path);
  }
  return (
    <div className="mb-9 lg:mb-0">
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
          <h1 className="text-primary text-2xl lg:text-3xl uppercase py-2">Please login your account</h1>
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
                disabled={isLoading}
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
    </div>
  );
};

export default LoginPage;
