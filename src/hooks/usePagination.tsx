"use client";
import { PaginationResponse } from "@/api/types";
import { TablePaginationConfig } from "antd";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type UsePagination = {
  onPaginationChange: (config: TablePaginationConfig) => void;
  pagination: Pick<TablePaginationConfig, "current" | "pageSize" | "total">;
};

export const usePagination = (
  pagination: PaginationResponse
): UsePagination => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const onPaginationChange = ({ pageSize, current }: TablePaginationConfig) => {
    const params = new URLSearchParams(searchParams);
    if (pageSize) {
      params.set("pageSize", pageSize.toString());
    }
    if (current) {
      params.set("page", current.toString());
    }
    push(`${pathname}?${params.toString()}`);
  };

  return {
    onPaginationChange,
    pagination: {
      current: pagination.page,
      pageSize: pagination.pageSize,
      total: pagination.total,
    },
  };
};
