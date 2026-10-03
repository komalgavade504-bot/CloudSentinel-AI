import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ReportCard from "../components/reports/ReportCard";
import ReportChart from "../components/reports/ReportChart";
import ReportTable from "../components/reports/ReportTable";
import ExportButtons from "../components/reports/ExportButtons";

import {
  getReports,
  createReport,
} from "../api/reportApi";

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  // =========================
  // LOAD REPORTS
  // =========================
  const loadReports = async () => {
    try {
      setLoading(true);

      const response = await getReports();

      const reportData = response.data?.data || [];

      setReports(reportData);
    } catch (error) {
      console.error("Failed to load reports:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load reports."
      );

      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD ON PAGE OPEN
  // =========================
  useEffect(() => {
    loadReports();
  }, []);

  // =========================
  // GENERATE NEW REPORT
  // =========================
  const generateReport = async () => {
    if (generating) return;

    try {
      setGenerating(true);

      const totalResources = 1;
      const totalThreats = 1;
      const securityScore = 95;

      await createReport({
        reportName: `CloudSentinel Security Report - ${new Date().toLocaleDateString()}`,
        reportType: "Security",
        generatedBy: "Admin",
        status: "Generated",
        totalResources,
        totalThreats,
        securityScore,
      });

      toast.success(
        "Security report generated successfully!"
      );

      await loadReports();

    } catch (error) {
      console.error(
        "Report generation error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to generate report."
      );
    } finally {
      setGenerating(false);
    }
  };

  // =========================
  // LATEST REPORT
  // =========================
  const latestReport =
    reports.length > 0
      ? reports[0]
      : {
          securityScore: 95,
          totalThreats: 1,
          totalResources: 1,
        };

  // =========================
  // LOADING SCREEN
  // =========================
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400" />

          <p className="mt-4 text-slate-400">
            Loading security reports...
          </p>

        </div>
      </div>
    );
  }

  // =========================
  // REPORTS PAGE
  // =========================
  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Security Reports
          </h1>

          <p className="mt-2 text-slate-400">
            Generate, analyze, and download cloud security reports.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          {/* REFRESH */}
          <button
            onClick={loadReports}
            disabled={loading || generating}
            className="
              rounded-xl
              border
              border-cyan-500
              px-5
              py-3
              font-medium
              text-cyan-400
              transition
              hover:bg-cyan-500
              hover:text-slate-950
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Refresh
          </button>

          {/* GENERATE REPORT */}
          <button
            onClick={generateReport}
            disabled={generating}
            className="
              rounded-xl
              bg-cyan-500
              px-5
              py-3
              font-semibold
              text-slate-950
              transition
              hover:bg-cyan-400
              disabled:cursor-not-allowed
              disabled:bg-slate-700
              disabled:text-slate-400
            "
          >
            {generating
              ? "Generating..."
              : "Generate Report"}
          </button>

          {/* EXPORT */}
          <ExportButtons reports={reports} />

        </div>

      </div>


      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <ReportCard
          title="Security Score"
          value={`${latestReport.securityScore || 0}%`}
          color="text-cyan-400"
        />

        <ReportCard
          title="Active Threats"
          value={latestReport.totalThreats || 0}
          color="text-red-400"
        />

        <ReportCard
          title="Cloud Resources"
          value={latestReport.totalResources || 0}
          color="text-green-400"
        />

        <ReportCard
          title="Generated Reports"
          value={reports.length}
          color="text-yellow-400"
        />

      </div>


      {/* ================= REPORT OVERVIEW ================= */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* SECURITY STATUS */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

          <h2 className="text-xl font-bold text-white">
            Security Overview
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Current cloud security status.
          </p>

          <div className="mt-6 space-y-4">

            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                Security Score
              </span>

              <span className="font-bold text-cyan-400">
                {latestReport.securityScore || 0}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                Recorded Threats
              </span>

              <span className="font-bold text-red-400">
                {latestReport.totalThreats || 0}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                Cloud Resources
              </span>

              <span className="font-bold text-green-400">
                {latestReport.totalResources || 0}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                Compliance Score
              </span>

              <span className="font-bold text-yellow-400">
                80%
              </span>
            </div>

          </div>

        </div>


        {/* SECURITY RECOMMENDATIONS */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

          <h2 className="text-xl font-bold text-white">
            Recommended Actions
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Priority actions based on your security data.
          </p>

          <ol className="mt-6 space-y-3 text-sm text-slate-300">

            <li className="flex gap-3">
              <span className="font-bold text-cyan-400">
                01
              </span>

              Review critical and high-risk threats.
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-cyan-400">
                02
              </span>

              Investigate suspicious login activity.
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-cyan-400">
                03
              </span>

              Review IAM permissions and access controls.
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-cyan-400">
                04
              </span>

              Fix compliance controls marked for review.
            </li>

          </ol>

        </div>


        {/* REPORT STATUS */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

          <h2 className="text-xl font-bold text-white">
            Report Status
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Summary of generated reports.
          </p>

          <div className="mt-6 space-y-5">

            <div className="rounded-xl bg-slate-950 p-4">

              <p className="text-sm text-slate-400">
                Total Reports
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {reports.length}
              </p>

            </div>

            <div className="rounded-xl bg-slate-950 p-4">

              <p className="text-sm text-slate-400">
                Latest Status
              </p>

              <p className="mt-1 font-semibold text-green-400">
                {reports.length > 0
                  ? latestReport.status || "Generated"
                  : "No reports"}
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* ================= SECURITY TREND ================= */}
      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

        <h2 className="mb-2 text-xl font-bold text-white">
          Security Trend
        </h2>

        <p className="mb-6 text-sm text-slate-400">
          Security score across generated reports.
        </p>

        <ReportChart reports={reports} />

      </div>


      {/* ================= REPORT TABLE ================= */}
      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

        <div className="mb-6">

          <h2 className="text-2xl font-bold text-white">
            Available Reports
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            View all generated CloudSentinel security reports.
          </p>

        </div>

        <ReportTable reports={reports} />

      </div>

    </div>
  );
}

export default Reports;