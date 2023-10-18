"use client";

import { Divider, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface ProfileProps {
  title: string;
}

const Profile: React.FC<ProfileProps> = ({ title }) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const { displayName, email } = userInfo || {};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // 'user' will be null if the user is not authenticated
      setUserInfo(user);
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  //   console.log(uid, displayName, email);
  return (
    <div>
      <Divider className="text-3xl lg:text-4xl">{title}</Divider>
      <div className="flex justify-center uppercase">
        <div>
          <div className="text-center">
            <Avatar size={64} icon={<UserOutlined />} />
          </div>
          <Switch checkedChildren="Update Profile" unCheckedChildren="Update Profile" />
          <Divider className="mt-2" />
          <div className="text-lg text-slate-900 flex">
            Name : <p className="ml-4  text-slate-900/75">{displayName || "Name not found"}</p>
          </div>
          <div className="text-lg text-slate-900 flex">
            Email : <p className="ml-4 text-slate-900/75 lowercase">{email}</p>
          </div>
          <Divider />
          <div className="text-lg text-slate-900 flex">
            Address :
            <div>
              <p className="ml-4 text-sm text-slate-900/75">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <p className="ml-4 text-sm text-slate-900/75">Lorem, ipsum dolor sit amet consectetur.</p>
              <p className="ml-4 text-sm text-slate-900/75">Lorem, ipsum-1000</p>
            </div>
          </div>
          <div className="text-lg text-slate-900 flex mt-2">
            Contact : <p className="ml-4 text-slate-900/75 lowercase">+88-01111111111</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
