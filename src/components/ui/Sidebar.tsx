"use client";

import { Layout, Menu } from "antd";
import logoImage from "@/assets/logo-navbar.svg";
import { sidebarItems } from "@/constants/sidebarItems";
import { USER_ROLE } from "@/constants/role";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks/hook";
import useUserInfo from "@/hooks/useUserInfo";
import { useGetShopDetailsQuery } from "@/redux/features/surgicalShop/surgicalShopApi";
import useCollapsed from "@/hooks/useCollapsed";

const { Sider } = Layout;

const Sidebar = () => {
  const { collapsed, setCollapsed } = useCollapsed();
  const { accessToken: firebaseAccessToken } = useUserInfo();
  const { user, accessToken } = useAppSelector((state) => state?.auth);

  const { data: { data: shopDetails } = [], isLoading } = useGetShopDetailsQuery(undefined) || {};
  const { shopName } = (!isLoading && shopDetails && shopDetails[0]) || {};

  const admin = accessToken === firebaseAccessToken && user === process.env.NEXT_PUBLIC_ADMIN ? true : false;

  const role = (admin && USER_ROLE.ADMIN) || USER_ROLE.USER;

  return (
    <div>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={280}
        breakpoint="md"
        // collapsedWidth={0}
        className="bg-secondary overflow-auto h-screen sticky left-0 top-0 z-50"
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
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-semibold my-3">
              <Link href={"/"} className="text-primary-light">
                {shopName?.shortName.slice(0, 2)}
                <span className="text-cyan">{shopName?.shortName.slice(2)}</span>
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
    </div>
  );
};

export default Sidebar;
