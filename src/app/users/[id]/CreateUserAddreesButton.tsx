"use client";
import { SelectUser } from "@/db/schema";
import { App, Button, Col, Row } from "antd";
import React, { useState } from "react";
import { CreateUserAddressModalWithTheme } from "./CreateUserAddreesModal";
import withTheme from "@/theme";

export interface Props {
  userId: SelectUser["id"];
}

const CreateUserAddreesButton: React.FC<Props> = ({ userId }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        + Add new address
      </Button>
      <CreateUserAddressModalWithTheme
        open={isOpen}
        closeModal={() => setOpen(false)}
        userId={userId}
      />
    </>
  );
};

export const CreateUserAddreesButtonWithTheme = withTheme(
  CreateUserAddreesButton
);
