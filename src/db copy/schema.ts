import { users, usersAddresses } from "../../drizzle/schema";

export const usersTable = users

export const usersAddressesTable = usersAddresses

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
export type InsertUserAddress = typeof usersAddressesTable.$inferInsert;
export type InsertUserAddressDateless = Omit<
  InsertUserAddress,
  "createdAt" | "updatedAt"
>;
export type UserAddressGroupedPrimaryKey = Pick<SelectUserAddress, "userId" | "addressType" | "validFrom">;
export type SelectUserAddress = typeof usersAddressesTable.$inferSelect;