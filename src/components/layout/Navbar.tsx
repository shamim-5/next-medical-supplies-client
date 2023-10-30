"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Layout, Menu, Space, Dropdown, Button } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import logoImage from "@/assets/logo-navbar.svg";
import { auth } from "@/lib/firebase";
import useAuth from "@/redux/hooks/useAuth";
import SearchAntd from "./SearchAntd";
import { useAppDispatch } from "@/redux/hooks/hook";
import { signOut } from "firebase/auth";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { cleanPath } from "@/redux/features/path/pathSlice";

const { Header } = Layout;

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isLoggedIn = useAuth();

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
    {
      label: <Link href="/products">Products</Link>,
      name: "Products",
      key: "5",
      path: `/products`,
    },
    { label: <Link href="/reagents">Reagents</Link>, name: "Reagents", key: "1", path: `/reagents` },

    { label: <Link href="/others">Others</Link>, name: "Others", key: "6", path: `/others` },
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
      path: `/logout`,
    },
    {
      label: !isLoggedIn && <Link href="/signup">Signup</Link>,
      name: !isLoggedIn && "Signup",
      key: "3",
      path: !isLoggedIn && `/signup`,
    },
  ];

  return (
    <>
      <Header className="flex items-center justify-between bg-[#FFFFFF] border-b border-b-slate-300/70 sticky top-0  z-40">
        <div className="flex items-center justify-between lg:mr-2">
          <div>
            <Link href={"/"}>
              <Image className="w-4 md:w-6" src={logoImage} width={32} height={32} alt="logo" />
            </Link>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-semibold  hidden md:block  ml-2">
              <Link href={"/"} className="text-primary">
                NB <span className="text-cyan">Surgical</span>
              </Link>
            </h2>
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-semibold block md:hidden ml-2">
              <Link href={"/"} className="text-primary">
                NB<span className="text-cyan">S</span>
              </Link>
            </h2>
          </div>
        </div>

        <SearchAntd />

        <div className="flex items-center justify-start">
          <div className="hidden lg:block">
            <Menu
              style={{ whiteSpace: "nowrap", minWidth: "650px" }}
              className="text-primary font-mono border-0"
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
                        className={`${selectedKeys[0] === m.path} && text-[#253858] border-0 mx-0 px-0 uppercase`}
                      >
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
    </>
  );
};

export default Navbar;
