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
  // if (global.wixClient) {
  //   console.log("using cache wix client");
  //   const isLogged = global.wixClient.auth.loggedIn();
  //   console.log("server log", isLogged);
  //   return global.wixClient;
  // }
  // global.wixClient = wixClient;
  const wixClient = wixClientServer();
  const isLogged = wixClient.auth.loggedIn();
  console.log("server log", isLogged);
  return wixClient;
}

export function wixClientServer() {
  console.log("creating wix client");

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
