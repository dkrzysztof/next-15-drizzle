"use server";

import { ServerActionResult } from "@/api/types";
import {
  addUserAddressToUser,
  editUserAddressToUser,
  removeUserAddress,
} from "@/api/users-addresses";
import { UserAddressExportedFormValues } from "@/components/user-addresses/UserAddressForm";
import { SelectUserAddress, UserAddressGroupedPrimaryKey } from "@/db/schema";
import { userAddressFormValuesToAddUserAddressType } from "@/utils";

export async function handleAddUserAddress(
  _: unknown,
  formValues: Required<UserAddressExportedFormValues>
): Promise<ServerActionResult> {
  const data = userAddressFormValuesToAddUserAddressType(formValues);
  return addUserAddressToUser(data);
}

export async function handleEditUserAddress(
  _: unknown,
  formValues: Required<UserAddressExportedFormValues>
): Promise<ServerActionResult> {
  const data = userAddressFormValuesToAddUserAddressType(formValues);
  return editUserAddressToUser(data);
}

export async function handleRemoveUserAddress(
  _: unknown,
  formValues: UserAddressGroupedPrimaryKey
): Promise<ServerActionResult> {
  return removeUserAddress(formValues);
}
