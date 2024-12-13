import PrivateRoute from "@/components/PrivateRoute";
import DashBoardContents from "@/components/ui/DashBoardContents";
import Sidebar from "@/components/ui/Sidebar";
import { Layout } from "antd";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout hasSider className="custom-scrollbar ">
      <PrivateRoute>
        <Sidebar />
        <DashBoardContents>{children}</DashBoardContents>
      </PrivateRoute>
    </Layout>
  );
};

export default DashboardLayout;
