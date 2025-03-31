"use client";
import "@ant-design/v5-patch-for-react-19";

import { ServerActionResult } from "@/api/types";
import { SelectUser, UserAddressGroupedPrimaryKey } from "@/db/schema";
import { Alert, App, Form, message, Modal } from "antd";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import {
  UserAddressExportedFormValues,
  UserAddressForm,
} from "../../../ui/molecules/UserAddressForm";
import { handleAddUserAddress } from "./actions";
import { useEventActionState } from "@/hooks/useEventActionState";

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
  const message = App.useApp().message;
  const { replace } = useRouter();
  const [form] = Form.useForm<UserAddressExportedFormValues>();

  const [result, formAction, pending] = useEventActionState<
    Required<UserAddressExportedFormValues>
  >({
    serverAction: handleAddUserAddress,
    onSuccess: (result: ServerActionResult): void => {
      message.success(result.message);
      replace(`/users/${userId}`);
      closeModal();
    },
  });

  return (
    <Modal
      title="Add new Address"
      open={open}
      footer={null}
      onCancel={closeModal}
    >
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
