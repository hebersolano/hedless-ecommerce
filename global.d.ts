import { wixClientT } from "@/lib/wixClientServer";

declare global {
  var wixClient: undefined | null | wixClientT;
}

export {};
