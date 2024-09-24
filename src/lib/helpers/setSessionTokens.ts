import type { Tokens } from "@wix/sdk";
import Cookies from "js-cookie";

export function setSessionTokens(tokens: Tokens) {
  const stringTokens = JSON.stringify(tokens);
  const expires = new Date(new Date().getTime() + 4 * 60 * 60 * 1000); // token.accessToken expires in 4 hours after creation

  localStorage.setItem("sessionTokens", stringTokens);
  Cookies.set("session", stringTokens, {
    expires,
  });
}
