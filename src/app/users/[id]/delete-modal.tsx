import { UsersAddressPreview } from "@/components/user-addresses/UsersAddressPreview";
import { SelectUserAddress, UserAddressGroupedPrimaryKey } from "@/db/schema";
import { selectUsersAddressToUserAddressFormValues } from "@/utils";
import { Button } from "antd";
import { handleRemoveUserAddress } from "./actions";
import { startTransition, useActionState } from "react";
import { ServerActionResult } from "@/api/types";

export const showDeleteUsersAddressConfirmModal = (
  modalApi: any,
  
  formAction: (payload: Required<UserAddressGroupedPrimaryKey>) => void
): void => {
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
    footer: (
      _: unknown,
      {
        OkBtn,
        CancelBtn,
      }: { OkBtn: typeof Button; CancelBtn: React.ComponentType }
    ) => {


      return (
        <>
          <CancelBtn />
          <OkBtn
            onClick={startTransition(() =>
              formAction({
                addressType: usersAddress.addressType,
                userId: usersAddress.userId,
                validFrom: usersAddress.validFrom,
              })
            )}
          />
        </>
      );
    },
  });
};
