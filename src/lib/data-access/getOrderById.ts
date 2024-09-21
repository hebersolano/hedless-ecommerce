import { getWixClient } from "../wixClientServer";

export default async function getOrderById(id: string) {
  try {
    const wixClient = getWixClient();
    const order = await wixClient.orders.getOrder(id);
    return order;
  } catch (error) {
    console.error("get order error", error);
    return undefined;
  }
}
