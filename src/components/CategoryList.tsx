import getProductCategories from "@/lib/data-access/getProductCategories";
import { collections } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";

async function CategoryList() {
  const categories = await getProductCategories();

  return (
    <div className="scrollbar-hide overflow-scroll px-4">
      <div className="flex gap-4 md:gap-8">
        {categories.items.map((category) => (
          <CategoryListItem key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
}

export default CategoryList;

function CategoryListItem({ category }: { category: collections.Collection }) {
  return (
    <Link
      href={`list?cat=${category.slug}`}
      className="w-full flex-shrink-0 px-4 sm:w-1/2 lg:w-1/4 xl:w-1/6"
    >
      <div className="relative h-96 w-full bg-slate-100">
        <Image
          src={category.media?.mainMedia?.image?.url || "/category.png"}
          alt={
            category.media?.mainMedia?.image?.altText ||
            "category product image alt not available"
          }
          fill
          sizes="20vw"
          className="absolute object-cover"
        />
      </div>
      <h1 className="mt-8 text-clip font-light">{category.name}</h1>
    </Link>
  );
}
