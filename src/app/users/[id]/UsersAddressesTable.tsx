"use client";

import { Table } from "antd";
import { USERS_ADDRESSES_COLUMNS } from "./columns";
import { SelectUserAddress } from "@/db/schema";

type Props = {
  dataSource: SelectUserAddress[];
};

export const UsersAddressesTable = ({ dataSource }: Props) => {
  return <Table columns={USERS_ADDRESSES_COLUMNS} dataSource={dataSource} />;
};
