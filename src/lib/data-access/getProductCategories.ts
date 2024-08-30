import wixClientServer from "../wixClientServer";

export default async function getProductCategories() {
  const wixClient = wixClientServer();

  const categories = await wixClient.collections.queryCollections().find();

  return categories;
}
