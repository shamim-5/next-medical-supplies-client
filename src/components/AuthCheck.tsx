"use client";

import useAuthCheck from "@/redux/hooks/useAuthCheck";
import { Alert, Spin } from "antd";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const authCheck = useAuthCheck();

  return !authCheck ? (
    <div className="flex flex-col items-center justify-center my-12">
      <Spin tip="Loading..." size="large">
        <Alert className="h-32 mb-0 pb-0"
          message="Checking Authentication..."
          description="Please wait...checking authentication is in progress!"
          type="info"
        />
      </Spin>
    </div>
  ) : (
    <>{children}</>
  );
}
