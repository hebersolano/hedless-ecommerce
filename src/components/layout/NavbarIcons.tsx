"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import CartModal from "./CartModal";

function NavbarIcons() {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const isLoggedIn = false; //! temporary

  function handleProfile() {
    if (!isLoggedIn) router.push("/login");
    setIsProfileOpen((prev) => !prev);
  }

  return (
    <div className="relative flex flex-none items-center gap-4 xl:gap-6">
      <Image
        src="/profile.png"
        alt="profile icon"
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute left-0 top-12 z-20 rounded-md p-4 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <Link href="/">Profile</Link>
          <div className="mt-2 cursor-pointer">Logout</div>
        </div>
      )}
      <Image
        src="/notification.png"
        alt="notification icon"
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div className="relative cursor-pointer">
        <Image
          src="/cart.png"
          alt="cart icon"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={() => setIsCartOpen((prev) => !prev)}
        />
        <div className="bg-lama pointer-events-none absolute -right-2 -top-4 flex h-6 w-6 items-center justify-center rounded-full text-sm leading-none text-white">
          3
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
}

export default NavbarIcons;
