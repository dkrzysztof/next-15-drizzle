"use client";
import "@ant-design/v5-patch-for-react-19";

import { ServerActionResult } from "@/api/types";
import { SelectUser } from "@/db/schema";
import withTheme from "@/theme";
import { Alert, Form, message, Modal } from "antd";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useMemo } from "react";
import {
  UserAddressExportedFormValues,
  UserAddressForm,
} from "../../../components/user-addresses/UserAddressForm";
import { handleAddUserAddress } from "./actions";

type Props = {
  userId: SelectUser["id"];
  open: boolean;
  closeModal: () => void;
};

const CreateUserAddreesModal: React.FC<Props> = ({
  userId,
  open,
  closeModal,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { replace } = useRouter();
  const [result, formAction, pending] = useActionState<
    ServerActionResult | null,
    Required<UserAddressExportedFormValues>
  >(handleAddUserAddress, null);

  const [form] = Form.useForm<UserAddressExportedFormValues>();

  const showAlert = useMemo(
    () => result && result.type !== "success",
    [result?.type]
  );

  useEffect(() => {
    if (result && result.type === "success") {
      messageApi.success(result.message);
      replace(`/users/${userId}`);
      closeModal();
    }
  }, [result]);

  return (
    <Modal
      title="Add new Address"
      open={open}
      footer={null}
      onCancel={closeModal}
    >
      {contextHolder}
      {showAlert ? <Alert {...result} /> : null}
      <UserAddressForm
        formType="create"
        userId={userId}
        form={form}
        action={formAction}
        loading={pending}
        onCancel={closeModal}
      />
    </Modal>
  );
};

export const CreateUserAddressModalWithTheme = withTheme(
  CreateUserAddreesModal
);
