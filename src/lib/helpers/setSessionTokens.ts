import type { Tokens } from "@wix/sdk";
import Cookies from "js-cookie";

export function setSessionTokens(tokens: Tokens) {
  const expires = new Date(new Date().getTime() + 4 * 60 * 60 * 1000); // hours
  // token.accessToken expires in 4 hours after creation

  Cookies.set("session", JSON.stringify(tokens), {
    expires,
  });
}
