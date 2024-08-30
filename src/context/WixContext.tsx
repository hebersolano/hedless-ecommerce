"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";

function createWixClient() {
  const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");

  const wixClient = createClient({
    modules: {
      products,
      collections,
      //currentCart
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        accessToken: {
          value: "",
          expiresAt: 0,
        },
        refreshToken,
      },
    }),
  });
}

const wixClient = createWixClient();

export type WixClientT = typeof wixClient;

export const wixClientContext = createContext<WixClientT>(wixClient);

export function WixClientProvider({ children }: { children: ReactNode }) {
  return (
    <wixClientContext.Provider value={wixClient}>
      {children}
    </wixClientContext.Provider>
  );
}
