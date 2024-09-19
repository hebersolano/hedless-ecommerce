import { WixClientT } from "@/context/WixContext";
import type { currentCart } from "@wix/ecom";
import { create } from "zustand";

export type CartStore = {
  cart: currentCart.Cart & {
    subtotal?: {
      amount: string;
    };
  };
  isLoading: boolean;
  counter: number;
  getCart: (wixClient: WixClientT) => void;
  addItem: (
    wixClient: WixClientT,
    productId: string,
    variantId: string | boolean,
    quantity: number,
  ) => void;
  removeItem: (wixClient: WixClientT, itemId: string) => void;
};

export const useCartStore = create<CartStore>()((set) => ({
  cart: { lineItems: [] },
  isLoading: true,
  counter: 0,
  getCart: async (wixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      console.log("get cart", cart);
      set({ cart, isLoading: false, counter: cart.lineItems.length });
    } catch (error) {
      console.log("get cart error", error);
    }
  },
  addItem: async (wixClient, productId, variantId, quantity) => {
    set((state) => ({ ...state, isLoading: true }));

    const res = await wixClient.currentCart
      .addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              appId: process.env.NEXT_PUBLIC_APP_ID!,
              catalogItemId: productId,
              ...(variantId && {
                options: { variantId },
              }),
            },
            quantity,
          },
        ],
      })
      .catch((e) => console.log("add to cart error:", e));

    console.log("add cart res:", res);
    if (!res || !res?.cart) return;
    res.cart;
    set({
      cart: res.cart,
      isLoading: false,
      counter: res.cart.lineItems.length,
    });
  },
  removeItem: async (wixClient, itemId) => {
    set((state) => ({ ...state, isLoading: true }));

    const res = await wixClient.currentCart
      .removeLineItemsFromCurrentCart([itemId])
      .catch((e) => console.log("error removing item", e));

    console.log("res removing item", res);
    if (!res || !res?.cart) return;
    set({
      cart: res.cart,
      isLoading: false,
      counter: res.cart.lineItems.length,
    });
  },
}));
