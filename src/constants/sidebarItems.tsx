import type { MenuProps } from "antd";
import { ProfileOutlined, TableOutlined, ScheduleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";

export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}/profile`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/${role}/due-list`}>Due List</Link>,
          key: `/${role}/due-list`,
        },
      ],
    },
  ];

  const commonSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/manage-orders`}>Manage Orders</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-orders`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    {
      label: "Customers",
      key: "customers",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}/customer-list`}>Customers List</Link>,
          key: `/${role}/customer-list`,
        },
        {
          label: <Link href={`/${role}/due-list`}>Due List</Link>,
          key: `/${role}/due-list`,
        },
      ],
    },
    ...commonSidebarItems,

    {
      label: <Link href={`/${role}/pending-orders`}>Pending Orders</Link>,
      icon: <ScheduleOutlined />,
      key: `/${role}/pending-orders`,
    },
    {
      label: <Link href={`/${role}/completed-orders`}>Completed Orders</Link>,
      icon: <ScheduleOutlined />,
      key: `/${role}/completed-orders`,
    },
  ];

  const userSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonSidebarItems,
    {
      label: <Link href={`/${role}/orders`}>Orders</Link>,
      icon: <ScheduleOutlined />,
      key: `/${role}/orders`,
    },
  ];

  if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
