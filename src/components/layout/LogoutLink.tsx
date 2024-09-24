"use client";

import useWixClient from "@/hooks/useWixClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

function LogoutLink() {
  const router = useRouter();
  const wixClient = useWixClient();
  const [logoutUrl, setLogoutUrl] = useState("");

  function handleLogout() {
    wixClient.auth
      .logout(window.location.href)
      .then((res) => {
        console.log(res);
        Cookies.set("session", "");
        localStorage.removeItem("session");
        window.location.href = res.logoutUrl;
      })
      .catch((e) => console.log(e));
    // updateRefreshToken("");
  }

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutLink;
