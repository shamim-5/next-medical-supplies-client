"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Layout, Menu, Space, Dropdown, Button } from "antd";
import { LogoutOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import logoImage from "@/assets/logo-navbar.svg";
import { auth } from "@/lib/firebase";
import useAuth from "@/redux/hooks/useAuth";
import SearchAntd from "./SearchAntd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hook";
import { signOut } from "firebase/auth";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { cleanPath } from "@/redux/features/path/pathSlice";
import { USER_ROLE } from "@/constants/role";
import ExtraNavbar from "./ExtraNavbar";
import { useGetShopDetailsQuery } from "@/redux/features/surgicalShop/surgicalShopApi";
import useUserInfo from "@/hooks/useUserInfo";

const { Header } = Layout;

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isLoggedIn = useAuth();
  const { accessToken: firebaseAccessToken } = useUserInfo();
  const { user, accessToken } = useAppSelector((state) => state?.auth);

  const admin = accessToken === firebaseAccessToken && user === process.env.NEXT_PUBLIC_ADMIN ? true : false;

  const { data: { data: shopDetails } = [], isLoading } = useGetShopDetailsQuery(undefined) || {};
  const { shopName } = (!isLoading && shopDetails && shopDetails[0]) || {};

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    setSelectedKeys([pathname.replace(/^.*[/]/, "")]);
  }, [pathname]);

  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    try {
      signOut(auth);
      router.push("/login");

      localStorage.clear();
      dispatch(userLoggedOut());
      dispatch(cleanPath());
    } catch (err) {
      // do nothing
    }
  };

  const items = [
    { label: <Link href="/">Home</Link>, name: "Home", key: "0", path: `/` },
    { label: <Link href="/all-items">All-Items</Link>, name: "All-Items", key: "4", path: `/all-items` },

    { label: <Link href="/reagents">Reagents</Link>, name: "Reagents", key: "1", path: `/reagents` },
    {
      label: <Link href="/devices">Devices</Link>,
      name: "Devices",
      key: "5",
      path: `/devices`,
    },
    { label: <Link href="/others">Others</Link>, name: "Others", key: "6", path: `/others` },
    {
      label: isLoggedIn && admin && <Link href="/admin/pending-orders">Dashboard</Link>,
      name: isLoggedIn && admin && "Dashboard",
      key: "999",
      path: isLoggedIn && admin && `/admin/pending-orders`,
    },
    {
      label: isLoggedIn && !admin && <Link href="/user/cart-items">Cart-Items</Link>,
      name: isLoggedIn && !admin && "Cart-Items",
      key: "123",
      path: isLoggedIn && !admin && `/user/cart-items`,
    },
    {
      label: isLoggedIn ? (
        <Button onClick={() => handleSignOut()} className="border-0 mx-0 px-0">
          Logout
        </Button>
      ) : (
        <Link href="/login">Login</Link>
      ),
      name: isLoggedIn ? "Logout" : "Login",
      key: "2",
      path: isLoggedIn ? `/logout` : `login`,
    },

    {
      label: !isLoggedIn && <Link href="/signup">Signup</Link>,
      name: !isLoggedIn && "Signup",
      key: "3",
      path: !isLoggedIn && `/signup`,
    },
  ];

  const role = USER_ROLE.USER === pathname.split("/")[1] || USER_ROLE.ADMIN === pathname.split("/")[1];

  return (
    <>
      <Header
        className={`flex items-center justify-between bg-[#FFFFFF] border-b border-b-slate-300/70 px-9 md:px-12 lg:px-16 2xl:px-20 sticky top-0  z-40 ${
          role && "hidden"
        }`}
      >
        <div className=" flex items-center justify-between lg:mr-2 mb-2 uppercase">
          <div>
            <Link href={"/"}>
              <Image className="w-7 lg:w-12" src={logoImage} width={48} height={48} alt="logo" />
            </Link>
          </div>
          <div>
            <div className="flex-col text-4xl leading-none hidden md:block  ml-2">
              <div>
                <Link href={"/"} className="text-primary">
                  {shopName?.firstName}
                </Link>
              </div>
              <div className="text-cyan text-lg leading-none">
                <Link href={"/"} className="text-cyan">
                  {shopName?.middleName} {shopName?.lastName}
                </Link>
              </div>
            </div>
            <h2 className="text-4xl block md:hidden ml-2">
              <Link href={"/"} className="text-primary">
                {shopName?.shortName.slice(0, 1)}
                <span className="text-cyan">{shopName?.shortName.slice(1)}</span>
              </Link>
            </h2>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <SearchAntd />
        </div>

        <div className="shrink flex items-center justify-start w-auto">
          <div className="hidden lg:block">
            <Menu
              style={{ whiteSpace: "nowrap", minWidth: "600px" }}
              className="text-primary border-0"
              theme="light"
              mode="horizontal"
              selectedKeys={selectedKeys}
              items={items.map((m) => {
                if (typeof m.path !== "string") {
                  return null;
                }
                const key = m.path.replace(/^.*[/]/, "");

                // large screen onClick handle
                return {
                  key,
                  label:
                    m.path === "/logout" ? (
                      <Button
                        onClick={() => handleSignOut()}
                        className={`${selectedKeys[0] === m.path} && text-[#253858] border-0 mx-0 px-0 uppercase w-32`}
                      >
                        <LogoutOutlined className="text-cyan font-semibold  text-3xl" />
                        {m.name}
                      </Button>
                    ) : (
                      <Link className={`${selectedKeys[0] === m.path} && text-[#253858] uppercase`} href={m.path}>
                        {m.name}
                      </Link>
                    ),
                };
              })}
            />
          </div>

          <div className="block lg:hidden mt-1">
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <MenuFoldOutlined className="text-primary text-3xl" />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </Header>
      <ExtraNavbar role={role} />
    </>
  );
};

export default Navbar;
