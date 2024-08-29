import { equal } from "assert";
import wixClientServer from "../wixClientServer";

export default async function getProductsByCategory({
  categoryId,
  limit = 20,
}: {
  categoryId: string;
  limit?: number;
}) {
  if (!categoryId) throw Error("categoryId is required");

  const wixClient = wixClientServer();
  const products = await wixClient.products
    .queryProducts()
    .eq("collectionIds", categoryId)
    .limit(limit)
    .find();

  return products;
}
