import { db } from "../db";
import { Paginated, Pagination } from "./types";
import { SelectUser, usersTable } from "../db/schema";
import { asc, count, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { firstOrNull } from "@/utils";

export const getAllUsers = async ({
  page,
  pageSize,
}: Pagination): Promise<Paginated<SelectUser>> => {
  const { total } = (await db
    .select({
      total: count(),
    })
    .from(usersTable)
    .then(firstOrNull)!) ?? { total: 0 };

  const maxPage = Math.ceil(total / pageSize);
  const safePage = Math.max(1, Math.min(page, maxPage));

  const data = await db
    .select()
    .from(usersTable)
    .orderBy(asc(usersTable.id))
    .limit(pageSize)
    .offset((safePage - 1) * pageSize);

  return {
    data,
    total,
    page,
    pageSize,
  };
};

export const getUserById = async (
  id: SelectUser["id"],
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
