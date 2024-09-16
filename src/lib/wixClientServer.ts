import {
  createClient,
  OAuthStrategy,
  Tokens,
  type IOAuthStrategy,
  type WixClient,
} from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { members } from "@wix/members";

import { cookies } from "next/headers";

if (global?.wixClient === undefined) {
  global.wixClient = null;
}

export type wixClientT = WixClient<
  undefined,
  IOAuthStrategy,
  {
    products: typeof products;
    collections: typeof collections;
  }
>;

function getSessionTokens(): Tokens | undefined {
  const cookieStore = cookies();
  const userTokens = cookieStore.get("session");

  if (!userTokens?.value) return undefined;
  return JSON.parse(userTokens.value) as Tokens;
}

export function getWixClient() {
  if (!global.wixClient) global.wixClient = wixClientServer();

  let userTokens = getSessionTokens();
  if (!userTokens) return global.wixClient;

  return wixClientServer(userTokens);
}

export function wixClientServer(userTokens?: Tokens) {
  console.log("creating wix client");
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
