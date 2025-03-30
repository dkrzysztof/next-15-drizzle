"use server";

import { ServerActionResult } from "@/api/types";
import {
  addUserAddressToUser
} from "@/api/users-addresses";
import { UserAddressExportedFormValues } from "@/components/users/UserAddressForm";
import { userAddressFormValuesToAddUserAddressType } from "@/utils";

export async function handleAddUserAddress(
  _: unknown,
  formValues: Required<UserAddressExportedFormValues> | null
): Promise<ServerActionResult> {
  try {
    if(!formValues){
      throw "Form needs to be filled out!"
    }
    const data = userAddressFormValuesToAddUserAddressType(formValues)
    await addUserAddressToUser(data);

    return {
      type: "success",
      message: "New address was added!",
    };
  } catch (error) {
    return {
      type: "error",
      message: String(error),
    };
  }
}
