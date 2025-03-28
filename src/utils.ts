import { redirect } from "next/navigation";
import { SelectUser, SelectUserAddress } from "./db/schema";
import { UserAddress } from "./api/types";

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

export const formatFullname = (user: SelectUser): string =>
  `${user.firstName} ${user.lastName}`;

export const usersAddressToSelectUserAddress = (
  data: UserAddress
): SelectUserAddress => ({
  userId: data.userId,
  addressType: data.addressType,
  postCode: data.postCode,
  city: data.city,
  countryCode: data.countryCode,
  street: data.street,
  buildingNumber: data.buildingNumber,
  createdAt: new Date(data.createdAt),
  updatedAt: new Date(data.updatedAt),
  validFrom: new Date(data.validFrom),
});
