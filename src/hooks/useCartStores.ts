import { WixClientT } from "@/context/WixContext";
import type { currentCart } from "@wix/ecom";
import { create } from "zustand";

export type CartStore = {
  cart: currentCart.Cart & {
    subtotal?: {
      amount: string;
    };
  };
  isLoadingCart: boolean;
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
  isLoadingCart: true,
  counter: 0,

  getCart: async (wixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      console.log("get cart", cart);
      set({ cart, isLoadingCart: false, counter: cart.lineItems.length });
    } catch (error) {
      set((state) => ({ ...state, isLoadingCart: false }));
    }
  },

  addItem: async (wixClient, productId, variantId, quantity) => {
    try {
      set((state) => ({ ...state, isLoadingCart: true }));

      const res = await wixClient.currentCart.addToCurrentCart({
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
      });

      console.log("add cart res:", res);
      if (!res || !res?.cart) throw new Error("Error adding item to cart");

      set({
        cart: res.cart,
        isLoadingCart: false,
        counter: res.cart.lineItems.length,
      });
    } catch (error) {
      console.error("add item error", error);
      set((state) => ({ ...state, isLoadingCart: false }));
    }
  },

  removeItem: async (wixClient, itemId) => {
    try {
      set((state) => ({ ...state, isLoadingCart: true }));

      const res = await wixClient.currentCart.removeLineItemsFromCurrentCart([
        itemId,
      ]);

      console.log("res removing item", res);
      if (!res || !res?.cart) throw new Error("Error removing item from cart");

      set({
        cart: res.cart,
        isLoadingCart: false,
        counter: res.cart.lineItems.length,
      });
    } catch (error) {
      console.error("error removing item", error);
      set((state) => ({ ...state, isLoadingCart: false }));
    }
  },
}));
