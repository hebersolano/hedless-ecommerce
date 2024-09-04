"use client";

import Add from "@/app/[slug]/_lib/Add";
import { products } from "@wix/stores";
import useSingleProduct from "./useSingleProduct";
import CustomizeProducts from "./CustomizeProducts";
function SingleProductInfo({
  product,
  isProductOptions,
}: {
  product: products.Product;
  isProductOptions: boolean | undefined;
}) {
  const { selectedVariant, selectedOptions } = useSingleProduct();
  const priceData = selectedVariant.variant?.priceData;
  const isDiscount = priceData?.price !== priceData?.discountedPrice;

  console.log("product:", product);
  console.log("selected variant:", selectedVariant);
  console.log("selected options:", selectedOptions);

  return (
    <>
      <h1 className="text-4xl font-medium">{product.name}</h1>
      <p className="text-muted-foreground">{product.description}</p>

      <div className="bg h-[2px] bg-secondary" />

      <div className="flex items-center gap-4">
        {isDiscount && (
          <h3 className="text-xl text-muted-foreground line-through">
            {priceData?.formatted?.price}
          </h3>
        )}

        <h2 className="text-2xl font-medium">
          {isDiscount
            ? priceData?.formatted?.discountedPrice
            : priceData?.formatted?.price}
        </h2>
      </div>
      <div className="bg h-[2px] bg-secondary" />

      {isProductOptions && <CustomizeProducts />}
      <Add />
    </>
  );
}

export default SingleProductInfo;
