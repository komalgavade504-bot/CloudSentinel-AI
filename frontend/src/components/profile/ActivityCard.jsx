function ActivityCard({ user }) {
  const activities = [
    {
      id: 1,
      title: "Profile Created",
      time: user?.createdAt
        ? new Date(user.createdAt).toLocaleString()
        : "Recently",
    },
    {
      id: 2,
      title: "Last Login",
      time: user?.lastLogin
        ? new Date(user.lastLogin).toLocaleString()
        : "Not available",
    },
    {
      id: 3,
      title: "Account Status",
      time: user?.isActive
        ? "Account is currently active"
        : "Account is inactive",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-xl font-bold text-white">
        Account Activity
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="rounded-lg bg-slate-800 p-4"
          >
            <p className="font-medium text-white">
              {activity.title}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              {activity.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityCard;