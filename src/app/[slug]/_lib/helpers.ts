import { products } from "@wix/stores";

export function getSelectedVariant(
  selectedOptions: { [key: string]: string },
  variants: products.Variant[],
) {
  const entries = Object.entries(selectedOptions);
  const selectedVariant =
    entries.length <= 1
      ? undefined
      : variants.find((variant) => {
          return entries.every(
            ([key, value]) => variant.choices?.[key] === value,
          );
        });

  return selectedVariant;
}

export function getUserProductOptions(
  productOptions: products.ProductOption[],
  variants: products.Variant[],
  selectedOptions: { [key: string]: string },
) {
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

  return { colorOptions, sizeOptions };
}
