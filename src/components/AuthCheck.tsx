"use client";

import useAuthCheck from "@/redux/hooks/useAuthCheck";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const authCheck = useAuthCheck();

  return !authCheck ? <div>Checking Authentication.....</div> : <>{children}</>;
}
