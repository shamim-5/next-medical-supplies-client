"use client";

import { setPath } from "@/redux/features/path/pathSlice";
import { useAppDispatch } from "@/redux/hooks/hook";
import useAuth from "@/redux/hooks/useAuth";
import { redirect, usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isLoggedIn = useAuth();

  const dispatch = useAppDispatch();
  dispatch(setPath({ path: pathname }));

  return isLoggedIn ? <>{children}</> : redirect("/login");
}
