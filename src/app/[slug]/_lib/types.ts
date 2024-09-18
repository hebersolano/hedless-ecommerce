import type { products } from "@wix/stores";

export type selectedVariant = products.Variant & {
  media: products.Media | undefined;
  hasVariants: boolean;
};

export type ObjectT = {
  [key: string]: string | number;
};
