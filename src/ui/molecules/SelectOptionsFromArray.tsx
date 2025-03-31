import { Select } from "antd";
import React from "react";
import { AddressTypeTag } from "../atoms/AddressTypeTag";
import { UserAddressAddressType } from "../../../drizzle/schema";

export const USER_ADDRESS_TYPES: UserAddressAddressType[] = [
  "HOME",
  "INVOICE",
  "POST",
  "WORK",
];

export const AddressTypeTagSelectOptions: React.FC = () => {
  return (
    <>
      {USER_ADDRESS_TYPES.map((optionValue: UserAddressAddressType) => (
        <Select.Option value={optionValue}>
          <AddressTypeTag type={optionValue} />
        </Select.Option>
      ))}
    </>
  );
};
