import { products } from "@wix/stores";
import { searchParamsT } from "../types";
import { getWixClient } from "../wixClientServer";

const PRODUCTS_PER_PAGE = Number(process.env.NEXT_PUBLIC_PRODUCTS_PER_PAGE);

type sortByT =
  | "name"
  | "_id"
  | "slug"
  | "productType"
  | "sku"
  | "price"
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
  const { name, type, min, max, sort } = searchParams;

  let query;
  const wixClient = getWixClient();

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
  const pagination = getProductsPagination(products);

  return { products, pagination };
}

function getProductsPagination(products: products.ProductsQueryResult) {
  return {
    currentPage: products.currentPage,
    totalPages: products.totalPages,
    hasNextPage: products.hasNext(),
    hasPrevPage: products.hasPrev(),
  };
}
