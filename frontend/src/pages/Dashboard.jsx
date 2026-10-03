import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import LoadingSpinner from "../components/common/LoadingSpinner";

import OverviewCards from "../components/dashboard/OverviewCards";
import ThreatActivityChart from "../components/dashboard/ThreatActivityChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import AIInsights from "../components/dashboard/AIInsights";
import CloudStatus from "../components/dashboard/CloudStatus";

// Backend API
const API_URL = "http://localhost:5000/api/dashboard";

function Dashboard() {
  const [stats, setStats] = useState({
    totalResources: 0,
    totalThreats: 0,
    securityScore: 0,
    vulnerabilityFindings: 0,
    complianceScore: 0,
  });

  const [loading, setLoading] = useState(true);

  const [refreshKey, setRefreshKey] = useState(0);

  // =========================
  // LOAD DASHBOARD DATA
  // =========================

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load dashboard data."
        );
      }

      setStats(data.data);

    } catch (error) {
      console.error(
        "Dashboard load error:",
        error
      );

      toast.error(
        error.message || "Failed to load dashboard."
      );

      setStats({
        totalResources: 0,
        totalThreats: 0,
        securityScore: 0,
        vulnerabilityFindings: 0,
        complianceScore: 0,
      });

    } finally {
      setLoading(false);
    }
  }, []);

  // =========================
  // LOAD ON PAGE OPEN
  // =========================

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  // =========================
  // REFRESH DASHBOARD
  // =========================

  const handleRefresh = async () => {
    await loadDashboard();

    setRefreshKey((prev) => prev + 1);

    toast.success("Dashboard refreshed!");
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8 text-white">

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Security Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Welcome back! Here's an overview of your cloud security posture.
          </p>
        </div>

        <div className="flex items-center gap-3">

          {/* REFRESH BUTTON */}

          <button
            onClick={handleRefresh}
            className="rounded-lg border border-cyan-500 px-4 py-2 text-cyan-400 transition hover:bg-cyan-500 hover:text-slate-950"
          >
            Refresh Dashboard
          </button>

          {/* SECURITY STATUS */}

          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3">

            <p className="text-sm text-slate-300">
              Overall Security Status
            </p>

            <h2 className="text-xl font-bold text-cyan-400">

              {stats.securityScore >= 80
                ? "Protected"
                : stats.securityScore >= 50
                ? "Moderate Risk"
                : "High Risk"}

            </h2>

          </div>

        </div>

      </div>

      {/* OVERVIEW CARDS */}

      <OverviewCards stats={stats} />

      {/* THREAT ACTIVITY + AI INSIGHTS */}

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">

          <ThreatActivityChart
            key={`chart-${refreshKey}`}
          />

        </div>

        <div>

          <AIInsights
            key={`insights-${refreshKey}`}
          />

        </div>

      </div>

      {/* RECENT ACTIVITY + CLOUD STATUS */}

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">

          <RecentActivity
            key={`activity-${refreshKey}`}
          />

        </div>

        <div>

          <CloudStatus
            key={`cloud-${refreshKey}`}
          />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;