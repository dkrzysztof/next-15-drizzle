"use client";

import { PaginationResponse } from "@/api/types";
import { EditUserAddressModal } from "@/app/users/[id]/EditUserAddressModal";
import { UsersAddressesContextMenu } from "@/ui/organisms/UsersAddressesContextMenu";
import { ToggleModalProvider } from "@/contexts/ToggleModal";
import { SelectUserAddress } from "@/db/schema";
import { usePagination } from "@/hooks/usePagination";
import { formatTimestamp, userAddressPrimaryKeyToString } from "@/utils";
import { Table, TableColumnType } from "antd";
import { UserAddressAddressType } from "../../../drizzle/schema";
import { AddressTypeTag } from "../atoms/AddressTypeTag";

const USERS_ADDRESSES_COLUMNS: TableColumnType<SelectUserAddress>[] = [
  {
    title: "Address type",
    dataIndex: "addressType",
    render: (type: UserAddressAddressType) => <AddressTypeTag type={type} />,
  },
  { title: "Valid from", dataIndex: "validFrom", render: formatTimestamp },
  { title: "Street", dataIndex: "street" },
  { title: "Building number", dataIndex: "buildingNumber" },
  { title: "Post code", dataIndex: "postCode" },
  { title: "City", dataIndex: "city" },
  { title: "Country code", dataIndex: "countryCode" },
  {
    title: "Actions",
    width: 30,
    align: "right",
    render: (usersAddress: SelectUserAddress) => (
      <UsersAddressesContextMenu usersAddress={usersAddress} />
    ),
  },
];

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
