"use client";
import { ServerActionResult } from "@/api/types";
import { UsersAddressPreview } from "@/components/user-addresses/UsersAddressPreview";
import { SelectUserAddress, UserAddressGroupedPrimaryKey } from "@/db/schema";
import { selectUsersAddressToUserAddressFormValues } from "@/utils";
import { EditOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Modal } from "antd";
import { useRouter } from "next/navigation";
import React, { startTransition, useActionState, useEffect } from "react";
import { handleRemoveUserAddress } from "./actions";
import { useEditModalContext } from "./context";

export type Props = {
  usersAddress: SelectUserAddress;
};

export const UsersAddressesContextMenu: React.FC<Props> = ({
  usersAddress,
}) => {
  const { open, updateEntity } = useEditModalContext();

  return (
    <Dropdown
      trigger={["contextMenu", "click"]}
      menu={{
        items: [
          {
            key: "1",
            icon: <EditOutlined />,
            label: "Edit",
            onClick: (event) => {
              event.domEvent.stopPropagation();
              updateEntity(usersAddress);
              console.log(usersAddress.validFrom);
              open(true);
            },
          },
          {
            key: "2",
            label: <Delete usersAddress={usersAddress} />,
            danger: true,
          },
        ],
      }}
    >
      <Button type="text" onClick={(event) => event.stopPropagation()}>
        <MenuOutlined />
      </Button>
    </Dropdown>
  );
};

export type Props1 = {
  usersAddress: SelectUserAddress;
};
export const Delete: React.FC<Props1> = ({ usersAddress }) => {
  const { replace } = useRouter();
  const [messageApi, messageContext] = message.useMessage();
  const [modalApi, modalContext] = Modal.useModal();

  const [result, formAction, pending] = useActionState<
    ServerActionResult | null,
    Required<UserAddressGroupedPrimaryKey>
  >(handleRemoveUserAddress, null);

  useEffect(() => {
    if (result && result.type === "success") {
      messageApi.success(result.message);
      replace(`/users/${usersAddress.userId}`);
    }
  }, [result]);

  const triggerAction = () => {
    modalApi.confirm({
      title: "Confirm Delete",
      content: (
        <>
          <p>The following address will be removed from user:</p>
          <UsersAddressPreview
            formValue={selectUsersAddressToUserAddressFormValues(usersAddress)}
            defaultValue="-"
          />
        </>
      ),
      okButtonProps: {
        loading: pending,
        danger: true,
      },
      onOk: () =>
        startTransition(() =>
          formAction({
            addressType: usersAddress.addressType,
            userId: usersAddress.userId,
            validFrom: usersAddress.validFrom,
          })
        ),
    });
  };
  
  return (
    <>
      {messageContext}
      {modalContext}
      <a onClick={triggerAction}>Delete</a>
    </>
  );
};
