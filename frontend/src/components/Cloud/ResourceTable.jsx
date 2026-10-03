function ResourceTable({ resources }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">
      <table className="min-w-full">
        <thead className="border-b border-slate-700 bg-slate-950">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Service
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Resources
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Region
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Risk Score
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Findings
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {resources.map((resource) => (
            <tr
              key={resource.id}
              className="border-b border-slate-800 hover:bg-slate-800/40 transition"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{resource.icon}</span>

                  <div>
                    <p className="font-semibold text-white">
                      {resource.name}
                    </p>

                    <p className="text-sm text-slate-400">
                      {resource.service}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-white">
                {resource.count}
              </td>

              <td className="px-6 py-4 text-cyan-400">
                {resource.region}
              </td>

              <td className="px-6 py-4 text-red-400">
                {resource.riskScore}
              </td>

              <td className="px-6 py-4 text-yellow-400">
                {resource.findings}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    resource.status === "Healthy"
                      ? "bg-green-500/20 text-green-400"
                      : resource.status === "Warning"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {resource.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResourceTable;