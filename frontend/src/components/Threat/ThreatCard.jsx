function ThreatCard({ title, value, color }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-slate-400">{title}</p>

      <h2 className={`mt-3 text-4xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
}

export default ThreatCard;