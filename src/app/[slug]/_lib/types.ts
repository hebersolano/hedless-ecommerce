import type { products } from "@wix/stores";

export type selectedVariant = products.Variant & {
  media: products.Media | undefined;
};

export type ObjectT = {
  [key: string]: string | number;
};
