"use client";

import { type products } from "@wix/stores";
import useSingleProduct from "./useSingleProduct";

function CustomizeProducts() {
  const { selectedOptions, setSelectedOptions, colorOptions, sizeOptions } =
    useSingleProduct();

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
          </ul>
        </>
      )}
    </div>
  );
}

export default CustomizeProducts;
