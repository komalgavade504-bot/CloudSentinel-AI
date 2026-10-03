function ProfileCard({ user }) {
  const name = user?.fullName || "Admin User";

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const avatarUrl =
    user?.profileImage ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=0891b2&color=fff&size=200`;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
      <img
        src={avatarUrl}
        alt="Profile"
        className="mx-auto h-28 w-28 rounded-full object-cover"
        onError={(e) => {
          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            name
          )}&background=0891b2&color=fff&size=200`;
        }}
      />

      <div className="mt-4 flex justify-center">
        <div className="hidden h-0 w-0">
          {initials}
        </div>
      </div>

      <h2 className="mt-4 text-2xl font-bold text-white">
        {name}
      </h2>

      <p className="text-cyan-400">
        {user?.role || "Admin"}
      </p>

      <div className="mt-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            user?.isActive
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {user?.isActive ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
}

export default ProfileCard;
