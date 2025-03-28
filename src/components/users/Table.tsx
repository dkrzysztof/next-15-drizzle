"use client";
import "@ant-design/v5-patch-for-react-19";

import { SelectUser } from "@/db/schema";
import { Table } from "antd";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ContextMenu } from "../common/ContextMenu";
import { USERS_TABLE_COLUMNS } from "./columns";

type Props = {
  dataSource: SelectUser[];
};

export const UsersTable: React.FC<Props> = ({ dataSource }) => {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<SelectUser | null>(null);
  const menuOpen = useMemo(() => selectedUser !== null, [selectedUser]);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  return (
    <>
      <ContextMenu user={selectedUser} open={menuOpen} pos={position} />
      <Table
      className="w-full"
        rowKey="id"
        dataSource={dataSource}
        columns={USERS_TABLE_COLUMNS}
        onRow={(record: SelectUser) => ({
          onClick: () => router.push(`/users/${record.id}`),

          onContextMenu: (event) => {
            event.preventDefault();
            if (!menuOpen) {
              document.addEventListener(`click`, function onClickOutside() {
                setSelectedUser(null);
                document.removeEventListener(`click`, onClickOutside);
              });
            }
            setSelectedUser(record);
            setPosition({ x: event.clientX, y: event.clientY });
          },
        })}
      />
    </>
  );
};
