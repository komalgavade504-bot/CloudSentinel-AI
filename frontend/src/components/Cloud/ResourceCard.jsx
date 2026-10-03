import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function ResourceCard({ resource }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    console.log("VIEW DETAILS CLICKED");
    console.log("Resource ID:", resource._id);

    navigate(`/cloud-resources/${resource._id}`);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      <div className="flex items-center justify-between">
        <div className="text-4xl">
          {resource.icon || "☁️"}
        </div>

        <StatusBadge status={resource.status} />
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-bold text-white">
          {resource.name}
        </h2>

        <p className="text-sm text-slate-400">
          {resource.service || "Cloud Resource"}
        </p>
      </div>

      <div className="mt-5 space-y-2 text-sm">

        <div className="flex justify-between">
          <span className="text-slate-400">Region</span>

          <span className="text-cyan-400">
            {resource.region || "N/A"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Risk Level</span>

          <span
            className={
              resource.riskLevel === "High"
                ? "text-red-400"
                : resource.riskLevel === "Medium"
                ? "text-yellow-400"
                : "text-green-400"
            }
          >
            {resource.riskLevel || "Low"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Findings</span>

          <span className="text-yellow-400">
            {resource.findings ?? 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Security Score</span>

          <span className="text-green-400">
            {resource.securityScore ?? 100}%
          </span>
        </div>

      </div>

      <div className="mt-5 text-xs text-slate-500">
        Last Updated:{" "}
        {resource.updatedAt
          ? new Date(resource.updatedAt).toLocaleString()
          : "N/A"}
      </div>

      <button
        type="button"
        onClick={handleViewDetails}
        className="mt-6 block w-full rounded-xl bg-cyan-500 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        View Details
      </button>

    </div>
  );
}

export default ResourceCard;