"use client";

import React, { useState } from "react";
import { Dropdown, MenuProps, message } from "antd";
import { SelectUser } from "@/db/schema";

type Props = {
  user: SelectUser | null;
  open: boolean;
  pos: {
    x: number;
    y: number;
  };
};

export const ContextMenu = ({ user, open, pos }: Props) => {
  const menuItems: MenuProps["items"] = [
    {
      key: "edit",
      label: "Edit",
      onClick: () => message.info("Edited!"),
    },
    {
      key: "delete",
      label: "Delete",
      onClick: () => message.info("Deleted!"),
      danger: true,
    },
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      open={open}
      overlayStyle={{ left: `${pos.x}px`, top: `${pos.y}px` }}
    >
      <div className="absolute" />
    </Dropdown>
  );
};
