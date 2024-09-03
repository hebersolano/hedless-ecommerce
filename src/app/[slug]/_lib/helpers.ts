import { products } from "@wix/stores";
import { selectedVariant } from "./types";

export function getSelectedVariant(
  selectedOptions: { [key: string]: string },
  variants: products.Variant[],
  colorOptions: products.Choice[] | undefined,
): selectedVariant {
  // if there are not variants
  if (variants.length === 1) {
    return { ...variants[0], media: undefined };
  }

  const optionEntries = Object.entries(selectedOptions);

  const selectedVariant =
    optionEntries.length <= 1
      ? undefined
      : variants.find((variant) => {
          return optionEntries.every(
            ([key, value]) => variant.choices?.[key] === value,
          );
        });

  let media = colorOptions?.[0].media; //default media if there are variants
  if (colorOptions) {
    for (const colorOption of colorOptions) {
      if (colorOption.description === selectedOptions.Color)
        media = colorOption.media;
    }
  }

  return { ...selectedVariant, media };
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
      if (sizeOptions) {
        sizeOptions[sizeIndex].inStock = variant.stock?.inStock;
      }

      sizeIndex++;
    }
  }

  return { colorOptions, sizeOptions };
}
