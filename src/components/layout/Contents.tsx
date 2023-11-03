"use client";

import { USER_ROLE } from "@/constants/role";
import { Content } from "antd/es/layout/layout";
import { usePathname } from "next/navigation";

const Contents = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const role = USER_ROLE.USER === pathname.split("/")[1] || USER_ROLE.ADMIN === pathname.split("/")[1];

  return (
    <Content
      className={`${role ? "px-0 mx-0" : "site-layout px-6 md:px-9 lg:px-12 2xl:px-16 mx-0 md:mx-2 lg:mx-4 2xl:mx-6"}`}
    >
      <div style={{ minHeight: "100vh" }}>{children}</div>
    </Content>
  );
};

export default Contents;
