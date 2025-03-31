import { getAllUsers } from "@/api/users";
import { PageHeader } from "@/ui/atoms/PageHeader";
import { paginationOrDefault } from "@/utils";
import { Row, Skeleton } from "antd";
import { Suspense } from "react";
import { AddUserButton } from "./AddUserButton";
import { UsersTable } from "./UsersTable";

type SearchPageProps = {
  searchParams: {
    page: string;
    pageSize: string;
  };
};

export default async function UsersPage({ searchParams }: SearchPageProps) {
  const paginationRequest = paginationOrDefault(await searchParams);

  const { data: users, ...paginationResponse } = await getAllUsers(
    paginationRequest
  );

  return (
    <>
      <PageHeader
        title="Users list"
        name="users in your database. Click on one to inspect user's addresses"
      />
      <Suspense
        key={
          "users" + paginationResponse.page + "-" + paginationResponse.pageSize
        }
        fallback={<Skeleton />}
      >
        <Row className="w-full mb-3">
          <AddUserButton />
        </Row>
        <UsersTable
          dataSource={users}
          pagination={paginationResponse}
        />
      </Suspense>
    </>
  );
}
