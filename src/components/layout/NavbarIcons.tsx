"use client";

import {
  HiOutlineUserCircle,
  HiOutlineBell,
  HiOutlineShoppingCart,
} from "react-icons/hi2";

import CartModal from "./CartModal";
import ThemeToggle from "../ThemeToggle";
import MenuBox from "../MenuWindows";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
import { ProfileMenu } from "./ProfileMenu";

const iconStyle = { height: 23, width: 23 };

function NavbarIcons() {
  return (
    <div className="relative flex flex-none items-center">
      <ThemeProvider attribute="class" enableSystem={false}>
        <ThemeToggle iconStyle={iconStyle} />
      </ThemeProvider>
      <MenuBox>
        <>
          {/* profile */}
          <MenuBox.Trigger opens="profile-menu">
            <button className="ml-3 hover:text-primary">
              <HiOutlineUserCircle style={iconStyle} />
            </button>
          </MenuBox.Trigger>
          <MenuBox.Content name="profile-menu">
            <ProfileMenu />
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
