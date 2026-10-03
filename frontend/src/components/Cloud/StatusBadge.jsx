function StatusBadge({ status }) {
  const styles = {
    Healthy: "bg-green-500/20 text-green-400 border border-green-500/30",
    Warning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    Critical: "bg-red-500/20 text-red-400 border border-red-500/30",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-700 text-white"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;