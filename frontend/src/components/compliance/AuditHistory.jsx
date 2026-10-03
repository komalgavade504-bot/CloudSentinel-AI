function AuditHistory({ frameworks = [] }) {
  const sortedFrameworks = [...frameworks].sort(
    (a, b) =>
      new Date(b.lastAudit || b.createdAt) -
      new Date(a.lastAudit || a.createdAt)
  );

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-5 text-xl font-bold text-white">
        Audit History
      </h2>

      <div className="space-y-4">
        {sortedFrameworks.length === 0 ? (
          <p className="text-center text-slate-400">
            No audit history available.
          </p>
        ) : (
          sortedFrameworks.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b border-slate-800 pb-3"
            >
              <div>
                <p className="font-medium text-white">
                  {item.framework}
                </p>

                <p className="text-sm text-slate-400">
                  {item.lastAudit
                    ? new Date(
                        item.lastAudit
                      ).toLocaleDateString()
                    : "No audit date"}
                </p>
              </div>

              <span
                className={`font-semibold ${
                  item.status === "Compliant"
                    ? "text-green-400"
                    : item.status === "Needs Review"
                    ? "text-yellow-400"
                    : "text-purple-400"
                }`}
              >
                {item.status === "Compliant"
                  ? "Passed"
                  : item.status === "Needs Review"
                  ? "Review Required"
                  : "In Progress"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AuditHistory;