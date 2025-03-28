import { db } from "../db";
import { Pagination } from "./types";
import { SelectUser, usersTable } from "../db/schema";
import { asc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { firstOrNull } from "@/utils";

export const getAllUsers = async ({
  page,
  pageSize,
}: Pagination): Promise<SelectUser[]> => {
  return db
    .select()
    .from(usersTable)
    .orderBy(asc(usersTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
};

export const getUserById = async (
  id: SelectUser["id"]
): Promise<SelectUser> => {
  const user: SelectUser | null = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .limit(1)
    .then(firstOrNull);

  if (!user) {
    notFound();
  }

  return user;
};
