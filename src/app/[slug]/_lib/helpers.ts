import { products } from "@wix/stores";
import { selectedVariant } from "./types";

export function isVariantInStock(variant: products.Variant) {
  return Boolean(
    variant.stock?.trackQuantity
      ? variant.stock?.inStock && variant.stock.quantity
      : variant.stock?.inStock,
  );
}

export function hasProductVariants(product: products.Product) {
  return Boolean(
    product.variants &&
      product.variants.length > 1 &&
      product.productOptions &&
      product.productOptions.length > 0,
  );
}

export function getDefaultProductOptions(
  isProductVariants: boolean,
  product: products.Product,
) {
  if (!isProductVariants) return {};

  const variantInStock = product.variants?.find((variant) =>
    isVariantInStock(variant),
  );

  return variantInStock?.choices || {};
}

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
