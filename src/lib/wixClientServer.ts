import {
  createClient,
  OAuthStrategy,
  type IOAuthStrategy,
  type WixClient,
} from "@wix/sdk";
import { products, collections } from "@wix/stores";
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

export function getWixClient() {
  if (global.wixClient) {
    console.log("using cache wix client");
    return global.wixClient;
  }
  const wixClient = wixClientServer();
  global.wixClient = wixClient;
  return wixClient;
}

export function wixClientServer() {
  console.log("creating wix client");

  let refreshToken;

  try {
    const cookieStore = cookies();
    refreshToken = JSON.parse(cookieStore.get("refreshToken")?.value || "{}");
    console.log(refreshToken);
  } catch (error) {
    console.log("Error getting refresh token", error);
  }

  const wixClient = createClient({
    modules: {
      products,
      collections,
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

  return wixClient;
}
