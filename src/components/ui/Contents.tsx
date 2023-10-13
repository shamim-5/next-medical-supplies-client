"use client";
import { Layout } from "antd";
import BreadCrumbAntd from "./BreadCrumbAntd";

const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  const base = "admin";
  return (
    <Content
      style={{
        minHeight: "100vh",
        color: "black",
      }}
    >
      <BreadCrumbAntd
        items={[
          {
            label: `${base}`,
            link: `/${base}`,
          },
          {
            label: "diagnostics",
            link: `/${base}/diagnostics`,
          },
        ]}
      />
      {children}
    </Content>
  );
};

export default Contents;
