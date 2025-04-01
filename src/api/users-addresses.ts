import {
  SelectUser,
  SelectUserAddress,
  UserAddressGroupedPrimaryKey,
} from "@/db/schema";
import { firstOrNull } from "@/utils";
import { and, count, eq } from "drizzle-orm";
import { db } from "@/db";
import { UserAddressAddressType, usersAddresses } from "../../drizzle/schema";
import { Paginated, Pagination, ServerActionResult } from "./types";

export type AddUserAddressType = {
  userId: SelectUser["id"];
  addressType: UserAddressAddressType;
  validFrom: string;
  postCode: string;
  city: string;
  countryCode: string;
  street: string;
  buildingNumber: string;
};

export const addUserAddressToUser = async (
  data: AddUserAddressType,
): Promise<ServerActionResult> => {
  const userAddress = await getUserAddressByGroupedId({
    addressType: data.addressType,
    userId: data.userId,
    validFrom: data.validFrom,
  });

  if (userAddress) {
    return {
      isSuccess: false,
      message:
        "User address with given address type and valid from date already exist!",
    };
  }

  await db.insert(usersAddresses).values(data);
  return {
    isSuccess: true,
    message: "New address was added!",
  };
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
        eq(usersAddresses.validFrom, validFrom),
      ),
    )
    .limit(1)
    .then(firstOrNull);
};

export const editUserAddressToUser = async ({
  userId,
  addressType,
  validFrom,
  ...data
}: AddUserAddressType): Promise<ServerActionResult> => {
  const userAddress = await getUserAddressByGroupedId({
    addressType,
    userId,
    validFrom,
  });

  if (!userAddress) {
    return {
      isSuccess: false,
      message: `User's address was not found`,
    };
  }

  await db
    .update(usersAddresses)
    .set(data)
    .where(
      and(
        eq(usersAddresses.userId, userId),
        eq(usersAddresses.addressType, addressType),
        eq(usersAddresses.validFrom, validFrom),
      ),
    );

  return {
    isSuccess: true,
    message: `Successfuly updated user's address`,
  };
};

export const getUsersAddressesByUserId = async (
  userId: SelectUser["id"],
  { page, pageSize }: Pagination,
): Promise<Paginated<SelectUserAddress>> => {
  const { total } = (await db
    .select({
      total: count(),
    })
    .from(usersAddresses)
    .where(eq(usersAddresses.userId, userId))
    .then(firstOrNull)!) ?? { total: 0 };

  const maxPage = Math.ceil(total / pageSize);
  const safePage = Math.max(1, Math.min(page, maxPage));

  const data = await db
    .select()
    .from(usersAddresses)
    .orderBy(
      usersAddresses.validFrom,
      usersAddresses.countryCode,
      usersAddresses.city,
      usersAddresses.street,
      usersAddresses.buildingNumber,
    )
    .where(eq(usersAddresses.userId, userId))
    .offset((safePage - 1) * pageSize)
    .limit(pageSize);

  return {
    data,
    total,
    page,
    pageSize,
  };
};

export const removeUserAddress = async ({
  userId,
  addressType,
  validFrom,
}: UserAddressGroupedPrimaryKey): Promise<ServerActionResult> => {
  const userAddress = await getUserAddressByGroupedId({
    addressType,
    userId,
    validFrom,
  });

  if (!userAddress) {
    return {
      isSuccess: false,
      message: `User's address was not found`,
    };
  }

  await db
    .delete(usersAddresses)
    .where(
      and(
        eq(usersAddresses.userId, userId),
        eq(usersAddresses.addressType, addressType),
        eq(usersAddresses.validFrom, validFrom),
      ),
    );

  return {
    isSuccess: true,
    message: `Successfuly removed user's address`,
  };
};
