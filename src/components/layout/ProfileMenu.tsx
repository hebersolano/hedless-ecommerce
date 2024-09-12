"use client";
import useWixClient from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ProfileMenu() {
  const [href, setHref] = useState("");
  const wixClient = useWixClient();
  const isLogged = wixClient.auth.loggedIn();

  useEffect(function () {
    setHref(window.location.href);
  }, []);

  async function handleLogout() {
    console.log("logout click");
    const res = await wixClient.auth.logout(href);
    window.location.href = res.logoutUrl;
  }

  return (
    <div className="absolute left-0 top-12 z-20 flex flex-col gap-2 rounded-md bg-popover p-4 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      {isLogged ? (
        <>
          <Link href="/profile">Profile</Link>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
}
