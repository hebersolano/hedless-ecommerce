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
import { ObjectT, selectedVariant } from "./types";

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
  defaultOptions,
}: {
  children: ReactNode;
  product: products.Product;
  defaultOptions: ObjectT;
}) {
  const [selectedOptions, setSelectedOptions] =
    useState<ObjectT>(defaultOptions);

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

  console.log(sizeOptions);

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
