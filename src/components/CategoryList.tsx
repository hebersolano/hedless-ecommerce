import Image from "next/image";
import Link from "next/link";

function CategoryList() {
  return (
    <div className="scrollbar-hide overflow-scroll px-4">
      <div className="flex gap-4 md:gap-8">
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
      </div>
    </div>
  );
}

export default CategoryList;

function CategoryListItem() {
  return (
    <Link
      href="list?cat=test"
      className="w-full flex-shrink-0 px-4 sm:w-1/2 lg:w-1/4 xl:w-1/6"
    >
      <div className="relative h-96 w-full bg-slate-100">
        <Image
          src="https://images.pexels.com/photos/20157957/pexels-photo-20157957/free-photo-of-blanco-y-negro-mujer-sentado-tejanos.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          fill
          sizes="20vw"
          className="absolute object-cover"
        />
      </div>
      <h1 className="mt-8 text-clip font-light">Category Name</h1>
    </Link>
  );
}
