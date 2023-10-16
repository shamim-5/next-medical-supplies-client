"use client";
import { Layout } from "antd";
import BreadCrumbAntd from "./BreadCrumbAntd";
import { usePathname } from "next/navigation";

const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const base = pathname.replace(/^.*[/]/, "");

  return (
    <Content
      style={{
        minHeight: "100vh",
        color: "black",
        marginTop: "10px",
        marginLeft: "10px",
      }}
    >
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

export default Contents;
