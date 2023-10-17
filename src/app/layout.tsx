import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/lib/Providers";
import AppFooter from "@/components/layout/AppFooter";
import Navbar from "@/components/layout/Navbar";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "NB_Surgical - Home page",
  description: "Surgical equipments shop app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>
            <Navbar />
            <Content className="site-layout px-6 md:px-9 lg:px-12">
              <div style={{ minHeight: "100vh" }} className="">
                {/* <AuthCheck>{children}</AuthCheck> */}
                {children}
              </div>
            </Content>
            <AppFooter />
            <ToastContainer position="top-center" />
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
