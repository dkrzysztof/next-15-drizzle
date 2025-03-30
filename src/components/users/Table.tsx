"use client";
import "@ant-design/v5-patch-for-react-19";

import { SelectUser } from "@/db/schema";
import { withProvider } from "@/hocs/withProvider";
import withTheme from "@/theme";
import { App, message, Table } from "antd";
import { useRouter } from "next/navigation";
import {
  ContextMenuProvider,
  useContextMenu,
} from "../common/ContextMenu";
import { USERS_TABLE_COLUMNS } from "./columns";

type Props = {
  dataSource: SelectUser[];
};

const UsersTable: React.FC<Props> = ({ dataSource }) => {
  const router = useRouter();
  const contextMenu = useContextMenu();

  return (
    <Table
      className="w-full"
      rowKey="id"
      dataSource={dataSource}
      columns={USERS_TABLE_COLUMNS}
      onRow={(record: SelectUser) => ({
        onClick: () => router.push(`/users/${record.id}`),
        onContextMenu: (event) => {
          contextMenu?.openContextMenu(event, record);
        },
      })}
    />
  );
};

export const UsersTableWithTheme = withTheme(
  withProvider(UsersTable, ContextMenuProvider, {
    items: [
      {
        key: "edit",
        label: "Edit",
        onClick: () => App.useApp().message.info("Edited!"),
      },
      {
        key: "delete",
        label: "Delete",
        onClick: () => message.info("Deleted!"),
        danger: true,
      },
    ],
  })
);
