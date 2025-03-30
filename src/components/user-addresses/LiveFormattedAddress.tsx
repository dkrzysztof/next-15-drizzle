import React from "react";
import { UserAddressExportedFormValues } from "../users/UserAddressForm";
import { Card, Form, FormInstance } from "antd";
import { formatUserAddressFormatValues } from "@/utils";

export type Props = {
  form: FormInstance;
};

export const LiveFormattedAddress: React.FC<Props> = ({ form }) => {
  const formattedFormOutput =
    Form.useWatch<UserAddressExportedFormValues, string[] | null>(
      formatUserAddressFormatValues,
      form
    ) ?? null;

  return (
    <>
      <h6>Your address:</h6>
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
            Fill out the form to generate your address here
          </p>
        )}
      </Card>
    </>
  );
};
