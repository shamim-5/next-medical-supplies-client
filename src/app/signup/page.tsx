"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Col, Row } from "antd";
import loginImage from "../../assets/login.png";
import Image from "next/image";
import { SubmitHandler } from "react-hook-form";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRegisterMutation } from "@/redux/features/auth/authApi";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [passwordLength, setPasswordLength] = useState<string | undefined>(undefined);

  const [register, { isLoading }] = useRegisterMutation();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    try {
      if (data?.password !== data?.confirmPassword) {
        setPasswordsMatch(false);
        setPasswordLength(undefined);
        return;
      } else if (data?.password.length < 6) {
        setPasswordsMatch(true);
        setPasswordLength("Password too short! minimum length six");
        return;
      } else {
        setPasswordsMatch(true);

        const { email, password } = data;
        register({ email, password });

        toast.success("Signup success");
        router.push("/");
      }
    } catch (err) {}
  };

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
          <h1 className="text-primary text-2xl lg:text-3xl uppercase py-2">Please create a new account</h1>
          <div>
            <Form submitHandler={onSubmit}>
              <div>
                <FormInput name="name" type="text" size="large" label="User Name" />
              </div>
              <div
                style={{
                  margin: "15px 0px",
                }}
              >
                <FormInput name="email" type="email" size="large" label="User Email" />
              </div>
              <div
                style={{
                  margin: "15px 0px",
                }}
              >
                <FormInput name="password" type="password" size="large" label="User Password" />
              </div>
              <div
                style={{
                  margin: "15px 0px",
                }}
              >
                <FormInput name="confirmPassword" type="password" size="large" label="Confirm Password" />
              </div>
              {!passwordsMatch && (
                <div>
                  <span className="text-warning font-thin">Password must match!</span>
                </div>
              )}
              {passwordLength && (
                <div>
                  <span className="text-warning font-thin">{passwordLength}</span>
                </div>
              )}
              <div className="flex flex-row mt-0 mb-2">
                <p className="text-slate-500">Already have an account?</p>{" "}
                <Link href={`/login`} className="ml-2">
                  Please login...
                </Link>
              </div>
              <Button
                disabled={isLoading}
                className="bg-gradient-to-l hover:bg-gradient-to-b from-primary/90 to-primary/70 hover:text-slate-900"
                type="primary"
                htmlType="submit"
              >
                Signup
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
