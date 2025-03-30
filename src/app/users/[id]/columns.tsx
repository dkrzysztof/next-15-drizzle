import { AddressTypeTag } from "@/components/users/AddressTypeTag";
import { UserAddressAddressType } from "@/db/schema";
import { formatTimestamp } from "@/utils";

export const USERS_ADDRESSES_COLUMNS = [
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
];
