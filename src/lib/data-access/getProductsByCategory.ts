import { searchParamsT } from "../types";
import wixClientServer from "../wixClientServer";

const PRODUCTS_PER_PAGE = Number(process.env.NEXT_PUBLIC_PRODUCTS_PER_PAGE);

type sortByT =
  | "name"
  | "_id"
  | "slug"
  | "productType"
  | "sku"
  | "price"
  | "priceData.price"
  | "numericId"
  | "lastUpdated";

export default async function getProductsByCategory({
  categoryId,
  limit = 0,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams: searchParamsT;
}) {
  if (!categoryId) throw Error("categoryId is required");
  console.log(searchParams);
  const { name, type, min, max, sort } = searchParams;

  let query;
  const wixClient = wixClientServer();

  query = wixClient.products
    .queryProducts()
    .eq("collectionIds", categoryId)
    .startsWith("name", name || "")
    .hasSome("productType", type ? [type] : ["physical", "digital"])
    .gt("priceData.price", min || 0)
    .lt("priceData.price", max || 999999)
    .limit(limit || PRODUCTS_PER_PAGE);

  if (sort) {
    const [sortType, sortBy] = sort.split("-");
    if (sortType === "asc") query = query.ascending(sortBy as sortByT);
    if (sortType === "des") query = query.descending(sortBy as sortByT);
  }

  const products = await query.find();

  return products;
}
