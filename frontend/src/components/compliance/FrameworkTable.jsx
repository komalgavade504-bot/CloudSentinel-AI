function FrameworkTable({ frameworks = [] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
      <table className="min-w-full">
        <thead className="bg-slate-950">
          <tr>
            <th className="p-4 text-left text-slate-300">
              Framework
            </th>

            <th className="p-4 text-left text-slate-300">
              Score
            </th>

            <th className="p-4 text-left text-slate-300">
              Status
            </th>

            <th className="p-4 text-left text-slate-300">
              Controls
            </th>

            <th className="p-4 text-left text-slate-300">
              Passed
            </th>

            <th className="p-4 text-left text-slate-300">
              Last Audit
            </th>
          </tr>
        </thead>

        <tbody>
          {frameworks.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="p-8 text-center text-slate-400"
              >
                No compliance frameworks available.
              </td>
            </tr>
          ) : (
            frameworks.map((item) => (
              <tr
                key={item._id}
                className="border-t border-slate-800 transition hover:bg-slate-800/40"
              >
                <td className="p-4 font-semibold text-white">
                  {item.framework}
                </td>

                <td className="p-4">
                  <span
                    className={`font-semibold ${
                      item.score >= 90
                        ? "text-green-400"
                        : item.score >= 75
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {item.score}%
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.status === "Compliant"
                        ? "bg-green-500/10 text-green-400"
                        : item.status === "Needs Review"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-purple-500/10 text-purple-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-4 text-slate-300">
                  {item.controls}
                </td>

                <td className="p-4 text-green-400">
                  {item.passedControls}
                </td>

                <td className="p-4 text-sm text-slate-400">
                  {item.lastAudit
                    ? new Date(
                        item.lastAudit
                      ).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FrameworkTable;