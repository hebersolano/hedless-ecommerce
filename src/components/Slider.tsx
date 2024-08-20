"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-pallet to-pink-50",
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-pallet-second to-blue-50",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-pallet-third to-yellow-50",
  },
];

function Slider() {
  const [current, setCurrent] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="flex h-full w-max transition-all duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`${slide.bg} flex h-full w-screen flex-col gap-8 lg:flex-row xl:gap-16`}
          >
            {/* text container */}
            <div className="flex h-1/2 flex-col items-center justify-center gap-8 text-center lg:h-full lg:w-1/2 2xl:gap-12">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h2 className="text-4xl font-semibold lg:text-6xl xl:text-5xl 2xl:text-8xl">
                {slide.title}
              </h2>
              <Link href={slide.url}>
                <button className="rounded-md bg-foreground px-4 py-3 text-background">
                  SHOP NOW
                </button>
              </Link>
            </div>

            {/* image container */}
            <div className="relative h-1/2 lg:h-full lg:w-1/2">
              <Image
                src={slide.img}
                alt="slide image"
                fill
                sizes="100%"
                className="object-cover object-top"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 m-auto flex gap-4">
        {slides.map((slide, index) => (
          <div
            className={`${current === index && "scale-150"} flex h-3 w-3 cursor-pointer items-center justify-center rounded-full ring-1 ring-gray-600`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="h-[6px] w-[6px] rounded-full bg-gray-600"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
