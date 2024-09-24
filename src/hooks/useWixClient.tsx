"use client";

import { wixClientContext } from "@/context/WixContext";
import { useContext } from "react";

export default function useWixClient() {
  const wixClient = useContext(wixClientContext);
  return wixClient;
}
