import type { Tokens } from "@wix/sdk";
import Cookies from "js-cookie";

export function setSessionTokens(tokens: Tokens) {
  Cookies.set("session", JSON.stringify(tokens));
}
