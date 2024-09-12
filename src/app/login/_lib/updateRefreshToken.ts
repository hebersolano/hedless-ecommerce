"use server";
import type { RefreshToken } from "@wix/sdk";
import { cookies } from "next/headers";

export async function updateRefreshToken(token: RefreshToken) {
  const cookieStore = cookies();
  cookieStore.set("refreshToken", String(token));
}
