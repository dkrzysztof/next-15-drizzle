import { getUserById } from "@/api/users";
import { getUsersAddressesByUserId } from "@/api/users-addresses";
import { PageHeader } from "@/ui/atoms/PageHeader";
import { formatFullname, paginationOrDefault, shouldBeNumber } from "@/utils";
import { CreateUserAddressButton } from "./CreateUserAddressButton";
import { UsersAddressesTable } from "@/ui/organisms/UsersAddressesTable";
import { Suspense } from "react";
import { Col, Row, Skeleton } from "antd";

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
  const userId = shouldBeNumber(param.id);
  const paginationRequest = paginationOrDefault(await searchParams);

  const user = await getUserById(userId);
  const { data: usersAddresses, ...paginationResponse } =
    await getUsersAddressesByUserId(userId, paginationRequest);

  return (
    <>
      <PageHeader
        title={formatFullname(user)}
        name="List of user's addresses"
        backLink="/users"
        backLinkName="Users list"
      />
      <Row className="mb-3 w-full">
        <Col className="ml-auto">
          <CreateUserAddressButton userId={userId} />
        </Col>
      </Row>
      <Suspense
        key={
          "users-addresses" +
          paginationResponse.page +
          "-" +
          paginationResponse.pageSize
        }
        fallback={<Skeleton />}
      >
        <UsersAddressesTable
          dataSource={usersAddresses}
          pagination={paginationResponse}
        />
      </Suspense>
    </>
  );
}
