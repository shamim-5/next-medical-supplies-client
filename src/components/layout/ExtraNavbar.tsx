"use client";

import { Avatar, Divider } from "antd";
import { ContactsOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { useGetShopDetailsQuery } from "@/redux/features/surgicalShop/surgicalShopApi";
import useUserInfo from "@/hooks/useUserInfo";

const ExtraNavbar = ({ role }: { role: boolean }) => {
  const { displayName } = useUserInfo() || {};
  const { data, isLoading } = useGetShopDetailsQuery(undefined) || {};

  const { location, contact } = (!isLoading && data[0]) || {};

  return (
    <div
      className={`lg:flex items-center justify-between space-x-2 bg-[#ffffff] text-secondary border-b border-b-slate-300/70 px-9 md:px-12 lg:px-16 2xl:px-20 h-12 py-2 hidden ${
        role && "hidden"
      }`}
    >
      <div>
        <h2 className="text-center text-sm text-primary font-mono">
          <Avatar className={`bg-cyan mr-1`} icon={<UserOutlined />} />
          Hello! {displayName && displayName.split(" ")[0]}
        </h2>
      </div>

      <div className="flex space-x-2">
        <h3 className="text-cyan text-sm">
          <PhoneOutlined className="text-cyan text-sm rotate-90" />
          <span className="text-secondary">Contact us:</span> {contact?.phone}
        </h3>
        <Divider type="vertical" />
        <h3 className="text-cyan text-sm">
          <MailOutlined className="text-cyan text-sm" /> <span className="text-secondary">Email: </span>
          {contact?.email}
        </h3>
      </div>

      <Divider type="vertical" />

      <div className="flex space-x-2">
        <h3 className="text-cyan text-sm">
          <ContactsOutlined className="text-cyan text-sm" />
          <span className="text-secondary">Address:</span> {location?.address}, {location?.city}-{location?.zipCode},
          {location?.country}
        </h3>
      </div>
    </div>
  );
};

export default ExtraNavbar;
