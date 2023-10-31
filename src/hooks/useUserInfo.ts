"use client";

import { auth } from "@/lib/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function useUserInfo() {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const { uid, displayName, email, phoneNumber, photoURL } = userInfo || {};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // 'user' will be null if the user is not authenticated
      setUserInfo(user);
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  return { uid, displayName, email };
}
