import { SelectUserAddress } from "@/db/schema";

export type Pagination = {
  page: number;
  pageSize: number;
};

export type PaginationResponse = Pagination & {
  total: number;
};

export type UserAddress = SelectUserAddress & {
  createdAt: string;
  updatedAt: string;
  userId: number;
  addressType: "HOME" | "INVOICE" | "POST" | "WORK";
  validFrom: string;
  postCode: string;
  city: string;
  countryCode: string;
  street: string;
  buildingNumber: string;
};

export type ServerActionResult = {
  isSuccess: boolean;
  message: string;
};

export type Paginated<T> = PaginationResponse & {
  data: T[];
};
