import useAuth from "@/redux/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function PublicRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isLoggedIn = useAuth();

  return !isLoggedIn ? children : router.push("/");
}
