"use client";
import "@ant-design/v5-patch-for-react-19";

import { ServerActionResult } from "@/api/types";
import { SelectUserAddress } from "@/db/schema";
import { useEventActionState } from "@/hooks/useEventActionState";
import { selectUsersAddressToUserAddressFormValues } from "@/utils";
import { Alert, App, Form, Modal } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useToggleModal } from "../../../contexts/ToggleModal";
import { handleEditUserAddress } from "./actions";
import { UserAddressForm } from "@/ui/molecules/UserAddressForm";
import {
  UserAddressFormValues,
  UserAddressExportedFormValues,
} from "@/ui/types";

export const EditUserAddressModal: React.FC = () => {
  const { replace } = useRouter();
  const message = App.useApp().message;
  const [form] = Form.useForm<UserAddressFormValues>();
  const { entity, open, isOpen, updateEntity } =
    useToggleModal<SelectUserAddress>();

  const handleCloseModal = () => {
    updateEntity(null);
    open(false);
  };

  const [result, formAction, pending] = useEventActionState<
    Required<UserAddressExportedFormValues>
  >({
    serverAction: handleEditUserAddress,
    onSuccess: (result: ServerActionResult): void => {
      message.success(result.message);
      replace(`/users/${entity?.userId}`);
      handleCloseModal();
    },
  });

  useEffect(() => {
    if (entity) {
      form.setFieldsValue(selectUsersAddressToUserAddressFormValues(entity));
    }
  }, [entity, form]);

  return (
    <Modal
      title="Edit Address"
      open={isOpen}
      footer={null}
      onCancel={handleCloseModal}
    >
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
            onCancel={handleCloseModal}
          />
        </>
      ) : null}
    </Modal>
  );
};
