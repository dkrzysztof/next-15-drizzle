import { redirect } from "next/navigation";
import { Pagination, UserAddress } from "./api/types";
import { AddUserAddressType } from "./api/users-addresses";
import {
  UserAddressExportedFormValues,
  UserAddressFormValues,
} from "./components/user-addresses/UserAddressForm";
import { SelectUser, SelectUserAddress } from "./db/schema";
import dayjs, { Dayjs } from "dayjs";

export const firstOrNull = <T>(data: T[] | null): T | null => {
  if (!data || !data[0]) {
    return null;
  }

  return data[0];
};

export const shouldBeNumber = (value: any): number => {
  if (Number.isNaN(+value)) {
    redirect("/400");
  }

  return +value;
};

export const numberOrDefault = (value: any, defaultValue: number): number => {
  if (Number.isNaN(+value)) {
    return defaultValue;
  }

  return +value;
};

export const paginationOrDefault = (
  pagination: Record<keyof Pagination, any>
): Pagination => ({
  page: numberOrDefault(pagination.page, 1),
  pageSize: numberOrDefault(pagination.pageSize, 4),
});

export const formatFullname = (user: SelectUser): string =>
  `${user.firstName} ${user.lastName}`;

export const formatLine = (...vars: (string | undefined)[]): string | null => {
  const defined = vars.filter((v) => v !== undefined);
  return defined.length ? defined.join(" ") : null;
};

export const formatUserAddressFormatValues = (
  value: UserAddressExportedFormValues
): string[] | null => {
  const multilineString: string[] = [
    formatLine(value.street, value.buildingNumber),
    formatLine(value.postCode, value.city),
    formatLine(value.countryCode),
  ].filter<string>((value): value is string => !!value);

  return multilineString.length ? multilineString : null;
};

export const userAddressPrimaryKeyToString = (
  userAddress: SelectUserAddress
): string => {
  return `${userAddress.userId}-${
    userAddress.addressType
  }-${userAddress.validFrom}`;
};

export const userAddressFormValuesToAddUserAddressType = (
  formValues: Required<UserAddressExportedFormValues>
): AddUserAddressType => {
  return {
    userId: formValues.userId,
    addressType: formValues.addressType,
    validFrom: formValues.validFrom,
    postCode: formValues.postCode,
    city: formValues.city,
    countryCode: formValues.countryCode,
    street: formValues.street,
    buildingNumber: formValues.buildingNumber,
  };
};

export const formatTimestamp = (value: Date): string => {
  return dayjs(value).format("DD.MM.YYYY HH:mm:ss");
};

export const selectUsersAddressToUserAddressFormValues = (
  value: SelectUserAddress
): UserAddressFormValues => ({
  addressType: value.addressType,
  buildingNumber: value.buildingNumber,
  city: value.city,
  countryCode: value.countryCode,
  postCode: value.postCode,
  street: value.street,
  userId: value.userId,
  validFrom: value.validFrom,
  validFromPreview: dayjs(value.validFrom)
});
