"use client";

import { Divider, Image } from "antd";
import { Avatar } from "antd";
import useUserInfo from "@/hooks/useUserInfo";
import ModalUpdateProfile from "../shared/ModalUpdateProfile";
import { UserOutlined } from "@ant-design/icons";
import { useGetUserDetailsByEmailQuery } from "@/redux/features/user-details/userDetailsApi";

interface ProfileProps {
  title: string;
}

const Profile: React.FC<ProfileProps> = ({ title }) => {
  const { displayName, email, photoURL } = useUserInfo();

  const {
    data: { data: [userData] } = { data: [] },
    isError,
    isLoading,
  } = useGetUserDetailsByEmailQuery(email as string) || [];

  const { name, phoneNumber, address, fileUploads } = userData || {};

  const [{ photoURL: dbPhotoURL }] = (fileUploads && fileUploads.slice(-1)) || [{}];
  // console.log("🚀 ~ fileUploads :", dbPhotoURL);

  return (
    <div>
      <Divider className="text-3xl lg:text-4xl">{title}</Divider>
      <div className="flex justify-center uppercase">
        <div>
          <div className="text-center">
            {photoURL ? (
              <Avatar size={64} icon={<Image src={`${dbPhotoURL || photoURL}`} alt="Profile picture" />} />
            ) : (
              <Avatar size={64} icon={<UserOutlined />} />
            )}
          </div>
          <ModalUpdateProfile />
          <Divider className="mt-2" />
          <div className="text-lg text-slate-900 flex">
            Name : <p className="ml-4  text-slate-900/75">{name || displayName || "Name not found"}</p>
          </div>
          <div className="text-lg text-slate-900 flex">
            Email : <p className="ml-4 text-slate-900/75 lowercase">{email}</p>
          </div>
          <Divider />
          <div className="text-lg text-slate-900 flex mt-2">
            <span className="w-28">Phone :</span>
            <p className="ml-4 text-slate-900/75">{phoneNumber || "Phone number not found"}</p>
          </div>
          <div className="text-lg text-slate-900 flex mt-2">
            <span className="w-28">Address :</span>
            <div>
              <p className="ml-4 text-slate-900/75 ">{address?.addressLineOne || "Address not found"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
