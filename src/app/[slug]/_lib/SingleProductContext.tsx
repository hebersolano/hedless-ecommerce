"use client";

import { products } from "@wix/stores";
import { createContext, ReactNode, useState } from "react";
import { getSelectedVariant, getUserProductOptions } from "./helpers";

export const SingleProductContext = createContext<any>({});

export function SingleProductProvider({
  children,
  product,
}: {
  children: ReactNode;
  product: products.Product;
}) {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const selectedVariant = getSelectedVariant(
    selectedOptions,
    product.variants!,
  );

  const { colorOptions, sizeOptions } = getUserProductOptions(
    product.productOptions!,
    product.variants!,
    selectedOptions,
  );

  return (
    <SingleProductContext.Provider
      value={{
        selectedOptions,
        setSelectedOptions,
        colorOptions,
        sizeOptions,
        selectedVariant,
      }}
    >
      {children}
    </SingleProductContext.Provider>
  );
}
