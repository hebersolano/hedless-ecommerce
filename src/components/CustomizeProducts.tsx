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
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const entries = Object.entries(selectedOptions);
  const selectedVariant = variants.find((variant) => {
    return entries.every(([key, value]) => variant.choices?.[key] === value);
  });
  console.log("selected variant", selectedVariant);
  const isInStock = selectedVariant?.stock?.inStock;

  const colorOptions = productOptions.find(
    (option) => option.name === "Color",
  )?.choices;
  const sizeOptions = productOptions.find(
    (option) => option.name === "Tamaño",
  )?.choices;

  let colorIndex = 0;
  let sizeIndex = 0;
  for (const variant of variants) {
    const choices = variant.choices!;
    if (choices.Tamaño === selectedOptions!.Tamaño) {
      if (colorOptions)
        colorOptions[colorIndex].inStock = variant.stock?.inStock;

      colorIndex++;
    }
    if (choices.Color === selectedOptions!.Color) {
      if (sizeOptions) sizeOptions[sizeIndex].inStock = variant.stock?.inStock;

      sizeIndex++;
    }
  }

  console.log("size options", sizeOptions);
  console.log("color options", colorOptions);

  function handleSelection(optionType: string, choice: products.Choice) {
    // if (!choice.inStock) return;
    setSelectedOptions((prev) => ({
      ...prev,
      [optionType]: choice.description!,
    }));
  }

  return (
    <div className="flex flex-col gap-6">
      {colorOptions && (
        <>
          <h4 className="font-medium">Choose a color</h4>
          <ul className="flex items-center gap-3">
            {colorOptions.map((option) => (
              <li
                onClick={() => handleSelection("Color", option)}
                key={option.description}
                style={{
                  backgroundColor: option.value,
                  cursor: !option.inStock ? "not-allowed" : "pointer",
                  // pointerEvents: !option.inStock ? "none" : "auto",
                }}
                className="relative h-8 w-8 rounded-full ring-1 ring-muted-foreground"
              >
                <>
                  {!option.inStock && (
                    <div className="absolute left-1/2 top-1/2 h-[3px] w-10 -translate-x-1/2 -translate-y-1/2 rotate-45 transform rounded-full bg-red-400" />
                  )}
                  {selectedOptions?.Color === option.description &&
                    option.inStock && (
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

      {sizeOptions && (
        <>
          <h4 className="font-medium">Choose a size</h4>
          <ul className="flex items-center gap-3">
            {sizeOptions.map((option) => {
              const active =
                selectedOptions?.Tamaño === option.description &&
                option.inStock;
              return (
                <li
                  onClick={() => handleSelection("Tamaño", option)}
                  key={option.description}
                  style={{
                    cursor: !option.inStock ? "not-allowed" : "pointer",
                    // pointerEvents: !option.inStock ? "none" : "auto",
                  }}
                  className={`rounded-md px-4 py-1 text-sm text-primary ring-1 ring-primary ${active && "bg-primary text-primary-foreground"} ${!option.inStock && "text-primary line-through"}`}
                >
                  {option.description}
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
