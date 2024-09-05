import { getWixClient } from "../wixClientServer";

export default async function getProductCategories() {
  const wixClient = getWixClient();

  const categories = await wixClient.collections.queryCollections().find();

  return categories;
}
