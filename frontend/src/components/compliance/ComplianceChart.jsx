function ComplianceChart({ frameworks = [] }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        Compliance Score
      </h2>

      <div className="space-y-5">
        {frameworks.length === 0 ? (
          <p className="text-center text-slate-400">
            No compliance data available.
          </p>
        ) : (
          frameworks.map((item) => (
            <div key={item._id}>
              <div className="mb-1 flex justify-between">
                <span className="text-slate-300">
                  {item.framework}
                </span>

                <span className="text-cyan-400">
                  {item.score}%
                </span>
              </div>

              <div className="h-3 rounded-full bg-slate-800">
                <div
                  className="h-3 rounded-full bg-cyan-500 transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(0, item.score)
                    )}%`,
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ComplianceChart;