"use client";

import { useEffect, useState } from "react";
import useSingleProduct from "./useSingleProduct";
import { getVariantStock, isVariantInStock } from "./helpers";
import useWixClient from "@/hooks/useWixClient";

type AddProps = {
  productId: string;
};

function Add({ productId }: AddProps) {
  const wixClient = useWixClient();
  const { selectedVariant, setSelectedOptions, selectedOptions } =
    useSingleProduct();
  const [quantity, setQuantity] = useState(1);

  const { inStock, trackStock, stock } = getVariantStock(selectedVariant);
  console.log(trackStock, stock);

  useEffect(
    function () {
      setQuantity((prev) => (prev > stock ? stock : prev));
    },
    [stock],
  );

  function updateQuantityHandler(operator: "+" | "-") {
    setQuantity((prev) => {
      if (operator === "+") {
        if (prev >= stock) return stock;
        return prev + 1;
      }
      if (operator === "-") {
        if (prev - 1 === 0) return 1;
        return prev - 1;
      } else return 1;
    });
  }

  async function addButtonHandler(quantity: number) {
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_APP_ID!,
            catalogItemId: productId,
            ...(selectedVariant.hasVariants && {
              options: { variantId: selectedVariant._id! },
            }),
          },
          quantity,
        },
      ],
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <h4>Choose a Quantity</h4>
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center">
          <button
            onClick={() => updateQuantityHandler("-")}
            disabled={!inStock}
            className={
              "cursor-pointe rounded-l-full border-r border-background bg-muted px-3 py-1 hover:bg-primary hover:text-primary-foreground" +
              `${quantity - 1 === 0 ? "cursor-not-allowed hover:bg-muted" : ""}`
            }
          >
            -
          </button>
          <span className="bg-muted px-3 py-1">{quantity}</span>
          <button
            onClick={() => updateQuantityHandler("+")}
            disabled={!inStock || quantity === stock}
            className="cursor-pointer rounded-r-full border-l border-background bg-muted px-3 py-1 hover:bg-primary hover:text-primary-foreground"
          >
            +
          </button>
        </div>
        {trackStock && stock > 0 && (
          <p className="text-xs">
            Only{" "}
            <span className="font-semibold text-primary">{stock} items</span>{" "}
            left!
            <br /> Don&apos;t miss it
          </p>
        )}
        {trackStock && stock < 1 && (
          <p className="text-xs">
            <span className="font-semibold">
              {Object.entries(selectedOptions)
                .map(([key, value]) => key + ": " + value)
                .join(", ")}
            </span>
            <br />
            Unfortunately, this variant is currently out of stock. Please select
            another option.
          </p>
        )}
      </div>
      <button
        onClick={addButtonHandler.bind(null, quantity)}
        className="mt-10 w-36 rounded-3xl px-4 py-2 text-sm text-primary ring-1 ring-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:bg-primary/40 disabled:text-primary-foreground"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Add;
