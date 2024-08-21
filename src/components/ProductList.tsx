import Image from "next/image";
import Link from "next/link";

function ProductList() {
  return (
    <div className="mt-12 flex flex-wrap justify-between gap-x-8 gap-y-16">
      <ProductListItem />
      <ProductListItem />
      <ProductListItem />
      <ProductListItem />
    </div>
  );
}

export default ProductList;

function ProductListItem() {
  return (
    <Link
      href="/test"
      className="flex w-full flex-col gap-4 sm:w-[45%] lg:w-[22%]"
    >
      <div className="relative h-80 w-full">
        <Image
          src="https://images.pexels.com/photos/16791447/pexels-photo-16791447/free-photo-of-mujer-rubia-en-pie-de-pie.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          fill
          sizes="25vw"
          className="absolute z-10 rounded-md object-cover transition-opacity ease-in hover:opacity-0"
        />
        <Image
          src="https://images.pexels.com/photos/15803969/pexels-photo-15803969/free-photo-of-mujer-en-pie-de-pie-vestido.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          fill
          sizes="25vw"
          className="absolute rounded-md object-cover"
        />
      </div>
      <div className="flex justify-between">
        <span className="font-medium">Product Name</span>
        <span className="font-semibold">$49</span>
      </div>
      <p className="text-sm text-muted-foreground">My description</p>
      <button className="w-max rounded-2xl px-4 py-2 text-xs text-primary ring-1 ring-primary hover:bg-primary hover:text-primary-foreground">
        Add to Cart
      </button>
    </Link>
  );
}
