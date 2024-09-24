import { members } from "@wix/members";
import useSWR from "swr";
import useWixClient from "./useWixClient";

export function useUserOrders(userContactId: string) {
  const wixClient = useWixClient();
  const promise = wixClient.orders.searchOrders({
    search: { filter: { "buyerInfo.contactId": { $eq: userContactId } } },
  });

  const res = useSWR("order-data", async () => await promise);

  return res;
}
