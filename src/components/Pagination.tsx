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
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const { replace } = useRouter();

  // const currentPage = parseInt(searchParams.get("page") || "0");

  // function setPageSearchParam(pageNumber: number) {
  //   const params = new URLSearchParams(searchParams);
  //   params.set("page", pageNumber.toString());
  //   replace(pathname + "?" + params.toString());
  // }

  const currentPage = pagination.currentPage || 0;
  const params = new URLSearchParams(searchParams || {});
  const page = params.get("page") || "";

  function getParams(page: number) {
    params.set("page", page.toString());
    return params.toString();
  }

  return (
    <div className="mt-12 flex w-full justify-between">
      <button
        // onClick={setPageSearchParam.bind(null, currentPage - 1)}
        disabled={!pagination.hasPrevPage}
        className="w-24 cursor-pointer rounded-md bg-primary p-2 text-sm text-primary-foreground disabled:cursor-not-allowed disabled:bg-primary/30"
      >
        Previous
      </button>
      <Link href={`?${getParams(currentPage + 3)}`}>Next page</Link>
      <button
        // onClick={setPageSearchParam.bind(null, currentPage + 1)}
        disabled={!pagination.hasNextPage}
        className="w-24 cursor-pointer rounded-md bg-primary p-2 text-sm text-primary-foreground disabled:cursor-not-allowed disabled:bg-primary/30"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
