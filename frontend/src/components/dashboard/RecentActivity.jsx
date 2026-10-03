import { useEffect, useState } from "react";

import { getThreats } from "../../api/threatApi";

function getSeverityColor(severity) {
  switch (severity) {
    case "Critical":
      return "bg-red-500/20 text-red-400";

    case "High":
      return "bg-orange-500/20 text-orange-400";

    case "Medium":
      return "bg-yellow-500/20 text-yellow-400";

    case "Low":
      return "bg-green-500/20 text-green-400";

    default:
      return "bg-slate-500/20 text-slate-400";
  }
}

function getStatusColor(status) {
  switch (status) {
    case "Resolved":
      return "text-green-400";

    case "Active":
      return "text-red-400";

    default:
      return "text-yellow-400";
  }
}

function RecentActivity() {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadThreats = async () => {
    try {
      setLoading(true);

      const response = await getThreats();

      const threatData = response.data?.data || [];

      setThreats(threatData);

    } catch (error) {
      console.error(
        "Recent Activity Error:",
        error
      );

      setThreats([]);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadThreats();
  }, []);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-white">
            Recent Security Activity
          </h2>

          <p className="text-sm text-slate-400">
            Latest threats detected across your cloud infrastructure
          </p>
        </div>

        <button
          onClick={loadThreats}
          className="rounded-lg border border-cyan-500 px-3 py-2 text-sm text-cyan-400 transition hover:bg-cyan-500 hover:text-slate-950"
        >
          Refresh
        </button>

      </div>

      {/* Loading */}
      {loading ? (

        <p className="py-8 text-center text-slate-400">
          Loading security activity...
        </p>

      ) : threats.length === 0 ? (

        <p className="py-8 text-center text-slate-400">
          No security threats found.
        </p>

      ) : (

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>
              <tr className="border-b border-slate-700 text-left text-sm text-slate-400">

                <th className="pb-3">
                  Time
                </th>

                <th className="pb-3">
                  Source
                </th>

                <th className="pb-3">
                  Threat
                </th>

                <th className="pb-3">
                  Severity
                </th>

                <th className="pb-3">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {threats
                .slice(0, 5)
                .map((threat) => (

                  <tr
                    key={threat._id}
                    className="border-b border-slate-800 transition hover:bg-slate-800/40"
                  >

                    <td className="py-4 text-slate-300">

                      {threat.createdAt
                        ? new Date(
                            threat.createdAt
                          ).toLocaleString([], {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}

                    </td>

                    <td className="py-4 font-medium text-cyan-400">
                      {threat.source || "Unknown"}
                    </td>

                    <td className="py-4 text-white">
                      {threat.title}
                    </td>

                    <td className="py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getSeverityColor(
                          threat.severity
                        )}`}
                      >
                        {threat.severity}
                      </span>

                    </td>

                    <td
                      className={`py-4 font-semibold ${getStatusColor(
                        threat.status
                      )}`}
                    >
                      {threat.status}
                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default RecentActivity;