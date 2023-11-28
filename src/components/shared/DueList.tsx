"use client";

import React from "react";
import EmptyData from "./EmptyData";
import DueListTable from "../admin/DueListTable";
import { useGetDueListFromDBQuery } from "@/redux/features/admin/dueList/dueListApi";

const DueList = () => {
  const { data: { data: dueList } = [], isLoading } = useGetDueListFromDBQuery(undefined) || [];

  const uniqueEmails = dueList && Array.from(new Set(dueList.map((entry: { email: any }) => entry.email)));

  return (
    <div>
      {!isLoading && dueList ? (
        uniqueEmails.map((email: any, index: number) => <DueListTable key={index} email={email} />)
      ) : (
        <EmptyData />
      )}
    </div>
  );
};

export default DueList;
