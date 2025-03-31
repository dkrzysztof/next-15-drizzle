"use client";
import "@ant-design/v5-patch-for-react-19";

import { SelectUser } from "@/db/schema";
import { Table, TableColumnType } from "antd";
import { useRouter } from "next/navigation";
import { PaginationResponse } from "@/api/types";
import { usePagination } from "@/hooks/usePagination";
import { UserContextMenu } from "@/ui/organisms/UserContextMenu";
import { renderStatusTag } from "../atoms/StatusTag";

const USERS_TABLE_COLUMNS: TableColumnType<SelectUser>[] = [
  {
    title: "Name",
    dataIndex: "firstName",
  },
  {
    title: "Last name",
    dataIndex: "lastName",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: renderStatusTag,
  },
  {
    title: "Actions",
    key: "actions",
    width: 30,
    align: "right",
    render: (record: SelectUser) => <UserContextMenu user={record} />,
  },
];

type Props = {
  dataSource: SelectUser[];
  pagination: PaginationResponse;
};

export const UsersTable: React.FC<Props> = ({ dataSource, pagination }) => {
  const router = useRouter();

  const { onPaginationChange, pagination: tablePagination } =
    usePagination(pagination);

  return (
    <Table
      className="w-full"
      rowKey="id"
      onChange={onPaginationChange}
      pagination={tablePagination}
      dataSource={dataSource}
      columns={USERS_TABLE_COLUMNS}
      onRow={(record: SelectUser) => ({
        onClick: () => router.push(`/users/${record.id}`),
      })}
    />
  );
};
