"use client";
import { CartStore, useCartStore } from "@/hooks/useCartStores";
import useWixClient from "@/hooks/useWixClient";
import Image from "next/image";
import type { currentCart } from "@wix/ecom";
import { media as wixMedia } from "@wix/sdk";

function CartModal() {
  const wixClient = useWixClient();
  const { cart, removeItem, isLoading } = useCartStore();
  const cartItems = cart.lineItems || [];

  console.log(cart);

  return (
    <div className="absolute right-0 top-12 z-20 flex w-max flex-col gap-6 rounded-md bg-card p-4 shadow-modal">
      {cartItems.length < 1 ? (
        <div>Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-8">
            {cartItems.map((cartItem) => (
              <ProductCartItem
                key={cartItem._id}
                cartItem={cartItem}
                onRemove={removeItem.bind(null, wixClient, cartItem._id!)}
              />
            ))}
          </div>
          <div>
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              <span>${cart.subtotal?.amount}</span>
            </div>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipisicing.
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md px-4 py-3 ring-1 ring-gray-300">
                View Cart
              </button>
              <button className="rounded-md bg-black px-4 py-3 text-white">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartModal;

function ProductCartItem({
  cartItem,
  onRemove,
}: {
  cartItem: currentCart.LineItem;
  onRemove: () => void;
}) {
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
            <span className="rounded-sm bg-muted px-2">
              ${cartItem.price?.amount}
            </span>
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
            className="text-blue-500 hover:text-primary"
            onClick={onRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
