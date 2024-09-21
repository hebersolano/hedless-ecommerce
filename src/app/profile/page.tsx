import UserProfile from "./_lib/UserProfile";

function ProfilePage() {
  return (
    <div className="flex flex-col gap-24 px-4 md:h-[calc(100vh-180px)] md:flex-row md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="w-full md:w-1/2">
        <UserProfile />
      </div>
      <div className="w-full md:w-1/2">Orders</div>
    </div>
  );
}

export default ProfilePage;
