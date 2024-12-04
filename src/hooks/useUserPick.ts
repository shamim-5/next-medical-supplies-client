import { useState } from "react";

interface UniqueEntry {
  userName: string;
  email: string;
  userId: string;
}

const useUserPick = () => {
  const [userPick, setUserPick] = useState<UniqueEntry | null>(null);

  const pickUser = (user: UniqueEntry) => {
    setUserPick(user);
  };

  return { userPick, pickUser };
};

export default useUserPick;
