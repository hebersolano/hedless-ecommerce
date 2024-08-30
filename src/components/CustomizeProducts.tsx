"use client";

import { type products } from "@wix/stores";
import { useState } from "react";

function CustomizeProducts({
  productId,
  variants,
  productOptions,
}: {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}) {
  const [selected, setSelected] = useState({ Color: "", Tamaño: "" });
  const selectedVariant = variants.find(
    (variant) => JSON.stringify(variant.choices) === JSON.stringify(selected),
  );
  const isInStock = selectedVariant?.stock?.inStock;

  const optionColors = productOptions.find(
    (option) => option.name === "Color",
  )?.choices;
  const optionSize = productOptions.find(
    (option) => option.name === "Tamaño",
  )?.choices;

  let colorIndex = 0;
  let sizeIndex = 0;
  for (const variant of variants) {
    const choices = variant.choices!;
    if (choices.Tamaño === selected!.Tamaño) {
      if (optionColors)
        optionColors[colorIndex].inStock = variant.stock?.inStock;

      colorIndex++;
    }
    if (choices.Color === selected!.Color) {
      if (optionSize) optionSize[sizeIndex].inStock = variant.stock?.inStock;

      sizeIndex++;
    }
  }

  console.log("size options", optionSize);
  console.log("color options", optionColors);

  return (
    <div className="flex flex-col gap-6">
      {optionColors && (
        <>
          <h4 className="font-medium">Choose a color</h4>
          <ul className="flex items-center gap-3">
            {optionColors.map((choice) => (
              <li
                onClick={() =>
                  setSelected((prev) => ({
                    ...prev,
                    Color: choice.description!,
                  }))
                }
                key={choice.description}
                style={{ backgroundColor: choice.value }}
                className="relative h-8 w-8 cursor-pointer rounded-full ring-1 ring-muted-foreground"
              >
                <>
                  {!choice.inStock && (
                    <div className="absolute left-1/2 top-1/2 h-[3px] w-10 -translate-x-1/2 -translate-y-1/2 rotate-45 transform rounded-full bg-red-400" />
                  )}
                  {selected?.Color === choice.description && (
                    <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full ring-2" />
                  )}
                </>
              </li>
            ))}
            {/* <li className="relative h-8 w-8 cursor-pointer rounded-full bg-destructive ring-1 ring-muted-foreground">
            <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full ring-2" />
          </li>
          <li className="relative h-8 w-8 cursor-pointer rounded-full bg-blue-500 ring-1 ring-muted-foreground"></li>
          <li className="relative h-8 w-8 cursor-pointer rounded-full bg-green-500 ring-1 ring-muted-foreground">
            <div className="absolute left-1/2 top-1/2 h-[3px] w-10 -translate-x-1/2 -translate-y-1/2 rotate-45 transform rounded-full bg-red-400" />
          </li> */}
          </ul>
        </>
      )}

      {optionSize && (
        <>
          <h4 className="font-medium">Choose a size</h4>
          <ul className="flex items-center gap-3">
            {optionSize.map((choice) => {
              const active =
                selected?.Tamaño === choice.description && choice.inStock;
              return (
                <li
                  onClick={() =>
                    setSelected((prev) => ({
                      ...prev,
                      Tamaño: choice.description!,
                    }))
                  }
                  key={choice.description}
                  className={`cursor-pointer rounded-md px-4 py-1 text-sm text-primary ring-1 ring-primary ${active && "bg-primary text-primary-foreground"} ${!choice.inStock && "bg-primary/40 text-primary-foreground line-through"}`}
                >
                  {choice.description}
                </li>
              );
            })}
            {/* <li className="cursor-pointer rounded-md px-4 py-1 text-sm text-primary ring-1 ring-primary">
            Small
          </li>
          <li className="cursor-pointer rounded-md bg-lama px-4 py-1 text-sm text-primary-foreground ring-1 ring-primary">
            Medium
          </li>
          <li className="cursor-not-allowed rounded-md bg-primary/40 px-4 py-1 text-sm text-primary-foreground ring-1 ring-primary/40">
            Big
          </li> */}
          </ul>
        </>
      )}
    </div>
  );
}

export default CustomizeProducts;
