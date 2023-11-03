import type { MenuProps } from "antd";
import { ProfileOutlined, TableOutlined, ScheduleOutlined, UnorderedListOutlined } from "@ant-design/icons";
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
          label: (
            <Link className="text-primary-light" href={`/${role}/profile`}>
              Account Profile
            </Link>
          ),
          key: `/${role}/profile`,
        },
        {
          label: (
            <Link className="text-primary-light" href={`/${role}/due-list`}>
              Due List
            </Link>
          ),
          key: `/${role}/due-list`,
        },
      ],
    },
  ];

  const commonSidebarItems: MenuProps["items"] = [
    {
      label: (
        <Link className="text-primary-light" href={`/${role}/manage-orders`}>
          Manage Orders
        </Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/manage-orders`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonSidebarItems,

    {
      label: (
        <Link className="text-primary-light" href={`/${role}/pending-orders`}>
          Pending Orders
        </Link>
      ),
      icon: <ScheduleOutlined />,
      key: `/${role}/pending-orders`,
    },
    {
      label: (
        <Link className="text-primary-light" href={`/${role}/active-orders`}>
          Active Orders
        </Link>
      ),
      icon: <ScheduleOutlined />,
      key: `/${role}/confirm-orders`,
    },
    {
      label: (
        <Link className="text-primary-light" href={`/${role}/completed-orders`}>
          Completed Orders
        </Link>
      ),
      icon: <ScheduleOutlined />,
      key: `/${role}/completed-orders`,
    },
    {
      label: (
        <Link className="text-primary-light" href={`/${role}/customers`}>
          Customers
        </Link>
      ),
      icon: <UnorderedListOutlined />,
      key: `/${role}/customers`,
    },
  ];

  const userSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonSidebarItems,
    {
      label: (
        <Link className="text-primary-light" href={`/${role}/cart-items`}>
          cart-items
        </Link>
      ),
      icon: <ScheduleOutlined />,
      key: `/${role}/cart-items`,
    },
  ];

  if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
