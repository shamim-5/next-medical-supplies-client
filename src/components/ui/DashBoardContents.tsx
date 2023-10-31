"use client";
import { Layout } from "antd";
import BreadCrumbAntd from "./BreadCrumbAntd";
import { usePathname } from "next/navigation";

const { Content } = Layout;

const DashBoardContents = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const base = pathname.replace(/^.*[/]/, "");

  return (
    <Content className="min-h-screen mt-4 mx-6">
      <BreadCrumbAntd
        items={[
          {
            label: `${base}`,
            link: `${base}`,
          },
        ]}
      />
      {children}
    </Content>
  );
};

export default DashBoardContents;
