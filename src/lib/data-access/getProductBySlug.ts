import wixClientServer from "../wixClientServer";

export default async function getProductBySlug(slug: string) {
  const wixClient = wixClientServer();

  const product = await wixClient.products
    .queryProducts()
    .eq("slug", slug)
    .find();

  return product.items[0];
}
