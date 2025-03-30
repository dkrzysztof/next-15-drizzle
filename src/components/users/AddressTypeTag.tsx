"use client";
import { Tag, TagProps } from "antd";
import { UserAddressAddressType } from "../../../drizzle/schema";

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
