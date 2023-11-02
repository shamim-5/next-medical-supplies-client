"use client";

import { auth } from "@/lib/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function useUserInfo() {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { uid, displayName, email } = userInfo || {};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // 'user' will be null if the user is not authenticated
      setUserInfo(user);

      if (user) {
        const userTokenResult = await user.getIdTokenResult();
        const userAccessToken = userTokenResult.token;
        setAccessToken(userAccessToken);
      } else {
        setAccessToken(null);
      }
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  return { uid, displayName, email, accessToken };
}
