"use client";
import { products } from "@wix/stores";
import Image from "next/image";
import { useState } from "react";
import useSingleProduct from "./useSingleProduct";

// const images = [
//   {
//     id: 1,
//     url: "https://images.pexels.com/photos/1088491/pexels-photo-1088491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: 2,
//     url: "https://images.pexels.com/photos/45889/camera-photo-camera-sony-alpha-7-sony-45889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: 3,
//     url: "https://images.pexels.com/photos/8456847/pexels-photo-8456847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: 4,
//     url: "https://images.pexels.com/photos/1787236/pexels-photo-1787236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
// ];

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
