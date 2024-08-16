"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

function SearchBar() {
  const router = useRouter();

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("searchQuery") as String;

    if (searchQuery && searchQuery.length > 2)
      router.push(`/list?name=${searchQuery}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="bg-g flex flex-1 items-center justify-between gap-4 rounded-md bg-gray-100 p-2"
    >
      <input
        type="text"
        name="searchQuery"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none"
      />
      <button className="cursor-pointer">
        <Image src="/search.png" width={16} height={16} alt="search icon" />
      </button>
    </form>
  );
}

export default SearchBar;
