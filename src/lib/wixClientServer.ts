import {
  createClient,
  OAuthStrategy,
  TokenRole,
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

function getRefreshToken() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken");
  if (!refreshToken || !refreshToken.value) return "";
  return refreshToken.value;
}

export function getWixClient() {
  // if (global.wixClient) {
  //   console.log("using cache wix client");
  //   const isLogged = global.wixClient.auth.loggedIn();
  //   console.log("server log", isLogged);
  //   return global.wixClient;
  // }
  const wixClient = wixClientServer();
  // global.wixClient = wixClient;
  const isLogged = wixClient.auth.loggedIn();
  console.log("server log", isLogged);
  return wixClient;
}

export function wixClientServer() {
  console.log("creating wix client");

  let refreshToken = getRefreshToken();

  const wixClient = createClient({
    modules: {
      products,
      collections,
      members,
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
