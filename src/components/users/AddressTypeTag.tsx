"use client";
import { UserAddressAddressType } from "@/db/schema";
import { Tag, TagProps } from "antd";

const typeTagColor: Record<UserAddressAddressType, TagProps["color"]> = {
  HOME: "green",
  INVOICE: "purple",
  POST: "orange",
  WORK: "blue",
};

type Props = {
  type: UserAddressAddressType;
};

export const AddressTypeTag = ({ type }: Props) => {
  return <Tag color={typeTagColor[type]}>{type}</Tag>;
};
