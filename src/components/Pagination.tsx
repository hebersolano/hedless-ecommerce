// "use client";

import { paginationT, searchParamsT } from "@/lib/types";
import Link from "next/link";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { MouseEvent } from "react";

function Pagination({
  pagination,
  searchParams,
}: {
  pagination: paginationT;
  searchParams?: searchParamsT;
}) {
  const currentPage = pagination.currentPage || 0;
  const params = new URLSearchParams(searchParams);

  function getParams(page: number) {
    params.set("page", page.toString());
    return params.toString();
  }

  return (
    <div className="mt-24 flex w-full justify-evenly">
      <Link
        href={`?${getParams(currentPage - 1)}`}
        className={`w-24 cursor-pointer rounded-md bg-primary p-2 text-center text-sm text-primary-foreground ${!pagination.hasPrevPage ? "pointer-events-none cursor-not-allowed bg-primary/30" : ""}`}
      >
        Previous
      </Link>
      <div className="flex gap-2">
        {new Array(pagination.totalPages).fill(null).map((_, i) => (
          <Link
            key={i}
            href={"?" + getParams(i)}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm hover:bg-border ${i === currentPage && "pointer-events-none bg-primary text-primary-foreground"}`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
      <Link
        href={`?${getParams(currentPage + 1)}`}
        className={`w-24 cursor-pointer rounded-md bg-primary p-2 text-center text-sm text-primary-foreground ${!pagination.hasNextPage ? "pointer-events-none cursor-not-allowed bg-primary/30" : ""}`}
      >
        Next
      </Link>
    </div>
  );
}

export default Pagination;
