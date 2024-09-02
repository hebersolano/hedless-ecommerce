"use client";

import Add from "@/components/Add";
import { products } from "@wix/stores";
import useSingleProduct from "./useSingleProduct";
import CustomizeProducts from "./CustomizeProducts";
function SingleProductInfo({
  product,
  isProductVariants,
}: {
  product: products.Product;
  isProductVariants: boolean | undefined;
}) {
  const context = useSingleProduct();
  console.log("from single product context:", context);

  return (
    <>
      <h1 className="text-4xl font-medium">{product.name}</h1>
      <p className="text-muted-foreground">{product.description}</p>

      <div className="bg h-[2px] bg-secondary" />

      <div className="flex items-center gap-4">
        {product.priceData?.price !== product.priceData?.discountedPrice && (
          <h3 className="text-xl text-muted-foreground">
            {product.priceData?.formatted?.discountedPrice}
          </h3>
        )}
        <h2 className="text-2xl font-medium">
          {product.priceData?.formatted?.price}
        </h2>
      </div>
      <div className="bg h-[2px] bg-secondary" />

      {isProductVariants && <CustomizeProducts />}
      <Add />
    </>
  );
}

export default SingleProductInfo;
