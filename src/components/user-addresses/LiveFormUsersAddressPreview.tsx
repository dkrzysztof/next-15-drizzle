import { Form, FormInstance } from "antd";
import React from "react";
import { UserAddressFormValues } from "./UserAddressForm";
import { UsersAddressPreview } from "./UsersAddressPreview";

export type Props = {
  form: FormInstance;
};

export const LiveFormUsersAddressPreview: React.FC<Props> = ({ form }) => {
  const formValues =
    Form.useWatch<UserAddressFormValues, UserAddressFormValues>(
      (values) => values,
      form
    ) ?? null;

  return (
    <>
      <h6>Your address:</h6>
      <UsersAddressPreview
        formValue={formValues ?? {}}
        defaultValue="Fill out the form to generate your address here"
      />
    </>
  );
};
