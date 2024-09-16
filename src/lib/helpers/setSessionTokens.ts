import type { Tokens } from "@wix/sdk";
import Cookies from "js-cookie";

const expires = new Date(new Date().getTime() + 4 * 60 * 60 * 1000); // hours
// token.accessToken expires in 4 hours after creation

export function setSessionTokens(tokens: Tokens) {
  Cookies.set("session", JSON.stringify(tokens), {
    expires,
  });
}
