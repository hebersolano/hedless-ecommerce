"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  HiOutlineUserCircle,
  HiOutlineBell,
  HiOutlineShoppingCart,
} from "react-icons/hi2";

import CartModal from "./CartModal";
import ThemeToggle from "../ThemeToggle";
import Modal from "../Modal";
import MenuBox from "../MenuWindows";

const iconStyle = { height: 23, width: 23 };

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
    <div className="group relative flex flex-none items-center">
      <ThemeToggle iconStyle={iconStyle} />
      <MenuBox>
        <>
          {/* profile */}
          <MenuBox.Trigger opens="profile-menu">
            <button className="ml-3 hover:text-primary" onClick={handleProfile}>
              <HiOutlineUserCircle style={iconStyle} />
            </button>
          </MenuBox.Trigger>
          <MenuBox.Content name="profile-menu">
            <div className="absolute left-0 top-12 z-20 rounded-md bg-background p-4 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <Link href="/">Profile</Link>
              <div className="mt-2 cursor-pointer">Logout</div>
            </div>
          </MenuBox.Content>

          {/* notifications */}
          <button className="ml-3 hover:text-primary">
            <HiOutlineBell style={iconStyle} />
          </button>

          <MenuBox.Trigger opens="cart-menu">
            <div className="relative ml-3 cursor-pointer">
              <HiOutlineShoppingCart
                style={iconStyle}
                className="hover:text-primary"
              />

              <div className="pointer-events-none absolute -top-4 left-3 flex h-6 w-6 items-center justify-center rounded-full bg-lama text-sm leading-none">
                <span className="">3</span>
              </div>
            </div>
          </MenuBox.Trigger>
          <MenuBox.Content name="cart-menu">
            <CartModal />
          </MenuBox.Content>
        </>
      </MenuBox>
    </div>
  );
}

export default NavbarIcons;
