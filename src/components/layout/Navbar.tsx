"use client";

import { useEffect, useState } from "react";
import { Layout, Menu, Space, Dropdown } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import logoImage from "@/assets/logo.png";

const { Header } = Layout;

const Navbar: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const router = "/home";

  useEffect(() => {
    setSelectedKeys(["home"]);
    setSelectedKeys([router.replace(/^.*[/]/, "")]);
  }, [router]);

  const items = [
    { label: <Link href="/">Home</Link>, name: "Home", key: "0", path: `/` },
    { label: <Link href="/all-items">All-Items</Link>, name: "All-Items", key: "5", path: `/all-items` },
    { label: <Link href="/reagents">Reagents</Link>, name: "Reagents", key: "1", path: `/reagents` },
    {
      label: <Link href="/surgical-items">Surgical-Items</Link>,
      name: "Surgical-Items",
      key: "4",
      path: `/surgical-items`,
    },
    { label: <Link href="/others">Others</Link>, name: "Others", key: "5", path: `/others` },
    { label: <Link href="/login">Login</Link>, name: "Login", key: "2", path: `/login` },
    { label: <Link href="/signup">Signup</Link>, name: "Signup", key: "3", path: `/signup` },
  ];

  //   console.log(selectedKeys);
  return (
    <div>
      <Header className="flex items-center justify-between bg-[#FFFFFF] uppercase border-b border-b-slate-300/70 top-0 sticky z-40">
        <div className="flex items-center justify-between lg:mr-2">
          <div>
            <Link className="flex" href={"/"}>
              <Image src={logoImage} width={32} height={32} alt="logo" />
            </Link>
          </div>
          <div>
            <h2 className="text-3xl   ml-2">
              <Link href={"/"} className="text-primary">
                Next Medical Supplies
              </Link>
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-start">
          <div className="hidden lg:block">
            <Menu
              style={{ whiteSpace: "nowrap", minWidth: "650px" }}
              className="text-primary font-mono border-0"
              theme="light"
              mode="horizontal"
              selectedKeys={selectedKeys}
              items={items.map((m) => {
                const key = m.path.replace(/^.*[/]/, "");

                return {
                  key,
                  label: (
                    <Link className={`${selectedKeys[0] === m.path} && text-slate-900`} href={m.path}>
                      {m.name}
                    </Link>
                  ),
                };
              })}
            />
          </div>

          <div className="block lg:hidden">
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <MenuFoldOutlined className="text-primary text-2xl" />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default Navbar;
