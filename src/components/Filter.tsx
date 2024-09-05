"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ChangeEvent } from "react";

function Filter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleFilerChange(
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(pathname + "?" + params.toString());
  }

  return (
    <div className="mt-12 flex flex-col justify-between gap-6 md:flex-row">
      <div className="flex flex-wrap gap-6">
        <select
          name="type"
          className="rounded-2xl bg-secondary px-4 py-2 text-xs font-medium"
          onChange={handleFilerChange}
        >
          <option>Type</option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
        </select>

        <input
          type="number"
          name="min"
          placeholder="min price"
          onChange={handleFilerChange}
          className="w-24 rounded-2xl pl-2 ps-3 text-xs ring-1 ring-secondary"
        />
        <input
          type="number"
          name="max"
          placeholder="max price"
          onChange={handleFilerChange}
          className="w-24 rounded-2xl pl-2 ps-3 text-xs ring-1 ring-secondary"
        />

        <select
          name="size"
          onChange={handleFilerChange}
          className="rounded-2xl bg-secondary px-4 py-2 text-xs font-medium"
        >
          <option>Size</option>
          <option value="s">Small</option>
          <option value="m">Medium</option>
          <option value="l">Large</option>
        </select>

        <select
          name="color"
          id=""
          onChange={handleFilerChange}
          className="rounded-2xl bg-secondary px-4 py-2 text-xs font-medium"
        >
          <option>Color</option>
          <option value="">Text</option>
        </select>

        <select
          name="ribbon"
          id=""
          className="rounded-2xl bg-secondary px-4 py-2 text-xs font-medium"
          onChange={handleFilerChange}
        >
          <option>Category</option>
          <option value="new-arrival">New Arrival</option>
          <option value="popular">Popular</option>
        </select>

        <select
          name=""
          id=""
          onChange={handleFilerChange}
          className="rounded-2xl bg-secondary px-4 py-2 text-xs font-medium"
        >
          <option>All Filters</option>
        </select>
      </div>

      <div>
        <select
          name="sort"
          onChange={handleFilerChange}
          className="rounded-2xl bg-secondary px-4 py-2 text-xs font-medium ring-1 ring-secondary"
        >
          <option value="">Sort By</option>
          <option value="asc-price">Price (low to hight)</option>
          <option value="des-price">Price (hight to low)</option>
          <option value="asc-lastUpdated">Newest</option>
          <option value="des-lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
