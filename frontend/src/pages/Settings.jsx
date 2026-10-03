import SettingsCard from "../components/settings/SettingsCard";
import ProfileSettings from "../components/settings/ProfileSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import SecuritySettings from "../components/settings/SecuritySettings";

function Settings() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your profile, notifications, and security preferences.
        </p>
      </div>

      <SettingsCard title="Profile">
        <ProfileSettings />
      </SettingsCard>

      <SettingsCard title="Notifications">
        <NotificationSettings />
      </SettingsCard>

      <SettingsCard title="Security">
        <SecuritySettings />
      </SettingsCard>

    </div>
  );
}

export default Settings;