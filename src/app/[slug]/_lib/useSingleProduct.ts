import { SingleProductContext } from "@/app/[slug]/_lib/SingleProductContext";
import { useContext } from "react";

export default function useSingleProduct() {
  const context = useContext(SingleProductContext);
  if (context === undefined)
    throw new Error("Trying to use context outside of its Provider");
  if (context === null) throw new Error("Context equal to null");

  return context;
}
