"use client";
import "@ant-design/v5-patch-for-react-19";

import { ServerActionResult } from "@/api/types";
import { SelectUser } from "@/db/schema";
import { Alert, Form, message, Modal } from "antd";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import {
  UserAddressExportedFormValues,
  UserAddressForm,
} from "../../../ui/molecules/UserAddressForm";
import { handleAddUserAddress } from "./actions";

type Props = {
  userId: SelectUser["id"];
  open: boolean;
  closeModal: () => void;
};

export const CreateUserAddressModal: React.FC<Props> = ({
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

  useEffect(() => {
    if (result?.isSuccess) {
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
      {result && !result.isSuccess ? <Alert type="error" {...result} /> : null}
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

