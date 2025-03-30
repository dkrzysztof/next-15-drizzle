import { db } from "@/db";
import {
  SelectUser,
  SelectUserAddress,
  UserAddressAddressType,
  UserAddressGroupedPrimaryKey,
} from "@/db/schema";
import { USERS_ADDRESS_SELECT_OBJECT } from "@/db/select";
import { and, eq, count } from "drizzle-orm";
import { notFound } from "next/navigation";
import { usersAddresses } from "../../drizzle/schema";
import { Paginated, Pagination, ServerActionResult } from "./types";
import { getUserById } from "./users";
import { firstOrNull } from "@/utils";

export type AddUserAddressType = {
  userId: SelectUser["id"];
  addressType: UserAddressAddressType;
  validFrom: Date;
  postCode: string;
  city: string;
  countryCode: string;
  street: string;
  buildingNumber: string;
};

export const addUserAddressToUser = async (
  data: AddUserAddressType
): Promise<void> => {
  const user = getUserById(data.userId);

  if (!user) {
    notFound();
  }

  const userAddress = await getUserAddressByGroupedId({
    addressType: data.addressType,
    userId: data.userId,
    validFrom: data.validFrom,
  });

  if (userAddress) {
    throw new Error(
      "User address with given address type and valid from date already exist!"
    );
  }

  await db.insert(usersAddresses).values(data);
};

export const getUserAddressByGroupedId = async ({
  userId,
  addressType,
  validFrom,
}: UserAddressGroupedPrimaryKey): Promise<SelectUserAddress | null> => {
  return db
    .select()
    .from(usersAddresses)
    .where(
      and(
        eq(usersAddresses.userId, userId),
        eq(usersAddresses.addressType, addressType),
        eq(usersAddresses.validFrom, validFrom)
      )
    )
    .limit(1)
    .then(firstOrNull);
};

export const getUsersAddressesByUserId = async (
  userId: SelectUser["id"],
  { page, pageSize }: Pagination
): Promise<Paginated<SelectUserAddress>> => {
  const data = await db
    .select(USERS_ADDRESS_SELECT_OBJECT)
    .from(usersAddresses)
    .orderBy(
      usersAddresses.validFrom,
      usersAddresses.countryCode,
      usersAddresses.city,
      usersAddresses.street,
      usersAddresses.buildingNumber
    )
    .where(eq(usersAddresses.userId, userId))
    .offset((page - 1) * pageSize)
    .limit(pageSize);

  const { total } = (await db
    .select({
      total: count(),
    })
    .from(usersAddresses)
    .where(eq(usersAddresses.userId, userId))
    .then(firstOrNull)!) ?? { total: 0 };

  return {
    data,
    total,
    page,
    pageSize,
  };
};
