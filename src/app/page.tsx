"use client";

import CategoryList from "@/components/CategoryList";
import NewProductList from "@/components/NewProductList";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import { wixClientContext } from "@/context/WixContext";
import { useContext, useEffect } from "react";

function HomePage() {
  const wixClient = useContext(wixClientContext);

  useEffect(
    function () {
      async function getProducts() {
        const res = await wixClient.products.queryProducts().find();
        console.log(res);
      }

      getProducts();
    },
    [wixClient],
  );

  return (
    <div className="bg-background">
      <Slider />
      <section className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <ProductList />
      </section>
      <section className="mt-24">
        <h1 className="mb-12 px-4 text-2xl md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          Categories
        </h1>
        <CategoryList />
      </section>
      <section className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">New Products</h1>
        <NewProductList />
      </section>
    </div>
  );
}

export default HomePage;
