import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import LoadingSpinner from "../components/common/LoadingSpinner";

function ResourceDetails() {
  const { id } = useParams();

  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResource = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Resource ID from URL:", id);

        const response = await fetch(
          `http://localhost:5000/api/cloud-resources/${id}`
        );

        const result = await response.json();

        console.log("Backend response:", result);

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch resource"
          );
        }

        if (!result.success || !result.data) {
          throw new Error("Resource not found");
        }

        setResource(result.data);
      } catch (error) {
        console.error("Resource details error:", error);
        setError(error.message);
        setResource(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResource();
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !resource) {
    return (
      <div className="min-h-screen bg-slate-950 p-6 text-white">
        <div className="rounded-2xl border border-red-900 bg-slate-900 p-8">
          <h1 className="text-3xl font-bold text-red-400">
            Resource Not Found
          </h1>

          <p className="mt-3 text-slate-400">
            {error || "The requested cloud resource does not exist."}
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Resource ID: {id}
          </p>

          <Link
            to="/cloud-resources"
            className="mt-6 inline-block rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
          >
            ← Back to Cloud Resources
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            {resource.name}
          </h1>

          <p className="mt-2 text-slate-400">
            Detailed information about this cloud resource.
          </p>
        </div>

        <Link
          to="/cloud-resources"
          className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
        >
          ← Back
        </Link>
      </div>

      {/* Overview Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">
            Resource
          </p>

          <h2 className="mt-3 text-2xl font-bold text-cyan-400">
            {resource.name}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">
            Provider
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {resource.provider}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">
            Risk Level
          </p>

          <h2
            className={`mt-3 text-3xl font-bold ${
              resource.riskLevel === "High"
                ? "text-red-400"
                : resource.riskLevel === "Medium"
                ? "text-yellow-400"
                : "text-green-400"
            }`}
          >
            {resource.riskLevel || "Low"}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">
            Status
          </p>

          <h2
            className={`mt-3 text-3xl font-bold ${
              resource.status === "Running"
                ? "text-green-400"
                : resource.status === "Stopped"
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          >
            {resource.status}
          </h2>
        </div>

      </div>

      {/* Resource Information */}
      <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="mb-6 text-2xl font-bold">
          Resource Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <p className="text-slate-400">
              Resource Name
            </p>

            <p className="mt-1 font-semibold text-white">
              {resource.name || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-slate-400">
              Provider
            </p>

            <p className="mt-1 font-semibold text-white">
              {resource.provider || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-slate-400">
              Resource Type
            </p>

            <p className="mt-1 font-semibold text-white">
              {resource.type || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-slate-400">
              Region
            </p>

            <p className="mt-1 font-semibold text-white">
              {resource.region || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-slate-400">
              Security Score
            </p>

            <p className="mt-1 text-2xl font-bold text-cyan-400">
              {resource.securityScore ?? 0}%
            </p>
          </div>

          <div>
            <p className="text-slate-400">
              Risk Level
            </p>

            <p className="mt-1 font-semibold text-white">
              {resource.riskLevel || "Low"}
            </p>
          </div>

          <div>
            <p className="text-slate-400">
              Created At
            </p>

            <p className="mt-1 font-semibold text-white">
              {resource.createdAt
                ? new Date(resource.createdAt).toLocaleString()
                : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-slate-400">
              Last Updated
            </p>

            <p className="mt-1 font-semibold text-white">
              {resource.updatedAt
                ? new Date(resource.updatedAt).toLocaleString()
                : "N/A"}
            </p>
          </div>

        </div>
      </div>

      {/* Security Status */}
      <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="mb-6 text-2xl font-bold">
          Security Status
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <p className="text-slate-400">
              Security Score
            </p>

            <div className="mt-3 h-4 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-cyan-500"
                style={{
                  width: `${resource.securityScore ?? 0}%`,
                }}
              />
            </div>

            <p className="mt-2 text-right text-sm text-cyan-400">
              {resource.securityScore ?? 0}%
            </p>
          </div>

          <div>
            <p className="text-slate-400">
              Current Risk
            </p>

            <p
              className={`mt-3 text-2xl font-bold ${
                resource.riskLevel === "High"
                  ? "text-red-400"
                  : resource.riskLevel === "Medium"
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {resource.riskLevel || "Low"}
            </p>
          </div>

        </div>
      </div>

      {/* Recommendations */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="mb-4 text-2xl font-bold">
          Security Recommendations
        </h2>

        <ul className="list-disc space-y-3 pl-6 text-slate-300">
          <li>
            Enable Multi-Factor Authentication where applicable.
          </li>

          <li>
            Review IAM permissions regularly.
          </li>

          <li>
            Apply security patches and updates.
          </li>

          <li>
            Encrypt sensitive data at rest and in transit.
          </li>

          <li>
            Continuously monitor resource activity.
          </li>
        </ul>

      </div>

    </div>
  );
}

export default ResourceDetails;