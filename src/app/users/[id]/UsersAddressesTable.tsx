"use client";

import { PaginationResponse } from "@/api/types";
import { SelectUserAddress } from "@/db/schema";
import { usePagination } from "@/hooks/usePagination";
import withTheme from "@/theme";
import { userAddressPrimaryKeyToString } from "@/utils";
import { Table } from "antd";
import { USERS_ADDRESSES_COLUMNS } from "./columns";
import { EditModalProvider } from "./context";
import { EditUserAddressModal } from "./EditUserAddressModal";

type Props = {
  dataSource: SelectUserAddress[];
  pagination: PaginationResponse;
};

const UsersAddressesTable = ({ dataSource, pagination }: Props) => {
  const { onPaginationChange, pagination: tablePagination } =
    usePagination(pagination);

  return (
    <EditModalProvider>
      <Table
        pagination={tablePagination}
        className="w-full"
        rowKey={userAddressPrimaryKeyToString}
        onChange={onPaginationChange}
        columns={USERS_ADDRESSES_COLUMNS}
        dataSource={dataSource}
      />
      <EditUserAddressModal />
    </EditModalProvider>
  );
};

export const UsersAddressesTableWithTheme = withTheme(UsersAddressesTable);
