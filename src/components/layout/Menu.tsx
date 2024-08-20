"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiBars3 } from "react-icons/hi2";

function Menu() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="my-auto h-full">
      <button className="h-full" onClick={() => setOpen((prev) => !prev)}>
        <HiBars3 style={{ height: 28, width: 28 }} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[64px] z-10 flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center gap-8 bg-background text-xl">
          <Link href="/">Homepage</Link>
          <Link href="/">Shop</Link>
          <Link href="/">Deals</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          <Link href="/">Logout</Link>
          <Link href="/">Cart</Link>
        </div>
      )}
    </div>
  );
}

export default Menu;
