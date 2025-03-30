"use client";

import { SelectUserAddress } from "@/db/schema";
import { Table, TablePaginationConfig } from "antd";
import { USERS_ADDRESSES_COLUMNS } from "./columns";
import { userAddressPrimaryKeyToString } from "@/utils";
import withTheme from "@/theme";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination, PaginationResponse } from "@/api/types";

type Props = {
  dataSource: SelectUserAddress[];
  pagination: PaginationResponse;
};

const UsersAddressesTable = ({ dataSource, pagination }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {push} = useRouter()

  const handlePaginationChange = ({ pageSize, current,  }: TablePaginationConfig) => {
    const params = new URLSearchParams(searchParams);
    if(pageSize){
      params.set('pageSize', pageSize.toString());
    }
    if(current){
      params.set('page', current.toString());
    }
    push(`${pathname}?${params.toString()}`)
  };

  return (
    <Table
      pagination={{
        ...pagination,
        current: pagination.page,
      }}
      className="w-full"
      rowKey={userAddressPrimaryKeyToString}
      onChange={handlePaginationChange}
      columns={USERS_ADDRESSES_COLUMNS}
      dataSource={dataSource}
    />
  );
};

export const UsersAddressesTableWithTheme = withTheme(UsersAddressesTable);
