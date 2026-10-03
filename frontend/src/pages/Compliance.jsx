import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import ComplianceCard from "../components/compliance/ComplianceCard";
import ComplianceChart from "../components/compliance/ComplianceChart";
import FrameworkTable from "../components/compliance/FrameworkTable";
import AuditHistory from "../components/compliance/AuditHistory";

import { getCompliance } from "../api/complianceApi";

function Compliance() {
  const [frameworks, setFrameworks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load compliance data from MongoDB
  const loadCompliance = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getCompliance();

      setFrameworks(response.data.data || []);
    } catch (error) {
      console.error("Failed to load compliance:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load compliance data."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCompliance();
  }, [loadCompliance]);

  // Number of compliant frameworks
  const compliant = frameworks.filter(
    (item) => item.status === "Compliant"
  ).length;

  // Number needing review
  const review = frameworks.filter(
    (item) => item.status === "Needs Review"
  ).length;

  // Number in progress
  const progress = frameworks.filter(
    (item) => item.status === "In Progress"
  ).length;

  // Average compliance score
  const averageScore = useMemo(() => {
    if (frameworks.length === 0) {
      return 0;
    }

    const total = frameworks.reduce(
      (sum, item) => sum + (Number(item.score) || 0),
      0
    );

    return Math.round(total / frameworks.length);
  }, [frameworks]);

  // Loading screen
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400" />

          <p className="mt-4 text-slate-400">
            Loading compliance data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Compliance Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Monitor compliance across security frameworks.
          </p>
        </div>

        <button
          onClick={loadCompliance}
          className="w-fit rounded-xl border border-cyan-500 px-5 py-2 text-cyan-400 transition hover:bg-cyan-500 hover:text-slate-950"
        >
          Refresh
        </button>

      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">

        <ComplianceCard
          title="Average Score"
          value={`${averageScore}%`}
          color="text-cyan-400"
        />

        <ComplianceCard
          title="Compliant"
          value={compliant}
          color="text-green-400"
        />

        <ComplianceCard
          title="Needs Review"
          value={review}
          color="text-yellow-400"
        />

        <ComplianceCard
          title="In Progress"
          value={progress}
          color="text-purple-400"
        />

      </div>

      {/* Chart + Audit History */}
      <div className="grid gap-6 lg:grid-cols-2">

        <ComplianceChart
          frameworks={frameworks}
        />

        <AuditHistory
          frameworks={frameworks}
        />

      </div>

      {/* Framework Table */}
      <div>

        <h2 className="mb-4 text-2xl font-bold text-white">
          Compliance Frameworks
        </h2>

        {frameworks.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 py-16 text-center">

            <h3 className="text-xl font-semibold text-slate-300">
              No Compliance Frameworks
            </h3>

            <p className="mt-2 text-slate-500">
              No compliance data has been added yet.
            </p>

          </div>

        ) : (

          <FrameworkTable
            frameworks={frameworks}
          />

        )}

      </div>

    </div>
  );
}

export default Compliance;