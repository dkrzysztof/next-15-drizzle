"use client";

import { PaginationResponse } from "@/api/types";
import { SelectUserAddress } from "@/db/schema";
import { usePagination } from "@/hooks/usePagination";
import { userAddressPrimaryKeyToString } from "@/utils";
import { Table } from "antd";
import { USERS_ADDRESSES_COLUMNS } from "./columns";
import { ToggleModalProvider } from "../../../contexts/ToggleModal";
import { EditUserAddressModal } from "./EditUserAddressModal";

type Props = {
  dataSource: SelectUserAddress[];
  pagination: PaginationResponse;
};

export const UsersAddressesTable = ({ dataSource, pagination }: Props) => {
  const { onPaginationChange, pagination: tablePagination } =
    usePagination(pagination);

  return (
    <ToggleModalProvider>
      <Table
        pagination={tablePagination}
        className="w-full"
        rowKey={userAddressPrimaryKeyToString}
        onChange={onPaginationChange}
        columns={USERS_ADDRESSES_COLUMNS}
        dataSource={dataSource}
      />
      <EditUserAddressModal />
    </ToggleModalProvider>
  );
};
