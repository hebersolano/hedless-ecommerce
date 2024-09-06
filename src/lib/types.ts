import { products } from "@wix/stores";

export type searchParamsT = { [key: string]: string | undefined };

export type paginationT = {
  currentPage: number | undefined;
  totalPages: number | undefined;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};
