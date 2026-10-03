import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getSettings,
  updateSettings,
} from "../../api/settingsApi";

function SecuritySettings() {
  const [settings, setSettings] = useState({
    mfaEnabled: true,
    loginAlerts: true,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await getSettings();

      const data = response.data.data;

      setSettings({
        mfaEnabled: data.mfaEnabled,
        loginAlerts: data.loginAlerts,
      });
    } catch (error) {
      console.error(error);

      toast.error("Failed to load security settings.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSetting = async (name) => {
    const newValue = !settings[name];

    setSettings((current) => ({
      ...current,
      [name]: newValue,
    }));

    try {
      await updateSettings({
        [name]: newValue,
      });

      toast.success("Security setting updated.");
    } catch (error) {
      console.error(error);

      setSettings((current) => ({
        ...current,
        [name]: !newValue,
      }));

      toast.error("Failed to update setting.");
    }
  };

  if (loading) {
    return (
      <p className="text-slate-400">
        Loading security settings...
      </p>
    );
  }

  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4">
        <div>
          <h3 className="font-semibold text-white">
            Multi-Factor Authentication
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Add an additional layer of protection to your account.
          </p>
        </div>

        <button
          onClick={() => toggleSetting("mfaEnabled")}
          className={`relative h-6 w-11 rounded-full transition ${
            settings.mfaEnabled
              ? "bg-cyan-500"
              : "bg-slate-700"
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
              settings.mfaEnabled
                ? "left-6"
                : "left-1"
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4">
        <div>
          <h3 className="font-semibold text-white">
            Login Alerts
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Get notified about new account login activity.
          </p>
        </div>

        <button
          onClick={() => toggleSetting("loginAlerts")}
          className={`relative h-6 w-11 rounded-full transition ${
            settings.loginAlerts
              ? "bg-cyan-500"
              : "bg-slate-700"
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
              settings.loginAlerts
                ? "left-6"
                : "left-1"
            }`}
          />
        </button>
      </div>

    </div>
  );
}

export default SecuritySettings;