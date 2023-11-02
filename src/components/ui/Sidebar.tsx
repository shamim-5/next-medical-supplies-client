"use client";

import { useState } from "react";
import { Layout, Menu } from "antd";
import logoImage from "@/assets/logo-navbar.svg";
import { sidebarItems } from "@/constants/sidebarItems";
import { USER_ROLE } from "@/constants/role";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks/hook";
import useUserInfo from "@/hooks/useUserInfo";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { accessToken: firebaseAccessToken } = useUserInfo();
  const { user, accessToken } = useAppSelector((state) => state?.auth);

  const admin = accessToken === firebaseAccessToken && user === process.env.NEXT_PUBLIC_ADMIN ? true : false;

  const role = (admin && USER_ROLE.ADMIN) || USER_ROLE.USER;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      className="bg-secondary overflow-auto h-screen sticky left-0 top-0 bottom-0"
    >
      <div className="flex items-center justify-center space-x-2 cursor-pointer">
        <div>
          <Link href={"/"}>
            <Image
              className={`w-4 md:w-6  ${collapsed && "hidden"}`}
              src={logoImage}
              width={32}
              height={32}
              alt="logo"
            />
          </Link>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-semibold my-4">
            <Link href={"/"} className="text-primary-light">
              NB<span className="text-cyan">S</span>
            </Link>
          </h2>
        </div>
      </div>
      <Menu
        className="bg-secondary text-primary-light"
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems(role)}
      />
    </Sider>
  );
};

export default SideBar;
