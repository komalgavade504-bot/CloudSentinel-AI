import { FiCheck, FiLoader } from "react-icons/fi";

function ThreatTable({
  threats = [],
  onResolve,
  resolvingId,
}) {
  // =========================
  // SEVERITY BADGE COLORS
  // =========================

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500/20 text-red-400 border border-red-500/30";

      case "High":
        return "bg-orange-500/20 text-orange-400 border border-orange-500/30";

      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";

      case "Low":
        return "bg-green-500/20 text-green-400 border border-green-500/30";

      default:
        return "bg-slate-700 text-slate-300";
    }
  };

  // =========================
  // STATUS STYLE
  // =========================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
      case "Open":
        return "text-red-400";

      case "Resolved":
      case "Closed":
        return "text-green-400";

      default:
        return "text-yellow-400";
    }
  };

  // =========================
  // CHECK IF THREAT IS ACTIVE
  // =========================

  const canResolve = (status) => {
    return status === "Active" || status === "Open";
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">

      <table className="min-w-full">

        {/* ================= TABLE HEADER ================= */}

        <thead className="border-b border-slate-700 bg-slate-950">

          <tr>

            <th className="p-4 text-left text-sm font-semibold text-slate-300">
              Time
            </th>

            <th className="p-4 text-left text-sm font-semibold text-slate-300">
              Resource
            </th>

            <th className="p-4 text-left text-sm font-semibold text-slate-300">
              Threat
            </th>

            <th className="p-4 text-left text-sm font-semibold text-slate-300">
              Severity
            </th>

            <th className="p-4 text-left text-sm font-semibold text-slate-300">
              Status
            </th>

            <th className="p-4 text-left text-sm font-semibold text-slate-300">
              Recommendation
            </th>

            <th className="p-4 text-center text-sm font-semibold text-slate-300">
              Action
            </th>

          </tr>

        </thead>

        {/* ================= TABLE BODY ================= */}

        <tbody>

          {threats.length === 0 ? (

            <tr>

              <td
                colSpan="7"
                className="p-10 text-center text-slate-400"
              >
                No threats found.
              </td>

            </tr>

          ) : (

            threats.map((threat) => {

              const isResolving =
                resolvingId === threat._id;

              const isActive =
                canResolve(threat.status);

              return (

                <tr
                  key={threat._id}
                  className="border-t border-slate-800 transition hover:bg-slate-800/40"
                >

                  {/* TIME */}

                  <td className="whitespace-nowrap p-4 text-sm text-slate-400">

                    {threat.createdAt
                      ? new Date(
                          threat.createdAt
                        ).toLocaleString()
                      : "N/A"}

                  </td>

                  {/* RESOURCE */}

                  <td className="p-4 font-medium text-cyan-400">

                    {threat.affectedResource ||
                      "Not specified"}

                  </td>

                  {/* THREAT */}

                  <td className="p-4">

                    <p className="font-semibold text-white">

                      {threat.title}

                    </p>

                  </td>

                  {/* SEVERITY */}

                  <td className="p-4">

                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getSeverityStyle(
                        threat.severity
                      )}`}
                    >

                      {threat.severity || "Unknown"}

                    </span>

                  </td>

                  {/* STATUS */}

                  <td
                    className={`p-4 font-medium ${getStatusStyle(
                      threat.status
                    )}`}
                  >

                    {threat.status || "Open"}

                  </td>

                  {/* RECOMMENDATION */}

                  <td className="max-w-xs p-4 text-sm text-slate-400">

                    {threat.recommendation ||
                      "Investigate and remediate this threat."}

                  </td>

                  {/* ACTION */}

                  <td className="p-4 text-center">

                    {isActive ? (

                      <button
                        onClick={() =>
                          onResolve &&
                          onResolve(threat._id)
                        }
                        disabled={isResolving}
                        className="inline-flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2 text-sm font-semibold text-green-400 transition hover:bg-green-500 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                      >

                        {isResolving ? (

                          <>
                            <FiLoader className="animate-spin" />

                            Resolving...
                          </>

                        ) : (

                          <>
                            <FiCheck />

                            Resolve
                          </>

                        )}

                      </button>

                    ) : (

                      <span className="inline-flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2 text-sm font-semibold text-green-400">

                        <FiCheck />

                        Resolved

                      </span>

                    )}

                  </td>

                </tr>

              );
            })

          )}

        </tbody>

      </table>

    </div>
  );
}

export default ThreatTable;