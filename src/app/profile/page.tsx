"use client";

import { useCurrentMember } from "@/hooks/useCurrentMembers";
import UserOrders from "./_lib/UserOrders";
import UserProfile from "./_lib/UserProfile";
import { notFound } from "next/navigation";

function ProfilePage() {
  const { data, error, isLoading } = useCurrentMember();
  console.log(data);
  // if (!user.data?.member?.contactId) notFound();
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className="flex flex-col gap-24 px-4 md:h-[calc(100vh-180px)] md:flex-row md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="w-full md:w-1/2">
        <UserProfile userData={data?.member} />
      </div>
      <div className="w-full md:w-1/2">
        {data?.member?.contactId && (
          <UserOrders userContactId={data?.member?.contactId} />
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
