"use client";
import { products } from "@wix/stores";
import Image from "next/image";
import { useState } from "react";
import useSingleProduct from "./useSingleProduct";

function ProductImages({
  productImages,
}: {
  productImages: products.MediaItem[];
}) {
  const [index, setIndex] = useState(0);
  const { selectedVariant } = useSingleProduct();
  const images = selectedVariant?.media?.items || productImages;

  return (
    <div>
      <div className="relative h-[500px]">
        <Image
          src={images[index].image?.url || "/product.png"}
          alt=""
          fill
          className="rounded-md object-cover"
          sizes="50vw"
        />
      </div>

      <div className="mt-8 flex cursor-pointer justify-between gap-4">
        {images.map((img, i) => (
          <div
            key={img._id}
            onClick={() => setIndex(i)}
            className="relative mt-8 h-32 w-1/4 gap-4"
          >
            <Image
              src={img.image?.url || "/product.png"}
              alt=""
              fill
              className="rounded-md object-cover"
              sizes="30vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
