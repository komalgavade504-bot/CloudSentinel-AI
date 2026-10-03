import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getSettings,
  updateSettings,
} from "../../api/settingsApi";

function ProfileSettings() {
  const [form, setForm] = useState({
    displayName: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await getSettings();

      const data = response.data.data;

      setForm({
        displayName: data.displayName || "",
        email: data.email || "",
      });
    } catch (error) {
      console.error(error);

      toast.error("Failed to load profile settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      setSaving(true);

      await updateSettings(form);

      toast.success("Profile settings saved.");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save profile settings."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <p className="text-slate-400">
        Loading profile settings...
      </p>
    );
  }

  return (
    <div className="space-y-5">

      <div>
        <label className="mb-2 block text-sm text-slate-400">
          Display Name
        </label>

        <input
          type="text"
          name="displayName"
          value={form.displayName}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-400">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
        />
      </div>

      <button
        onClick={saveProfile}
        disabled={saving}
        className="rounded-xl bg-cyan-500 px-5 py-2.5 font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>

    </div>
  );
}

export default ProfileSettings;