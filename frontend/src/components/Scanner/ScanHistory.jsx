function ScanHistory({ scans }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        Scan History
      </h2>

      {scans.length === 0 ? (
        <p className="text-center text-slate-400">
          No scans available.
        </p>
      ) : (
        <div className="space-y-4">
          {scans.map((scan) => (
            <div
              key={scan._id}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4"
            >
              <div>
                <h3 className="font-semibold text-white">
                  {scan.resourceName}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {scan.scanType} Scan
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {new Date(scan.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`font-semibold ${
                    scan.riskLevel === "High"
                      ? "text-red-400"
                      : scan.riskLevel === "Medium"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {scan.riskLevel} Risk
                </p>

                <p className="text-sm text-slate-300">
                  Findings: {scan.findings}
                </p>

                <p className="text-sm text-cyan-400">
                  Score: {scan.securityScore}%
                </p>

                <p
                  className={`mt-1 text-sm ${
                    scan.status === "Completed"
                      ? "text-green-400"
                      : scan.status === "Running"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {scan.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ScanHistory;