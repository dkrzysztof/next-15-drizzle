"use client";
import { SelectUser } from "@/db/schema";
import { Tag } from "antd";

export const renderStatusTag = (status: SelectUser["status"]) => {
  return <Tag color={status === "ACTIVE" ? "green" : "red"}>{status}</Tag>;
};
