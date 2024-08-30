import { Suspense, useEffect } from "react";

import CategoryList from "@/components/CategoryList";
import NewProductList from "@/components/NewProductList";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import wixClientServer from "@/lib/wixClientServer";
import Skeleton from "@/components/Skeleton";

async function HomePage() {
  // const wixClient = wixClientServer();
  // const res = await wixClient.products.queryProducts().find();
  // console.log(res);

  return (
    <div className="bg-background">
      <Slider />
      <section className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </section>
      <section className="mt-24">
        <h1 className="mb-12 px-4 text-2xl md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          Categories
        </h1>
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </section>
      <section className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">New Products</h1>
        <NewProductList />
      </section>
    </div>
  );
}

export default HomePage;
