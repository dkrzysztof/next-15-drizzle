import { formatUserAddressFormatValues } from "@/utils";
import { Card } from "antd";
import React from "react";
import { UserAddressFormValues } from "../types";

export type Props = {
  formValue: UserAddressFormValues;
  defaultValue: string;
};

export const UsersAddressPreview: React.FC<Props> = ({
  formValue,
  defaultValue,
}) => {
  const formattedFormOutput = formatUserAddressFormatValues(formValue);

  return (
    <Card className="!mb-4">
      {formattedFormOutput ? (
        formattedFormOutput.map((value: string) => (
          <React.Fragment key={value}>
            {value}
            <br />
          </React.Fragment>
        ))
      ) : (
        <p className="italic font-normal text-gray-500 text-center">
          {defaultValue}
        </p>
      )}
    </Card>
  );
};
