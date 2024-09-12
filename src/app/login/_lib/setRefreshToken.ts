"use server";
import type { RefreshToken, Token } from "@wix/sdk";
import { cookies } from "next/headers";

export async function setRefreshToken(token: Token["value"]) {
  console.log(token, "token");
  const cookieStore = cookies();
  cookieStore.set("refreshToken", JSON.stringify(token));
}
