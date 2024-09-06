import { products } from "@wix/stores";

export type searchParamsT = { [key: string]: string };

export type paginationT = {
  currentPage: number | undefined;
  totalPages: number | undefined;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};
