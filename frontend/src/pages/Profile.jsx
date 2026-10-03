import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import ProfileCard from "../components/profile/ProfileCard";
import UserInfo from "../components/profile/UserInfo";
import ActivityCard from "../components/profile/ActivityCard";
import SecurityStatus from "../components/profile/SecurityStatus";

import { getProfile } from "../api/profileApi";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getProfile();

      setUser(response.data.data);
    } catch (error) {
      console.error(
        "Profile loading error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400" />

          <p className="mt-4 text-slate-400">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-slate-900 p-10 text-center">
        <h2 className="text-xl font-bold text-red-400">
          Profile Not Found
        </h2>

        <p className="mt-2 text-slate-400">
          No user profile was found in the database.
        </p>

        <button
          onClick={loadProfile}
          className="mt-5 rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-slate-950 hover:bg-cyan-400"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            My Profile
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your account and security information.
          </p>
        </div>

        <button
          onClick={loadProfile}
          className="rounded-xl border border-cyan-500 px-5 py-2 text-cyan-400 transition hover:bg-cyan-500 hover:text-slate-950"
        >
          Refresh
        </button>
      </div>

      {/* Profile */}
      <div className="grid gap-6 lg:grid-cols-3">

        <ProfileCard user={user} />

        <div className="space-y-6 lg:col-span-2">
          <UserInfo user={user} />

          <SecurityStatus />
        </div>

      </div>

      {/* Activity */}
      <ActivityCard user={user} />

    </div>
  );
}

export default Profile;