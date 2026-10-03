function SecurityScore({ score = 100 }) {
  const getLabel = () => {
    if (score >= 90) return "Excellent Security";
    if (score >= 75) return "Good Security";
    if (score >= 60) return "Needs Improvement";
    return "Critical Security Risk";
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        Security Score
      </h2>

      <div className="text-center">

        <h1 className="text-6xl font-bold text-cyan-400">
          {score}%
        </h1>

        <div className="mt-6 h-4 rounded-full bg-slate-800">
          <div
            className="h-4 rounded-full bg-cyan-500 transition-all duration-500"
            style={{ width: `${score}%` }}
          />
        </div>

        <p className="mt-4 font-semibold text-green-400">
          {getLabel()}
        </p>

      </div>
    </div>
  );
}

export default SecurityScore;