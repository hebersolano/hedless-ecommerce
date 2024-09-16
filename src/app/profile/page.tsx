"use client";

import useWixClient from "@/hooks/useWixClient";

function ProfilePage() {
  const wixClient = useWixClient();
  const isLogged = wixClient.auth.loggedIn();
  wixClient.members
    .getCurrentMember()
    .then((res) => console.log("member", res));
  console.log("client log", isLogged);

  return <div>ProfilePage</div>;
}

export default ProfilePage;
