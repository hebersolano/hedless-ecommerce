import getProductsByCategory from "@/lib/data-access/getProductsByCategory";
import getShortDescription from "@/lib/getShortDescription";
import { searchParamsT } from "@/lib/types";
import { type products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import Pagination from "./Pagination";

async function ProductList({
  categoryId,
  limit,
  searchParams = {},
}: {
  categoryId: string;
  limit?: number;
  searchParams?: searchParamsT;
}) {
  const { products, pagination } = await getProductsByCategory({
    categoryId,
    limit,
    searchParams,
  });

  console.log(products);

  return (
    <>
      <div className="mt-12 flex flex-wrap justify-between gap-x-8 gap-y-16">
        {products.items.map((product) => (
          <ProductListItem key={product._id} product={product} />
        ))}
      </div>
      {<Pagination pagination={pagination} searchParams={searchParams} />}
    </>
  );
}

export default ProductList;

function ProductListItem({ product }: { product: products.Product }) {
  if (product === undefined) return null;

  const shortDescription = getShortDescription(product);

  return (
    <Link
      href={"/" + product.slug}
      className="flex w-full flex-col gap-4 sm:w-[45%] lg:w-[22%]"
    >
      <div className="relative h-80 w-full">
        <Image
          src={product.media?.mainMedia?.image?.url || "/product.png"}
          alt={
            product.media?.mainMedia?.image?.altText ||
            "product image alt not available"
          }
          fill
          sizes="25vw"
          className="absolute z-10 rounded-md object-cover transition-opacity ease-in hover:opacity-0"
        />
        {product.media?.items?.[1] && (
          <Image
            src={product.media.items[1].image?.url || "/product.png"}
            alt={
              product.media.items[1].image?.altText ||
              "product image alt not available"
            }
            fill
            sizes="25vw"
            className="absolute rounded-md object-cover"
          />
        )}
      </div>
      <div className="flex justify-between">
        <span className="font-medium">{product.name}</span>
        <span className="font-semibold">
          {product.priceData?.formatted?.price}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{shortDescription}</p>

      <button className="w-max rounded-2xl px-4 py-2 text-xs text-primary ring-1 ring-primary hover:bg-primary hover:text-primary-foreground">
        Add to Cart
      </button>
    </Link>
  );
}
