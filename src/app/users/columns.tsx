import { SelectUser } from "@/db/schema";
import { renderStatusTag } from "../../components/user-addresses/StatusTag";
import { UserContextMenu } from "./UserContextMenu";
import { TableColumnType } from "antd";

export const USERS_TABLE_COLUMNS: TableColumnType<SelectUser>[] = [
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
