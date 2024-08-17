"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

function SearchBar() {
  const router = useRouter();

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("searchQuery") as String;

    if (searchQuery && searchQuery.length > 2)
      router.push(`/list?name=${searchQuery}`);
  }

  let s =
    "flex flex-1 items-center justify-between gap-4 rounded-md bg-primary-foreground";

  return (
    <form onSubmit={handleSearch} className="group relative">
      <input
        type="text"
        name="searchQuery"
        placeholder="Search"
        className="rounded-md bg-card px-2 py-1 ps-2 outline-none ring-1 ring-border focus:ring-foreground group-hover:ring-foreground"
      />
      <button className="absolute inset-y-0 right-2 cursor-pointer text-border group-hover:text-foreground">
        <HiOutlineMagnifyingGlass style={{ width: 23, height: 23 }} />
      </button>
    </form>
  );
}

export default SearchBar;
