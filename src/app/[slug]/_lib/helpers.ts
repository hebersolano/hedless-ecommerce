import { products } from "@wix/stores";
import { ObjectT, selectedVariant } from "./types";

export function isVariantInStock(variant: products.Variant) {
  return Boolean(
    variant.stock?.trackQuantity
      ? variant.stock?.inStock &&
          variant.stock.quantity &&
          variant.stock.quantity > 0
      : variant.stock?.inStock,
  );
}

export function getVariantStock(variant: products.Variant) {
  const inStock = isVariantInStock(variant);
  const trackStock = Boolean(variant.stock?.trackQuantity);
  const stock = trackStock ? variant.stock?.quantity || 0 : Infinity;

  return { inStock, trackStock, stock };
}

export function hasProductOptions(product: products.Product) {
  return Boolean(product.productOptions && product.productOptions.length > 0);
}

export function getDefaultProductOptions(
  isProductOptions: boolean,
  product: products.Product,
) {
  if (!isProductOptions || product.variants?.length === 1) return {};

  const variantInStock = product.variants?.find((variant) =>
    isVariantInStock(variant),
  );

  return variantInStock?.choices || {};
}

export function getSelectedVariant(
  selectedOptions: ObjectT,
  variants: products.Variant[],
  colorOptions: products.Choice[] | undefined,
): selectedVariant {
  // if there are not variants
  if (variants.length === 1)
    return { ...variants[0], media: undefined, hasVariants: false };

  const optionEntries = Object.entries(selectedOptions);
  console.log(optionEntries);

  const selectedVariant =
    optionEntries.length < 1
      ? undefined
      : variants.find((variant) => {
          return optionEntries.every(
            ([key, value]) => variant.choices?.[key] === value,
          );
        });

  let media;
  if (colorOptions) {
    for (const colorOption of colorOptions) {
      if (colorOption.description === selectedOptions.Color)
        media = colorOption.media;
    }
  }

  return { ...selectedVariant, media, hasVariants: true };
}

export function getUserProductOptions(
  productOptions: products.ProductOption[],
  variants: products.Variant[],
  selectedOptions: ObjectT,
) {
  // if there are not variants
  // if (variants.length === 1)
  //   return { colorOptions: undefined, sizeOptions: undefined };

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
        colorOptions[colorIndex].inStock = isVariantInStock(variant);

      colorIndex++;
    }
    if (choices.Color === selectedOptions!.Color) {
      if (sizeOptions) {
        sizeOptions[sizeIndex].inStock = isVariantInStock(variant);
      }

      sizeIndex++;
    }
  }

  return { colorOptions, sizeOptions };
}
