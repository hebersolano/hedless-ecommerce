"use client";

import { createClient, OAuthStrategy, TokenRole } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { members } from "@wix/members";
import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";

function createWixClient() {
  console.log("creating client, wix client");
  const refreshToken = Cookies.get("refreshToken") || "";

  const wixClient = createClient({
    modules: {
      products,
      collections,
      members,
      //currentCart
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        accessToken: {
          value: "",
          expiresAt: 0,
        },
        refreshToken: {
          value: refreshToken,
          role: TokenRole.MEMBER,
        },
      },
    }),
  });

  return wixClient;
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
