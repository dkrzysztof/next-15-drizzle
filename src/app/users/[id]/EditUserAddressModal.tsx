"use client";
import "@ant-design/v5-patch-for-react-19";

import { ServerActionResult } from "@/api/types";
import { SelectUserAddress } from "@/db/schema";
import { selectUsersAddressToUserAddressFormValues } from "@/utils";
import { Alert, App, Form, message, Modal } from "antd";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import {
  UserAddressExportedFormValues,
  UserAddressForm,
  UserAddressFormValues,
} from "../../../ui/molecules/UserAddressForm";
import { handleEditUserAddress } from "./actions";
import { useToggleModal } from "../../../contexts/ToggleModal";

export const EditUserAddressModal: React.FC = () => {
  const { replace } = useRouter();
  const [messageApi, antdMessageContext] = message.useMessage();
  const [form] = Form.useForm<UserAddressFormValues>();
  const { entity, open, isOpen, updateEntity } =
    useToggleModal<SelectUserAddress>();

  const [result, formAction, pending] = useActionState<
    ServerActionResult | null,
    Required<UserAddressExportedFormValues>
  >(handleEditUserAddress, null);

  const handleCancel = () => {
    updateEntity(null);
    open(false);
  };

  useEffect(() => {
    if (result?.isSuccess) {
      messageApi.success(result.message);
      replace(`/users/${entity?.userId}`);
      open(false);
    }
  }, [result]);

  useEffect(() => {
    if (entity) {
      form.setFieldsValue(selectUsersAddressToUserAddressFormValues(entity));
    }
  }, [entity]);

  return (
    <Modal
      title="Edit Address"
      open={isOpen}
      footer={null}
      onCancel={handleCancel}
    >
      {antdMessageContext}
      {entity ? (
        <>
          {result && !result.isSuccess ? (
            <Alert type="error" {...result} />
          ) : null}
          <UserAddressForm
            formType="edit"
            form={form}
            userId={entity.userId}
            action={formAction}
            loading={pending}
            onCancel={handleCancel}
          />
        </>
      ) : null}
    </Modal>
  );
};
