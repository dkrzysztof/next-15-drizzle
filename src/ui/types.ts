import { SelectUser } from "@/db/schema";
import dayjs from "dayjs";
import { UserAddressAddressType } from "../../drizzle/schema";

export type UserAddressFormValues = {
  userId?: SelectUser["id"];
  addressType?: UserAddressAddressType;
  validFrom?: string;
  validFromPreview?: dayjs.Dayjs;
  street?: string;
  buildingNumber?: string;
  postCode?: string;
  countryCode?: string;
  city?: string;
};

export type UserAddressExportedFormValues = Omit<
  UserAddressFormValues,
  "validFrom" | "validFromPreview"
> & {
  validFrom?: string;
};
