import PrivateRoute from "@/components/PrivateRoute";
import Contents from "@/components/ui/DashBoardContents";
import SideBar from "@/components/ui/SideBar";
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
