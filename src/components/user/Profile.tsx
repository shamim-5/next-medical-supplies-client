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

  const [{ photoURL: dbPhotoURL }] = (fileUploads && fileUploads.length && fileUploads.slice(-1)) || [{}];

  return (
    <div>
      <Divider className="text-3xl lg:text-4xl">{title}</Divider>
      <div className="flex justify-center items-center capitalize">
        <div>
          <div className="text-center">
            {photoURL || dbPhotoURL ? (
              <Avatar size={64} icon={<Image src={`${dbPhotoURL || photoURL}`} alt="Profile picture" />} />
            ) : (
              <Avatar size={64} icon={<UserOutlined />} />
            )}
          </div>
          <div className="pl-4 lg:pl-0">
            <ModalUpdateProfile />
          </div>
          <Divider className="mt-2" />
          <div className="text-sm lg:text-lg text-slate-900 flex pl-4 lg:pl-0">
            <div className="w-16 lg:w-24  flex-shrink-0">Name</div>
            <div>: </div>
            <div className="ml-1 lg:ml-2 text-left  text-slate-900/75 line-clamp-2">
              {name || displayName || "Name not found"}
            </div>
          </div>

          <div className="text-sm lg:text-lg text-slate-900 flex pl-4 lg:pl-0">
            <div className="w-16 lg:w-24  flex-shrink-0">Email</div>
            <div>: </div>
            <div className="ml-1 lg:ml-2 text-left text-slate-900/75 lowercase line-clamp-1">{email}</div>
          </div>

          <div className="text-sm lg:text-lg text-slate-900 flex pl-4 lg:pl-0">
            <div className="w-16 lg:w-24  flex-shrink-0">Phone</div>
            <div>: </div>
            <div className="ml-1 lg:ml-2 text-left text-slate-900/75 line-clamp-1">
              {phoneNumber ? "0" + phoneNumber : "Phone number not found"}
            </div>
          </div>

          <Divider className="m-2" />

          <div className="text-sm lg:text-lg text-slate-900 flex pl-4 lg:pl-0">
            <div className="w-16 lg:w-24  flex-shrink-0">Address</div>
            <div>: </div>
            <div className="ml-1 lg:ml-2 text-left text-slate-900/75 line-clamp-3">
              {address?.addressLineOne || "Address not found"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
