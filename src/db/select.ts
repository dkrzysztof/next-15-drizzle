import { sql } from "drizzle-orm";
import { UserAddressAddressType, usersAddresses } from "../../drizzle/schema";

export const USERS_ADDRESS_SELECT_OBJECT = {
  userId: usersAddresses.userId,
  addressType: sql<UserAddressAddressType>`${usersAddresses.addressType}`,
  postCode: usersAddresses.postCode,
  city: usersAddresses.city,
  countryCode: usersAddresses.countryCode,
  street: usersAddresses.street,
  buildingNumber: usersAddresses.buildingNumber,
  createdAt: usersAddresses.createdAt,
  updatedAt: usersAddresses.updatedAt,
  validFrom: usersAddresses.validFrom,
};
