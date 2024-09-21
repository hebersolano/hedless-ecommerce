import { SingleProductContext } from "@/app/[slug]/_lib/SingleProductContext";
import { useContext } from "react";

export default function useSingleProduct() {
  const context = useContext(SingleProductContext);
  if (!context)
    throw new Error("Trying to use context outside of its Provider");

  return context;
}
