import PrivateRoute from "@/components/PrivateRoute";
import Contents from "@/components/ui/Contents";
import SideBar from "@/components/ui/Sidebar";
import { Layout } from "antd";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout hasSider>
      <PrivateRoute>
        <SideBar />
        <Contents>{children}</Contents>
      </PrivateRoute>
    </Layout>
  );
};

export default DashboardLayout;
