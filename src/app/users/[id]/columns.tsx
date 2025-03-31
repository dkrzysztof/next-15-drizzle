import { AddressTypeTag } from "@/ui/atoms/AddressTypeTag";
import { SelectUserAddress } from "@/db/schema";
import { formatTimestamp } from "@/utils";
import { UsersAddressesContextMenu } from "./UsersAddressesContextMenu";
import { TableColumnType } from "antd";
import { UserAddressAddressType } from "../../../../drizzle/schema";

export const USERS_ADDRESSES_COLUMNS: TableColumnType<SelectUserAddress>[] = [
  {
    title: "Address type",
    dataIndex: "addressType",
    render: (type: UserAddressAddressType) => <AddressTypeTag type={type} />,
  },
  { title: "Valid from", dataIndex: "validFrom", render: formatTimestamp },
  { title: "Street", dataIndex: "street" },
  { title: "Building number", dataIndex: "buildingNumber" },
  { title: "Post code", dataIndex: "postCode" },
  { title: "City", dataIndex: "city" },
  { title: "Country code", dataIndex: "countryCode" },
  {
    title: "Actions",
    width: 30,
    align: "right",
    render: (usersAddress: SelectUserAddress) => (
      <UsersAddressesContextMenu usersAddress={usersAddress} />
    ),
  },
];
