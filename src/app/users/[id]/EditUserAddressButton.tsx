"use client";
import { SelectUser } from "@/db/schema";
import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import { CreateUserAddressModalWithTheme } from "./CreateUserAddreesModal";
import withTheme from "@/theme";

export interface Props {
  userId: SelectUser["id"];
}

const CreateUserAddreesButton: React.FC<Props> = ({
  userId,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className="mb-3 w-full">
      <Row>
        <Col className="ml-auto">
          <Button type="primary" onClick={() => setOpen(true)}>+ Add new address</Button>
        </Col>
      </Row>
      <CreateUserAddressModalWithTheme
        open={isOpen}
        onSave={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        userId={userId}
      />
    </div>
  );
};

export const CreateUserAddreesButtonWithTheme = withTheme(CreateUserAddreesButton)