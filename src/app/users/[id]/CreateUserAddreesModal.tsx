"use client";
import "@ant-design/v5-patch-for-react-19";

import { ServerActionResult } from "@/api/types";
import { SelectUser } from "@/db/schema";
import withTheme from "@/theme";
import { Alert, Form, Modal } from "antd";
import React, {
  useActionState
} from "react";
import {
  UserAddressExportedFormValues,
  UserAddressForm,
} from "../../../components/users/UserAddressForm";
import { handleAddUserAddress } from "./action";

type Props = {
  userId: SelectUser["id"];
  open: boolean;
  onSave: () => void;
  onCancel: () => void;
};

const CreateUserAddreesModal: React.FC<Props> = ({ userId, open, onSave, onCancel }) => {
  const [result, formAction, pending] = useActionState<
    ServerActionResult | null,
    Required<UserAddressExportedFormValues> | null
  >(handleAddUserAddress, null);
  
  const [form] = Form.useForm<UserAddressExportedFormValues>();

  return (
    <Modal title="Add new Address" open={open} footer={null} onCancel={onCancel}>
      {result ? <Alert {...result} /> : null}
      <UserAddressForm
        userId={userId}
        form={form}
        action={formAction}
        loading={pending}
        onCancel={onCancel}
      />
    </Modal>
  );
};

export const CreateUserAddressModalWithTheme = withTheme(
  CreateUserAddreesModal
);
