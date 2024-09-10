"use client";

import useWixClient from "@/hooks/useWixClient";
import { FaGoogle } from "react-icons/fa";
import { getOAuthURL } from "./helpers";
import type { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

function OAuthLoginButton() {
  const wixClient = useWixClient();
  const router = useRouter();

  const handleOAuthRedirect: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    getOAuthURL(wixClient).then((url) => router.push(url));
  };

  return (
    <>
      <div className="flex flex-row items-center justify-evenly">
        <div className="h-[2px] w-full bg-border" />
        <p className="text-cente mx-2">Or</p>
        <div className="h-[2px] w-full bg-border" />
      </div>

      <button
        type="button"
        onClick={handleOAuthRedirect}
        className="flex items-center justify-center rounded-lg border-2 border-primary px-5 py-3 text-sm hover:bg-gray-900 hover:text-white"
      >
        <FaGoogle className="mr-2 sm:mr-0 md:mr-2" />
        <span className="">Login or Register with Google</span>
      </button>
    </>
  );
}

export default OAuthLoginButton;
