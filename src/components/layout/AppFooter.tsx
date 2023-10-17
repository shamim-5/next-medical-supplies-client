"use client";
import { Footer } from "antd/es/layout/layout";
import Image from "next/image";
import logoImage from "@/assets/logo.png";
import { RiFacebookBoxLine, RiInstagramLine } from "react-icons/ri";

const AppFooter = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <Footer style={{ textAlign: "center" }} className="px-6 md:px-9 lg:px-12 py-0">
        <div className="">
          <div className=" bg-[#e2eaec85] text-secondary px-2 lg:px-12 py-3 lg:py-9">
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
                  <div className="flex lg:hidden gap-2 text-2xl">
                    <RiFacebookBoxLine />
                    <RiInstagramLine />
                  </div>
                </ul>
                <ul className="space-y-2">
                  <li>List your gear</li>
                  <li>Contact team</li>
                </ul>
              </div>
              <div className="hidden lg:flex gap-2 text-2xl">
                <RiFacebookBoxLine />
                <RiInstagramLine />
              </div>
            </div>
            <div className="flex w-full mt-20 gap-5">
              <p>Privacy Policy</p>
              <p>Terms & Condition</p>
              <p className="ml-auto"> &#169; NB Surgical {year}</p>
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default AppFooter;
