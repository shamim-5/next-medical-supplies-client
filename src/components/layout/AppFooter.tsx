"use client";
import { Footer } from "antd/es/layout/layout";
import Image from "next/image";
import logoImage from "@/assets/logo-footer.svg";
import { RiFacebookBoxLine, RiInstagramLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { USER_ROLE } from "@/constants/role";
import Link from "next/link";
import { useGetShopDetailsQuery } from "@/redux/features/surgicalShop/surgicalShopApi";

const AppFooter = () => {
  const pathname = usePathname();
  const date = new Date();
  const year = date.getFullYear();

    const { data: { data: shopDetails } = [], isLoading } = useGetShopDetailsQuery(undefined) || {};
    const { name } = (!isLoading && shopDetails && shopDetails[0]) || {};

  const role = USER_ROLE.USER === pathname.split("/")[1] || USER_ROLE.ADMIN === pathname.split("/")[1];

  return (
    <>
      {!role ? (
        <Footer style={{ textAlign: "center" }} className="px-6 md:px-11 lg:px-16 2xl:px-20 py-0">
          <div>
            <div className=" bg-[#e2eaec85] text-secondary px-2 lg:px-12 py-3 lg:py-4">
              <div className="flex justify-between items-center w-full">
                <div>
                  <Image src={logoImage} alt="FooterLogo" width={96} />
                </div>
                <div className="flex gap-20">
                  <ul className="space-y-2">
                    <li>Upcoming</li>
                    <li>Shipping</li>
                    <li>How it works</li>
                  </ul>
                  <ul className="space-y-2">
                    <li>Support</li>
                    <li>Careers</li>
                    <p>Privacy Policy</p>
                    <div className="flex lg:hidden gap-2 text-2xl">
                      <RiFacebookBoxLine />
                      <RiInstagramLine />
                    </div>
                  </ul>
                  <ul className="space-y-2">
                    <li>List your gear</li>
                    <li>Contact team</li>
                    <p>Terms & Condition</p>
                  </ul>
                </div>
                <div className="hidden lg:flex gap-2 text-2xl">
                  <RiFacebookBoxLine />
                  <RiInstagramLine />
                </div>
              </div>
              <div className="flex w-full mt-20 gap-5">
                <p>Created by: Md. Shamim</p>
                <p>
                  Portfolio: <Link href="https://shamim-5.web.app">https://shamim-5.web.app</Link>
                </p>
                <p className="ml-auto"> &#169; {name} {year}</p>
              </div>
            </div>
          </div>
        </Footer>
      ) : (
        <></>
      )}
    </>
  );
};

export default AppFooter;
