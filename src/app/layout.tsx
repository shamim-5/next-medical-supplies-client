import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/lib/Providers";
import AppFooter from "@/components/layout/AppFooter";
import Navbar from "@/components/layout/Navbar";
import { Layout } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import AuthCheck from "@/components/AuthCheck";
import Contents from "@/components/layout/Contents";

export const metadata: Metadata = {
  title: {
    default: "NB_Surgical",
    template: `${process.env.NEXT_PUBLIC_TITLE}_%s`,
  },
  description: "Surgical equipments shop app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>
            <Navbar />
            <Contents>
              <AuthCheck>{children}</AuthCheck>
            </Contents>
            <AppFooter />

            <ScrollToTopButton />
            <ToastContainer position="top-left" />
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
