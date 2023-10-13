"use client";
import { Layout as AntdLayout } from "antd";
import Navbar from "@/components/layout/Navbar";


export default function Layout({ children }: { children: React.ReactNode }) {
   
  return (
    <div>
      <AntdLayout>
        <Navbar />
        {children}
      </AntdLayout>
    </div>
  );
}
