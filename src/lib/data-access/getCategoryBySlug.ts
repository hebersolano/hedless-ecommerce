import wixClientServer from "../wixClientServer";

export default async function getCategoryBySlug(slug: string) {
  const wixClient = wixClientServer();

  const categories = await wixClient.collections.getCollectionBySlug(slug);

  return categories;
}
