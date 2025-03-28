import { getAllUsers } from "@/api/users";
import { UsersTable } from "../../components/users/Table";
import { PageHeader } from "@/components/common/PageHeader";

type SearchPageProps = {
  searchParams: {
    page: number;
    pageSize: number;
  };
};

export default async function UsersPage({ searchParams }: SearchPageProps) {
  const { page = 1, pageSize = 5 } = await searchParams;
  const users = await getAllUsers({
    page,
    pageSize,
  });
  return (
    <>
      <PageHeader title="Users list" name="users in your database. Click on one to inspect user's addresses" />
      <UsersTable dataSource={users} />
    </>
  );
}
