import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import LoadingSpinner from "../components/common/LoadingSpinner";
import { getThreats, deleteThreat } from "../api/threatApi";

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
  if (status === "Active") {
    return "text-red-400";
  }

  return "text-green-400";
}

function Threats() {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadThreats = async () => {
    try {
      setLoading(true);

      const response = await getThreats();

      setThreats(response.data?.data || []);
    } catch (error) {
      console.error("Threat load error:", error);

      toast.error("Failed to load threats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadThreats();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this threat?"
    );

    if (!confirmDelete) return;

    try {
      await deleteThreat(id);

      toast.success("Threat deleted successfully");

      loadThreats();
    } catch (error) {
      console.error("Delete error:", error);

      toast.error("Failed to delete threat");
    }
  };

  const filteredThreats = threats.filter((threat) => {
    const query = search.toLowerCase();

    return (
      threat.title?.toLowerCase().includes(query) ||
      threat.source?.toLowerCase().includes(query) ||
      threat.severity?.toLowerCase().includes(query) ||
      threat.status?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Security Threats
          </h1>

          <p className="mt-2 text-slate-400">
            Monitor and manage detected security threats.
          </p>
        </div>

        <button
          onClick={loadThreats}
          className="rounded-xl border border-cyan-500 px-5 py-2 text-cyan-400 transition hover:bg-cyan-500 hover:text-slate-950"
        >
          Refresh Threats
        </button>

      </div>

      {/* SEARCH */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

        <input
          type="text"
          placeholder="Search threats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
        />

      </div>

      {/* SUMMARY */}

      <div className="grid gap-5 md:grid-cols-4">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <p className="text-sm text-slate-400">
            Total Threats
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {threats.length}
          </h2>

        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <p className="text-sm text-slate-400">
            Active Threats
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-400">
            {
              threats.filter(
                (threat) => threat.status === "Active"
              ).length
            }
          </h2>

        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <p className="text-sm text-slate-400">
            Critical
          </p>

          <h2 className="mt-2 text-3xl font-bold text-orange-400">
            {
              threats.filter(
                (threat) =>
                  threat.severity === "Critical"
              ).length
            }
          </h2>

        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <p className="text-sm text-slate-400">
            Resolved
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-400">
            {
              threats.filter(
                (threat) =>
                  threat.status === "Resolved"
              ).length
            }
          </h2>

        </div>

      </div>

      {/* THREAT TABLE */}

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

        {filteredThreats.length === 0 ? (

          <div className="p-16 text-center">

            <h2 className="text-xl font-bold text-white">
              No Threats Found
            </h2>

            <p className="mt-2 text-slate-400">
              No security threats match your search.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="border-b border-slate-700 bg-slate-950">

                <tr className="text-left text-sm text-slate-400">

                  <th className="px-6 py-4">
                    Threat
                  </th>

                  <th className="px-6 py-4">
                    Source
                  </th>

                  <th className="px-6 py-4">
                    Severity
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4">
                    Detected
                  </th>

                  <th className="px-6 py-4">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredThreats.map((threat) => (

                  <tr
                    key={threat._id}
                    className="border-b border-slate-800 transition hover:bg-slate-800/40"
                  >

                    <td className="px-6 py-4">

                      <p className="font-semibold text-white">
                        {threat.title}
                      </p>

                      <p className="mt-1 max-w-md text-sm text-slate-400">
                        {threat.description}
                      </p>

                    </td>

                    <td className="px-6 py-4 text-cyan-400">
                      {threat.source}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getSeverityColor(
                          threat.severity
                        )}`}
                      >
                        {threat.severity}
                      </span>

                    </td>

                    <td
                      className={`px-6 py-4 font-semibold ${getStatusColor(
                        threat.status
                      )}`}
                    >
                      {threat.status}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-400">

                      {threat.createdAt
                        ? new Date(
                            threat.createdAt
                          ).toLocaleString()
                        : "N/A"}

                    </td>

                    <td className="px-6 py-4">

                      <button
                        onClick={() =>
                          handleDelete(threat._id)
                        }
                        className="rounded-lg border border-red-500/50 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Threats;