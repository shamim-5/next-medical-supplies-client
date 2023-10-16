import useAuth from "@/redux/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const isLoggedIn = useAuth();
  const router = useRouter();

  return isLoggedIn ? children : router.push("/login");
}
