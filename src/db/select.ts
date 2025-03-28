import { usersAddresses } from "../../drizzle/schema";

export const USERS_ADDRESS_SELECT_OBJECT = {
  userId: usersAddresses.userId,
  addressType: usersAddresses.addressType,
  postCode: usersAddresses.postCode,
  city: usersAddresses.city,
  countryCode: usersAddresses.countryCode,
  street: usersAddresses.street,
  buildingNumber: usersAddresses.buildingNumber,
};
