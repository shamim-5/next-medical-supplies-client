"use client";

import React from "react";
import EmptyData from "./EmptyData";
import DueListTable from "../admin/DueListTable";
import { useGetDueListFromDBQuery } from "@/redux/features/admin/dueList/dueListApi";
import useUserInfo from "@/hooks/useUserInfo";
import { useAppSelector } from "@/redux/hooks/hook";
import { USER_ROLE } from "@/constants/role";

const DueList = () => {
  const { data: { data: dueList } = [], isLoading } = useGetDueListFromDBQuery(undefined) || [];
  const { accessToken: firebaseAccessToken } = useUserInfo();
  const { user, accessToken } = useAppSelector((state: { auth: any }) => state?.auth);

  const admin = accessToken === firebaseAccessToken && user === process.env.NEXT_PUBLIC_ADMIN ? true : false;

  const role = (admin && USER_ROLE.ADMIN) || USER_ROLE.USER;
  const uniqueEmails = dueList && Array.from(new Set(dueList.map((entry: { email: any }) => entry.email)));

  return (
    <>
      {role === USER_ROLE.ADMIN ? (
        <div>
          {!isLoading && dueList ? (
            uniqueEmails.map((email: any, index: number) => <DueListTable key={index} email={email} />)
          ) : (
            <EmptyData />
          )}
        </div>
      ) : (
        <div>{!isLoading && dueList ? <DueListTable email={user} /> : <EmptyData />}</div>
      )}
    </>
  );
};

export default DueList;
