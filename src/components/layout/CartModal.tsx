"use client";
import { useCartStore } from "@/hooks/useCartStores";
import useWixClient from "@/hooks/useWixClient";
import CartItem from "./CartItem";
import CartItemSkeleton from "./CartItemSkeleton";
import { currentCart } from "@wix/ecom";

const LOCAL_URL = process.env.NEXT_PUBLIC_URI || window.location.origin;
console.log(window.location.origin, "origin");

function CartModal() {
  const wixClient = useWixClient();
  const { cart, removeItem, isLoadingCart } = useCartStore();
  const cartItems = cart.lineItems || [];

  console.log(cart);

  async function handleCheckout() {
    try {
      const { checkoutId } =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });

      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId },
          callbacks: {
            postFlowUrl: LOCAL_URL + "/",
            thankYouPageUrl: LOCAL_URL + "/success",
          },
        });

      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (error) {
      console.error("checkout error", error);
    }
  }

  return (
    <div className="absolute right-0 top-12 z-20 flex w-max flex-col gap-4 rounded-md bg-card p-4 shadow-modal">
      {cartItems.length < 1 ? (
        <div>Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-8">
            {cartItems.map((cartItem) => {
              return isLoadingCart ? (
                <CartItemSkeleton key={cartItem._id} />
              ) : (
                <CartItem
                  key={cartItem._id}
                  cartItem={cartItem}
                  onRemove={removeItem.bind(null, wixClient, cartItem._id!)}
                />
              );
            })}
          </div>
          <div className="bg h-[2px] bg-secondary" />
          <div>
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              {isLoadingCart ? (
                <div className="h-4 w-12 animate-pulse rounded-md bg-gray-300"></div>
              ) : (
                <span>${cart.subtotal?.amount}</span>
              )}
            </div>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipisicing.
            </p>
            <div className="flex justify-between text-sm">
              <button
                disabled={isLoadingCart}
                className="rounded-md px-4 py-3 ring-1 ring-gray-300"
              >
                View Cart
              </button>
              <button
                onClick={handleCheckout}
                disabled={isLoadingCart}
                className="rounded-md bg-black px-4 py-3 text-white"
              >
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
