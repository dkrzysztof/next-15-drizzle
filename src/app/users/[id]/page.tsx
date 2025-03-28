import { getUserById } from "@/api/users";
import { PageHeader } from "@/components/common/PageHeader";
import { formatFullname, shouldBeNumber } from "@/utils";

type PageParams = {
  params: {
    id: string;
  };
};

export default async function UsersAddresses({ params }: PageParams) {
  const param = await params;
  const userId = shouldBeNumber(param.id)

  const user = await getUserById(userId)

  return (
    <>
      <PageHeader title={formatFullname(user)} name="List of user's addresses"/>
    </>
  );
}
