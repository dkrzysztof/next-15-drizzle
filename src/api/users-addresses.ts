import { db } from "@/db";
import { SelectUser, SelectUserAddress } from "@/db/schema";
import { usersAddresses } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { USERS_ADDRESS_SELECT_OBJECT } from "@/db/select";

export const getUsersAddressesByUserId = async (
  userId: SelectUser["id"]
): Promise<SelectUserAddress[]> => {
  return db
    .select(USERS_ADDRESS_SELECT_OBJECT)
    .from(usersAddresses)
    .orderBy(
      usersAddresses.countryCode,
      usersAddresses.city,
      usersAddresses.street,
      usersAddresses.buildingNumber
    )
    .where(eq(usersAddresses.userId, userId));
};
