"use client";
import "@ant-design/v5-patch-for-react-19";

import { SelectUser } from "@/db/schema";
import { Table } from "antd";
import { useRouter } from "next/navigation";
import { USERS_TABLE_COLUMNS } from "./columns";
import { PaginationResponse } from "@/api/types";
import { usePagination } from "@/hooks/usePagination";

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
