import wixClientServer from "../wixClientServer";

export default async function getProductsByCategory({
  categoryId,
  limit = 0,
}: {
  categoryId: string;
  limit?: number;
}) {
  if (!categoryId) throw Error("categoryId is required");

  let query;

  const wixClient = wixClientServer();
  query = wixClient.products.queryProducts().eq("collectionIds", categoryId);

  if (limit) query.limit(limit);

  const products = await query.find();

  return products;
}
