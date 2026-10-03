function UserInfo({ user }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-xl font-bold text-white">
        User Information
      </h2>

      <div className="space-y-4 text-slate-300">

        <div>
          <p className="text-sm text-slate-500">
            Full Name
          </p>

          <p className="mt-1">
            {user?.fullName || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Email
          </p>

          <p className="mt-1">
            {user?.email || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Role
          </p>

          <p className="mt-1">
            {user?.role || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Last Login
          </p>

          <p className="mt-1">
            {user?.lastLogin
              ? new Date(
                  user.lastLogin
                ).toLocaleString()
              : "-"}
          </p>
        </div>

      </div>
    </div>
  );
}

export default UserInfo;