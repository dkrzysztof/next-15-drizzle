"use client";
import { SelectUser } from "@/db/schema";
import { Button } from "antd";
import React, { useState } from "react";
import { CreateUserAddressModal } from "./CreateUserAddressModal";

export interface Props {
  userId: SelectUser["id"];
}

export const CreateUserAddressButton: React.FC<Props> = ({ userId }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        + Add new address
      </Button>
      <CreateUserAddressModal
        open={isOpen}
        closeModal={() => setOpen(false)}
        userId={userId}
      />
    </>
  );
};
