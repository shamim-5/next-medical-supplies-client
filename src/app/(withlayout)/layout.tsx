import PrivateRoute from "@/components/PrivateRoute";
import Contents from "@/components/ui/DashBoardContents";
import Sidebar from "@/components/ui/Sidebar";
import { Layout } from "antd";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout hasSider>
      <PrivateRoute>
        <Sidebar />
        <Contents>{children}</Contents>
      </PrivateRoute>
    </Layout>
  );
};

export default DashboardLayout;
