"use client";
import { Button, App } from "antd";
import React from "react";

export const AddUserButton: React.FC = () => {
  const message = App.useApp().message;
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
