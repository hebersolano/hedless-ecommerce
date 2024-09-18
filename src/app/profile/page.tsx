"use client";

import useWixClient from "@/hooks/useWixClient";
import Cookies from "js-cookie";

function ProfilePage() {
  const wixClient = useWixClient();
  const isLogged = wixClient.auth.loggedIn();
  // wixClient.members
  //   .getCurrentMember()
  //   .then((res) => console.log("member", res));
  console.log("client log", isLogged);
  console.log(Cookies.get("session"));

  return <div>ProfilePage</div>;
}

export default ProfilePage;
