import { ServerActionResult } from "@/api/types";
import { UsersAddressPreview } from "@/ui/molecules/UsersAddressPreview";
import { SelectUserAddress, UserAddressGroupedPrimaryKey } from "@/db/schema";
import { selectUsersAddressToUserAddressFormValues } from "@/utils";
import { message, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, startTransition } from "react";
import { handleRemoveUserAddress } from "./actions";

export type Props = {
  usersAddress: SelectUserAddress;
};
export const DeleteActionButton: React.FC<Props> = ({ usersAddress }) => {
  const { replace } = useRouter();
  const [messageApi, antdMessageContextHolder] = message.useMessage();
  const [modalApi, antdModalContextHolder] = Modal.useModal();

  const [result, formAction, pending] = useActionState<
    ServerActionResult | null,
    Required<UserAddressGroupedPrimaryKey>
  >(handleRemoveUserAddress, null);

  useEffect(() => {
    if (result?.isSuccess) {
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
      {antdMessageContextHolder}
      {antdModalContextHolder}
      <a onClick={triggerAction}>Delete</a>
    </>
  );
};
