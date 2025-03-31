"use client";
import { SelectUserAddress } from "@/db/schema";
import { EditOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React from "react";
import { useToggleModal } from "../../../contexts/ToggleModal";
import { DeleteActionButton } from "./DeleteActionButton";

export type Props = {
  usersAddress: SelectUserAddress;
};

export const UsersAddressesContextMenu: React.FC<Props> = ({
  usersAddress,
}) => {
  const { open, updateEntity } = useToggleModal();

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
              updateEntity(usersAddress);
              console.log(usersAddress.validFrom);
              open(true);
            },
          },
          {
            key: "2",
            label: <DeleteActionButton usersAddress={usersAddress} />,
            danger: true,
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


