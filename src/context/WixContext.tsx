"use client";

import { createClient, OAuthStrategy, TokenRole, Tokens } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { members } from "@wix/members";
import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";

function getSessionTokens(): Tokens | undefined {
  const userTokens = Cookies.get("session");

  if (!userTokens) return undefined;
  return JSON.parse(userTokens) as Tokens;
}

function createWixClient() {
  console.log("creating client, wix client");
  let userTokens = getSessionTokens();

  const wixClient = createClient({
    modules: {
      products,
      collections,
      members,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: userTokens,
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
