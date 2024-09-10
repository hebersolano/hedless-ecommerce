import { WixClientT } from "@/context/WixContext";
import type { OauthData } from "@wix/sdk";

const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI!;
const LOGIN_URI = process.env.NEXT_PUBLIC_LOGIN_URI!;

export function getOAuthData(wixClient: WixClientT): OauthData {
  const localOAuthData = localStorage.getItem("oauth-data");
  if (localOAuthData) return JSON.parse(localOAuthData);

  const oauthData = wixClient.auth.generateOAuthData(REDIRECT_URI, LOGIN_URI);
  localStorage.setItem("oauth-data", JSON.stringify(oauthData));
  return oauthData;
}

export async function getOAuthURL(wixClient: WixClientT) {
  const oauthData = getOAuthData(wixClient);
  const { authUrl } = await wixClient.auth.getAuthUrl(oauthData);
  return authUrl;
}
