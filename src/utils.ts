import dayjs from "dayjs";
import countries from "i18n-iso-countries";
import { redirect } from "next/navigation";
import { SelectUser, SelectUserAddress } from "@/db/schema";
import { Pagination } from "./api/types";
import { AddUserAddressType } from "./api/users-addresses";
import {
  UserAddressExportedFormValues,
  UserAddressFormValues,
} from "./ui/types";

export const firstOrNull = <T>(data: T[] | null): T | null => {
  if (!data || !data[0]) {
    return null;
  }

  return data[0];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shouldBeNumber = (value: any): number => {
  if (Number.isNaN(+value)) {
    redirect("/400");
  }

  return +value;
};

export const numberOrDefault = (
  value: string | number | undefined,
  defaultValue: number,
): number => {
  if (value === undefined || Number.isNaN(+value)) {
    return defaultValue;
  }

  return +value > 0 ? +value : defaultValue;
};

export const paginationOrDefault = (
  pagination: Record<keyof Pagination, string | number | undefined>,
): Pagination => ({
  page: numberOrDefault(pagination.page, 1),
  pageSize: numberOrDefault(pagination.pageSize, 4),
});

export const formatFullname = (user: SelectUser): string =>
  `${user.firstName} ${user.lastName}`;

export const formatTimestamp = (value: Date): string => {
  return dayjs(value).format("DD.MM.YYYY HH:mm:ss");
};

export const formatLine = (...vars: (string | undefined)[]): string | null => {
  const defined = vars.filter((v) => v !== undefined);
  return defined.length ? defined.join(" ") : null;
};

export const formatUserAddressFormatValues = (
  value: UserAddressExportedFormValues,
): string[] | null => {
  const multilineString: string[] = [
    formatLine(value.street, value.buildingNumber),
    formatLine(value.postCode, value.city),
    formatLine(value.countryCode),
  ].filter<string>((value): value is string => !!value);

  return multilineString.length ? multilineString : null;
};

export const userAddressPrimaryKeyToString = (
  userAddress: SelectUserAddress,
): string => {
  return `${userAddress.userId}-${userAddress.addressType}-${userAddress.validFrom}`;
};

export const userAddressFormValuesToAddUserAddressType = (
  formValues: Required<UserAddressExportedFormValues>,
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

export const selectUsersAddressToUserAddressFormValues = (
  value: SelectUserAddress,
): UserAddressFormValues => ({
  addressType: value.addressType,
  buildingNumber: value.buildingNumber,
  city: value.city,
  countryCode: value.countryCode,
  postCode: value.postCode,
  street: value.street,
  userId: value.userId,
  validFrom: value.validFrom,
  validFromPreview: dayjs(value.validFrom),
});

export const userAddressFormValuesToUserAddressExportedFormValues = ({
  validFromPreview,
  ...value
}: Required<UserAddressFormValues>): Required<UserAddressExportedFormValues> => ({
  ...value,
  validFrom:
    value.validFrom ?? validFromPreview.format("YYYY-MM-DDTHH:mm:ss.SSSSSS"),
});

export const validateIsCountryCodeIso3166_1Alpha3 = (
  _: unknown,
  value: string,
): Promise<void> => {
  if (!value || countries.isValid(value.toUpperCase())) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("Invalid ISO 3166-1 alpha-3 country code"));
};
