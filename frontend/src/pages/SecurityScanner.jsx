import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import LoadingSpinner from "../components/common/LoadingSpinner";

import ScannerCard from "../components/Scanner/ScannerCard";
import ScanProgress from "../components/Scanner/ScanProgress";
import SecurityScore from "../components/Scanner/SecurityScore";
import VulnerabilityTable from "../components/Scanner/VulnerabilityTable";
import ScanHistory from "../components/Scanner/ScanHistory";

// Backend API
const API_URL = "http://localhost:5000/api/scanner";

function SecurityScanner() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [search, setSearch] = useState("");
  const [scans, setScans] = useState([]);

  // =========================
  // LOAD ALL SCANS
  // =========================
  const loadScans = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load scans."
        );
      }

      setScans(data.data || []);

    } catch (error) {
      console.error("Scanner load error:", error);

      toast.error(
        error.message || "Failed to load scan history."
      );

      setScans([]);

    } finally {
      setLoading(false);
    }
  }, []);

  // =========================
  // LOAD DATA ON PAGE OPEN
  // =========================
  useEffect(() => {
    loadScans();
  }, [loadScans]);

  // =========================
  // FILTER SCANS BY SEARCH
  // =========================
  const filteredScans = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return scans;
    }

    return scans.filter((scan) => {
      return (
        scan.resourceName
          ?.toLowerCase()
          .includes(query) ||
        scan.scanType
          ?.toLowerCase()
          .includes(query) ||
        scan.riskLevel
          ?.toLowerCase()
          .includes(query) ||
        scan.status
          ?.toLowerCase()
          .includes(query)
      );
    });

  }, [search, scans]);

  // =========================
  // START SECURITY SCAN
  // =========================
  const startScan = async () => {
    if (scanning) return;

    try {
      setScanning(true);
      setProgress(0);

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          resourceName: "Production EC2",
          scanType: "Full",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to start scan."
        );
      }

      toast.success("Security scan started.");

      // =========================
      // SIMULATE SCAN PROGRESS
      // =========================
      let value = 0;

      await new Promise((resolve) => {
        const interval = setInterval(() => {
          value += 10;

          setProgress(value);

          if (value >= 100) {
            clearInterval(interval);
            resolve();
          }

        }, 300);
      });

      await loadScans();

      toast.success(
        "Security Scan Completed!"
      );

    } catch (error) {
      console.error(
        "Security scanner error:",
        error
      );

      toast.error(
        error.message ||
        "Unable to start security scan."
      );

    } finally {
      setScanning(false);
    }
  };

  // =========================
  // SUMMARY COUNTERS
  // =========================

  const totalScans = scans.length;

  const criticalIssues = scans.filter(
    (scan) => scan.riskLevel === "High"
  ).length;

  const vulnerabilities = scans.reduce(
    (sum, scan) =>
      sum + (Number(scan.findings) || 0),
    0
  );

  const completedScans = scans.filter(
    (scan) => scan.status === "Completed"
  ).length;

  // =========================
  // SECURITY SCORE
  // =========================

  const securityScore = useMemo(() => {
    if (scans.length === 0) {
      return 100;
    }

    const total = scans.reduce(
      (sum, scan) =>
        sum +
        (Number(scan.securityScore) || 0),
      0
    );

    return Math.round(total / scans.length);

  }, [scans]);

  // =========================
  // REFRESH
  // =========================

  const handleRefresh = async () => {
    await loadScans();

    toast.success("Scanner data refreshed!");
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Security Scanner
          </h1>

          <p className="mt-2 text-slate-400">
            Scan your cloud infrastructure for vulnerabilities.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search Resource..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white outline-none transition focus:border-cyan-400"
          />

          {/* REFRESH */}

          <button
            onClick={handleRefresh}
            disabled={scanning}
            className="rounded-xl border border-cyan-500 px-5 py-2 text-cyan-400 transition hover:bg-cyan-500 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Refresh
          </button>

          {/* START SCAN */}

          <button
            onClick={startScan}
            disabled={scanning}
            className="rounded-xl bg-cyan-500 px-6 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {scanning
              ? `Scanning ${progress}%`
              : "Start Scan"}
          </button>

        </div>
      </div>

      {/* SUMMARY CARDS */}

      <div className="grid gap-6 md:grid-cols-4">

        <ScannerCard
          title="Total Scans"
          value={totalScans}
          color="text-cyan-400"
        />

        <ScannerCard
          title="Critical Issues"
          value={criticalIssues}
          color="text-red-400"
        />

        <ScannerCard
          title="Vulnerabilities"
          value={vulnerabilities}
          color="text-yellow-400"
        />

        <ScannerCard
          title="Completed"
          value={completedScans}
          color="text-green-400"
        />

      </div>

      {/* PROGRESS + SECURITY SCORE */}

      <div className="grid gap-6 lg:grid-cols-2">

        <ScanProgress
          progress={progress}
        />

        <SecurityScore
          score={securityScore}
        />

      </div>

      {/* VULNERABILITIES */}

      <div>

        <div className="mb-4 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">
            Vulnerabilities
          </h2>

          {search && (
            <span className="text-sm text-slate-400">
              {filteredScans.length} result
              {filteredScans.length !== 1 ? "s" : ""}
            </span>
          )}

        </div>

        {filteredScans.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-700 py-12 text-center">

            <h2 className="text-xl font-bold text-slate-300">
              No Scans Found
            </h2>

            <p className="mt-2 text-slate-500">
              No scan matches "{search}".
            </p>

          </div>

        ) : (

          <VulnerabilityTable
            scans={filteredScans}
          />

        )}

      </div>

      {/* SCAN HISTORY */}

      {filteredScans.length > 0 && (

        <ScanHistory
          scans={filteredScans}
        />

      )}

    </div>
  );
}

export default SecurityScanner;