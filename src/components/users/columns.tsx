import { SelectUser } from "@/db/schema";
import { renderStatusTag } from "./StatusTag";

export const USERS_TABLE_COLUMNS = [
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
    render: renderStatusTag
  },
  {
    title: "Actions",
    key: "actions",
  },
];
