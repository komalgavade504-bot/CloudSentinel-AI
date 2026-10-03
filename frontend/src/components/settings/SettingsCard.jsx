function SettingsCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-xl font-bold text-white">
        {title}
      </h2>

      {children}
    </div>
  );
}

export default SettingsCard;