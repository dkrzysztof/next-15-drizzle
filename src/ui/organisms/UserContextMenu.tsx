"use client";
import { SelectUser } from "@/db/schema";
import { formatFullname } from "@/utils";
import { DeleteOutlined, EditOutlined, MenuOutlined } from "@ant-design/icons";
import { App, Button, Dropdown } from "antd";
import React from "react";

export type Props = {
  user: SelectUser;
};

export const UserContextMenu: React.FC<Props> = ({ user }) => {
  const message = App.useApp().message
  return (
    <Dropdown
      trigger={["contextMenu", "click"]}
      menu={{
        items: [
          {
            key: "1",
            icon: <EditOutlined />,
            label: "Edit",
            onClick: (event) => {
              event.domEvent.stopPropagation();
              message.info(
                `Successfully edited user: ${formatFullname(user)}!`
              );
            },
          },
          {
            key: "2",
            icon: <DeleteOutlined />,
            label: "Delete",
            danger: true,
            onClick: (event) => {
              event.domEvent.stopPropagation();
              message.info(
                `Successfully deleted user: ${formatFullname(user)}!`
              );
            },
          },
        ],
      }}
    >
      <Button type="text" onClick={(event) => event.stopPropagation()}>
        <MenuOutlined />
      </Button>
    </Dropdown>
  );
};
