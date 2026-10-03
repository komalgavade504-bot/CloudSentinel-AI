import { useEffect, useState } from "react";
import {
  FaHeartbeat,
  FaExclamationTriangle,
  FaShieldAlt,
  FaCheck,
  FaSearch,
  FaSyncAlt,
} from "react-icons/fa";

import ThreatTable from "../components/Threat/ThreatTable";
import { getThreats } from "../api/threatApi";

function ThreatFeed() {
  const [threats, setThreats] = useState([]);
  const [filteredThreats, setFilteredThreats] = useState([]);

  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] =
    useState("All");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD THREATS
  // =========================

  const loadThreats = async () => {
    try {
      setLoading(true);

      const response = await getThreats();

      console.log(
        "Threat API Response:",
        response.data
      );

      const threatData =
        response.data?.data || [];

      setThreats(threatData);
      setFilteredThreats(threatData);

    } catch (error) {
      console.error(
        "Failed to load threats:",
        error
      );

      setThreats([]);
      setFilteredThreats([]);

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD ON PAGE OPEN
  // =========================

  useEffect(() => {
    loadThreats();
  }, []);

  // =========================
  // FILTER THREATS
  // =========================

  useEffect(() => {
    let result = [...threats];

    // Search
    if (search.trim() !== "") {
      const searchText =
        search.toLowerCase();

      result = result.filter((threat) => {
        return (
          threat.title
            ?.toLowerCase()
            .includes(searchText) ||
          threat.source
            ?.toLowerCase()
            .includes(searchText) ||
          threat.description
            ?.toLowerCase()
            .includes(searchText) ||
          threat.affectedResource
            ?.toLowerCase()
            .includes(searchText)
        );
      });
    }

    // Severity Filter
    if (severityFilter !== "All") {
      result = result.filter(
        (threat) =>
          threat.severity ===
          severityFilter
      );
    }

    // Status Filter
    if (statusFilter !== "All") {
      result = result.filter(
        (threat) =>
          threat.status ===
          statusFilter
      );
    }

    setFilteredThreats(result);

  }, [
    search,
    severityFilter,
    statusFilter,
    threats,
  ]);

  // =========================
  // STATS
  // =========================

  const criticalThreats =
    threats.filter(
      (threat) =>
        threat.severity === "Critical"
    ).length;

  const highThreats =
    threats.filter(
      (threat) =>
        threat.severity === "High"
    ).length;

  const mediumThreats =
    threats.filter(
      (threat) =>
        threat.severity === "Medium"
    ).length;

  const resolvedThreats =
    threats.filter(
      (threat) =>
        threat.status === "Resolved" ||
        threat.status === "Closed"
    ).length;

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-400">
          Loading threat feed...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-7 text-white">

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-cyan-500/10 p-4">
            <FaHeartbeat className="text-2xl text-cyan-400" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Threat Feed
            </h1>

            <p className="mt-1 text-slate-400">
              Monitor security threats across your cloud infrastructure.
            </p>
          </div>

        </div>

        <button
          onClick={loadThreats}
          className="flex items-center justify-center gap-2 rounded-xl border border-cyan-500 px-5 py-3 font-medium text-cyan-400 transition hover:bg-cyan-500 hover:text-slate-950"
        >
          <FaSyncAlt />

          Refresh Feed
        </button>

      </div>

      {/* =========================
          LIVE MONITORING
      ========================= */}

      <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-5 py-4">

        <span className="h-3 w-3 rounded-full bg-green-400"></span>

        <span className="font-medium text-green-400">
          Live Threat Monitoring
        </span>

        <span className="text-slate-600">
          |
        </span>

        <span className="text-sm text-slate-400">
          Last updated:{" "}
          {new Date().toLocaleTimeString()}
        </span>

      </div>

      {/* =========================
          STATS
      ========================= */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        {/* Critical */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400">
                Critical Threats
              </p>

              <h2 className="mt-3 text-3xl font-bold text-red-400">
                {criticalThreats}
              </h2>
            </div>

            <div className="rounded-xl bg-slate-950 p-4">
              <FaExclamationTriangle className="text-2xl text-red-400" />
            </div>

          </div>

        </div>

        {/* High */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400">
                High Severity
              </p>

              <h2 className="mt-3 text-3xl font-bold text-orange-400">
                {highThreats}
              </h2>
            </div>

            <div className="rounded-xl bg-slate-950 p-4">
              <FaShieldAlt className="text-2xl text-orange-400" />
            </div>

          </div>

        </div>

        {/* Medium */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400">
                Medium Severity
              </p>

              <h2 className="mt-3 text-3xl font-bold text-yellow-400">
                {mediumThreats}
              </h2>
            </div>

            <div className="rounded-xl bg-slate-950 p-4">
              <FaHeartbeat className="text-2xl text-yellow-400" />
            </div>

          </div>

        </div>

        {/* Resolved */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400">
                Resolved Threats
              </p>

              <h2 className="mt-3 text-3xl font-bold text-green-400">
                {resolvedThreats}
              </h2>
            </div>

            <div className="rounded-xl bg-slate-950 p-4">
              <FaCheck className="text-2xl text-green-400" />
            </div>

          </div>

        </div>

      </div>

      {/* =========================
          FILTERS
      ========================= */}

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 lg:flex-row">

        {/* Search */}

        <div className="relative flex-1">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

          <input
            type="text"
            placeholder="Search threats..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* Severity */}

        <select
          value={severityFilter}
          onChange={(e) =>
            setSeverityFilter(e.target.value)
          }
          className="rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 text-white outline-none focus:border-cyan-500"
        >
          <option value="All">
            All Severities
          </option>

          <option value="Critical">
            Critical
          </option>

          <option value="High">
            High
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Low">
            Low
          </option>
        </select>

        {/* Status */}

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 text-white outline-none focus:border-cyan-500"
        >
          <option value="All">
            All Status
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Open">
            Open
          </option>

          <option value="Resolved">
            Resolved
          </option>

          <option value="Closed">
            Closed
          </option>
        </select>

      </div>

      {/* =========================
          TABLE HEADER
      ========================= */}

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            Security Threats
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            {filteredThreats.length} threat
            {filteredThreats.length !== 1
              ? "s"
              : ""}{" "}
            found
          </p>
        </div>

        <button
          onClick={loadThreats}
          className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
        >
          Refresh Data
        </button>

      </div>

      {/* =========================
          THREAT TABLE
      ========================= */}

      <ThreatTable
        threats={filteredThreats}
      />

    </div>
  );
}

export default ThreatFeed;