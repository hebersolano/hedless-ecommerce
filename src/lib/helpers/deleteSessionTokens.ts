"use server";
import { cookies } from "next/headers";

export default async function deleteSessionTokens() {
  const cookieStore = cookies();
  cookieStore.delete("session");
}