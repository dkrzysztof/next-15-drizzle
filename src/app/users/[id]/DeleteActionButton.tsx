import { ServerActionResult } from "@/api/types";
import { SelectUserAddress, UserAddressGroupedPrimaryKey } from "@/db/schema";
import { useEventActionState } from "@/hooks/useEventActionState";
import { UsersAddressPreview } from "@/ui/molecules/UsersAddressPreview";
import { selectUsersAddressToUserAddressFormValues } from "@/utils";
import { App } from "antd";
import { useRouter } from "next/navigation";
import { startTransition, useRef } from "react";
import { handleRemoveUserAddress } from "./actions";

export type Props = {
  usersAddress: SelectUserAddress;
};
export const DeleteActionButton: React.FC<Props> = ({ usersAddress }) => {
  const { replace } = useRouter();
  const { modal, message } = App.useApp();
  const resolved = useRef<(() => void) | null>(null);
  const rejected = useRef<(() => void) | null>(null);

  const [, formAction] = useEventActionState<
    Required<UserAddressGroupedPrimaryKey>
  >({
    serverAction: handleRemoveUserAddress,
    onSuccess: (result: ServerActionResult) => {
      message.success(result.message);
      replace(`/users/${usersAddress.userId}`);
      if (resolved.current) resolved.current();
    },
    onError: (result: ServerActionResult) => {
      message.error(result.message);
      if (rejected.current) rejected.current();
    },
  });

  const triggerAction = () => {
    modal.confirm({
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
        danger: true,
      },

      onOk: () => {
        startTransition(() =>
          formAction({
            addressType: usersAddress.addressType,
            userId: usersAddress.userId,
            validFrom: usersAddress.validFrom,
          })
        );
        return new Promise<void>((resolve, reject) => {
          resolved.current = resolve;
          rejected.current = reject;
        });
      },
    });
  };

  return <a onClick={triggerAction}>Delete</a>;
};
