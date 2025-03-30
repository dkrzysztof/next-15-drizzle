"use client";
import { Button, message } from "antd";
import React from "react";

export const AddUserButton: React.FC = () => {
  return (
    <Button
      className="ml-auto"
      type="primary"
      onClick={() => message.success("Successfully added user!")}
    >
      + Add user
    </Button>
  );
};
