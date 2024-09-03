"use client";

import { products } from "@wix/stores";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { getSelectedVariant, getUserProductOptions } from "./helpers";
import { selectedVariant } from "./types";

type ObjectT = {
  [key: string]: string;
};

type SingleProductContextT = {
  selectedOptions: ObjectT;
  setSelectedOptions: Dispatch<SetStateAction<ObjectT>>;
  colorOptions: products.Choice[] | undefined;
  sizeOptions: products.Choice[] | undefined;
  selectedVariant: selectedVariant;
};
export const SingleProductContext = createContext<SingleProductContextT | null>(
  null,
);

export function SingleProductProvider({
  children,
  product,
}: {
  children: ReactNode;
  product: products.Product;
}) {
  const [selectedOptions, setSelectedOptions] = useState<ObjectT>({});

  const { colorOptions, sizeOptions } = getUserProductOptions(
    product.productOptions!,
    product.variants!,
    selectedOptions,
  );

  const selectedVariant = getSelectedVariant(
    selectedOptions,
    product.variants!,
    colorOptions,
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
