"use client";

import { useCartStore } from "@/hooks/useCartStores";
import { currentCart } from "@wix/ecom";
import { media as wixMedia } from "@wix/sdk";
import Image from "next/image";

function CartItem({
  cartItem,
  onRemove,
}: {
  cartItem: currentCart.LineItem;
  onRemove: () => void;
}) {
  const { isLoadingCart } = useCartStore();
  const cartItemImg =
    (cartItem.image &&
      wixMedia.getScaledToFillImageUrl(cartItem.image, 72, 96, {})) ||
    "./public/product.png";

  return (
    <div className="flex gap-4">
      <Image
        src={cartItemImg}
        alt="product image preview"
        width={72}
        height={96}
        className="rounded-md object-cover"
      />
      <div className="flex w-full flex-col justify-between">
        {/* top */}
        <div className="">
          {/* title */}
          <div className="flex items-center justify-between gap-8">
            <h3 className="font-semibold">{cartItem.productName?.original}</h3>
            <p className="">
              <span className="rounded-sm px-2 text-sm text-muted-foreground">
                {cartItem.quantity} x
              </span>
              ${cartItem.price?.amount}
            </p>
          </div>
          {/* desc */}
          <div className="text-sm text-gray-500">
            {cartItem.availability?.status}
          </div>
        </div>

        {/* bottom */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Qty. {cartItem.quantity}</span>
          <button
            className="text-blue-500 hover:text-primary disabled:text-blue-300"
            onClick={onRemove}
            disabled={isLoadingCart}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
