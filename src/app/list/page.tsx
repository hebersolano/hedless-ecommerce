import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Image from "next/image";

function ListPage() {
  return (
    <div className="relative px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* campaign */}
      <div className="flex h-64 justify-between bg-pallet-second px-4">
        <div className="flex flex-col items-center justify-center gap-8 md:w-2/3">
          <h1 className="text-4xl font-semibold leading-[48px] text-muted-foreground">
            Grap up to 50% off on <br className="hidden md:block" /> Selected
            Products
          </h1>
          <button className="rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground ring-1 ring-transparent transition-all hover:bg-transparent hover:text-primary hover:ring-primary">
            Buy Now
          </button>
        </div>
        <div className="relative hidden md:block md:w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>

      {/* filter */}
      <Filter />

      {/* products */}
      <h1 className="mt-12 text-xl font-semibold">Shoes For You!</h1>
      <ProductList />
    </div>
  );
}

export default ListPage;
