import type { Metadata } from "next";

import Profile from "@/components/user/Profile";

export const metadata: Metadata = {
  title: "Profile page",
  description: "Surgical equipments shop app",
};

const UserProfilePage = () => {
  return (
    <div>
      <div></div>
      <div>
        <Profile title="Profile" />
      </div>
    </div>
  );
};

export default UserProfilePage;
