import { products } from "@wix/stores";
import truncateString from "./helpers/truncateString";
import sanitizeHtml from "sanitize-html";

export default function getShortDescription(product: products.Product) {
  let ShortDescription =
    product.additionalInfoSections?.find(
      (section) => section.title === "short-description",
    )?.description || truncateString(product.description!, 65);
    
  return sanitizeHtml(ShortDescription, {
    allowedTags: [],
    allowedAttributes: {},
  });
}
