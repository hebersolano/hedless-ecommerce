"use client";
import { members } from "@wix/members";
import useSWR from "swr";
import useWixClient from "./useWixClient";

export function useCurrentMember() {
  const wixClient = useWixClient();
  const promise = wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });

  const res = useSWR("user-data", async () => await promise);
  return res;
}
