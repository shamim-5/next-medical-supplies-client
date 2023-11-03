"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "./hook";
import { userLoggedIn, userLoggedOut } from "../features/auth/authSlice";
import useUserInfo from "@/hooks/useUserInfo";

export default function useAuthCheck() {
  const dispatch = useAppDispatch();
  const { accessToken } = useUserInfo();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");
    const firebaseAccessToken = accessToken && accessToken;
    
    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.user) {
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
            user: auth.user,
          })
        );
      }
      if (firebaseAccessToken) {
        if (auth?.accessToken !== firebaseAccessToken) {
          dispatch(userLoggedOut());
          localStorage.clear();
        }
      }
    }

    setAuthChecked(true);
  }, [dispatch, accessToken, setAuthChecked]);

  return authChecked;
}
