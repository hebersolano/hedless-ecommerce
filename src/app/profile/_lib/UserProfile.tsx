"use client";

import { FormEventHandler, useState } from "react";
import { Member } from "./types";
import updateUserInfo from "@/lib/data-access/updateUserInfo";
import { GrUserNew } from "react-icons/gr";
import useWixClient from "@/hooks/useWixClient";

function UserProfile({ userData }: { userData: Member }) {
  const wixClient = useWixClient();
  const [username, setUsername] = useState(userData?.profile?.nickname || "");
  if (!userData || !userData?.contactId) return <h2>No user data</h2>;

  async function handleSubmit(formData: FormData) {
    const data = Object.fromEntries(formData.entries()) as {
      [k: string]: string | undefined;
    };
    console.log(data);
    const { username, firstName, lastName, phone, loginEmail } = data;
    await updateUserInfo(wixClient, userData?.contactId!, {
      contact: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        phones: phone ? [phone] : undefined,
      },
      loginEmail: loginEmail || undefined,
      profile: { nickname: username || undefined },
    });
  }

  return (
    <>
      <h2 className="text-2xl">Profile</h2>
      <form action={handleSubmit} className="mt-12 flex flex-col gap-4">
        <>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-md p-2 ring-1 ring-border"
          />
        </>
        <>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder={userData.contact?.firstName || ""}
            className="rounded-md p-2 ring-1 ring-border"
          />
        </>
        <>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder={userData.contact?.lastName || ""}
            className="rounded-md p-2 ring-1 ring-border"
          />
        </>
        <>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder={
              (userData.contact?.phones && userData.contact?.phones[0]) || ""
            }
            className="rounded-md p-2 ring-1 ring-border"
          />
        </>
        <>
          <label htmlFor="loginEmail">Login Email</label>
          <input
            type="text"
            name="loginEmail"
            placeholder={userData.loginEmail || ""}
            className="rounded-md p-2 ring-1 ring-border"
          />
        </>
        <button
          type="submit"
          className="rounded-md bg-primary p-2 disabled:cursor-not-allowed disabled:bg-primary/40"
        >
          Update
        </button>
      </form>
    </>
  );
}

export default UserProfile;
