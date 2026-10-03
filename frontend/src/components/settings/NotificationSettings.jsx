import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getSettings,
  updateSettings,
} from "../../api/settingsApi";

function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailAlerts: true,
    threatAlerts: true,
    scanAlerts: true,
    reportAlerts: false,
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
        emailAlerts: data.emailAlerts,
        threatAlerts: data.threatAlerts,
        scanAlerts: data.scanAlerts,
        reportAlerts: data.reportAlerts,
      });
    } catch (error) {
      console.error(error);

      toast.error("Failed to load notification settings.");
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

      toast.success("Notification setting updated.");
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
        Loading notification settings...
      </p>
    );
  }

  const options = [
    {
      key: "emailAlerts",
      title: "Email Alerts",
      description: "Receive important security notifications by email.",
    },
    {
      key: "threatAlerts",
      title: "Threat Alerts",
      description: "Get notified when new threats are detected.",
    },
    {
      key: "scanAlerts",
      title: "Scan Alerts",
      description: "Receive notifications when security scans finish.",
    },
    {
      key: "reportAlerts",
      title: "Report Alerts",
      description: "Receive notifications when reports are generated.",
    },
  ];

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div
          key={option.key}
          className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4"
        >
          <div>
            <h3 className="font-semibold text-white">
              {option.title}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              {option.description}
            </p>
          </div>

          <button
            onClick={() => toggleSetting(option.key)}
            className={`relative h-6 w-11 rounded-full transition ${
              settings[option.key]
                ? "bg-cyan-500"
                : "bg-slate-700"
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                settings[option.key]
                  ? "left-6"
                  : "left-1"
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default NotificationSettings;