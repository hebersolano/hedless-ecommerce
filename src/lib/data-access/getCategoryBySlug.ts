import { getWixClient } from "../wixClientServer";

export default async function getCategoryBySlug(slug: string) {
  const wixClient = getWixClient();

  const categories = await wixClient.collections.getCollectionBySlug(slug);

  return categories;
}
