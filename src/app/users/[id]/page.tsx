import { getUserById } from "@/api/users";
import { getUsersAddressesByUserId } from "@/api/users-addresses";
import { PageHeader } from "@/components/common/PageHeader";
import { formatFullname, paginationOrDefault, shouldBeNumber } from "@/utils";
import { CreateUserAddreesButtonWithTheme } from "./CreateUserAddreesButton";
import { UsersAddressesTableWithTheme } from "./UsersAddressesTable";
import { Suspense } from "react";
import { Skeleton } from "antd";

type PageParams = {
  searchParams: {
    page: string;
    pageSize: string;
  };
  params: {
    id: string;
  };
};

export default async function UsersAddresses({
  searchParams,
  params,
}: PageParams) {
  const param = await params;
  const paginationParams = paginationOrDefault(await searchParams);
  const userId = shouldBeNumber(param.id);

  const user = await getUserById(userId);
  const { data: usersAddresses, ...pagination } =
    await getUsersAddressesByUserId(userId, paginationParams);

  return (
    <>
      <PageHeader
        title={formatFullname(user)}
        name="List of user's addresses"
      />
      <CreateUserAddreesButtonWithTheme userId={userId} />
      <Suspense
        key={`user-addresses-${paginationParams.page}-${paginationParams.pageSize}`}
        fallback={<Skeleton />}
      >
        <UsersAddressesTableWithTheme
          dataSource={usersAddresses}
          pagination={pagination}
        />
      </Suspense>
    </>
  );
}
