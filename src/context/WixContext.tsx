"use client";

import { createClient, OAuthStrategy, Tokens } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { members } from "@wix/members";
import { currentCart } from "@wix/ecom";
import { redirects } from "@wix/redirects";

import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";
import { setSessionTokens } from "@/lib/helpers/setSessionTokens";

function getSessionTokens(): Tokens | undefined {
  const sessionTokens = Cookies.get("session");

  if (!sessionTokens) return undefined;
  return JSON.parse(sessionTokens) as Tokens;
}

function createWixClient() {
  console.log("creating client, wix client");
  let sessionTokens = getSessionTokens();

  const wixClient = createClient({
    modules: {
      products,
      collections,
      currentCart,
      members,
      redirects,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      // tokens: sessionTokens,
    }),
  });

  // add visitor tokens
  if (!sessionTokens)
    wixClient.auth.generateVisitorTokens().then((tokes) => {
      setSessionTokens(tokes);
      wixClient.auth.setTokens(tokes);
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
