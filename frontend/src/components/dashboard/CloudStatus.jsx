import { useEffect, useState } from "react";

import {
  FaAws,
  FaMicrosoft,
  FaGoogle,
} from "react-icons/fa";

import { getCloudResources } from "../../api/cloudApi";

function getProviderIcon(provider) {
  if (provider === "AWS") {
    return (
      <FaAws className="text-3xl text-orange-400" />
    );
  }

  if (provider === "Azure") {
    return (
      <FaMicrosoft className="text-3xl text-blue-400" />
    );
  }

  return (
    <FaGoogle className="text-3xl text-red-400" />
  );
}

function getProviderName(provider) {
  if (provider === "AWS") {
    return "Amazon AWS";
  }

  if (provider === "Azure") {
    return "Microsoft Azure";
  }

  return "Google Cloud";
}

function getHealthStatus(score) {
  if (score >= 90) {
    return "Healthy";
  }

  if (score >= 70) {
    return "Warning";
  }

  return "Critical";
}

function getStatusColor(status) {
  if (status === "Healthy") {
    return "bg-green-500/20 text-green-400";
  }

  if (status === "Warning") {
    return "bg-yellow-500/20 text-yellow-400";
  }

  return "bg-red-500/20 text-red-400";
}

function getProgressColor(score) {
  if (score >= 90) {
    return "bg-green-500";
  }

  if (score >= 70) {
    return "bg-yellow-500";
  }

  return "bg-red-500";
}

function CloudStatus() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD CLOUD RESOURCES
  // =========================
  const loadResources = async () => {
    try {
      setLoading(true);

      const response =
        await getCloudResources();

      setResources(
        response.data?.data || []
      );

    } catch (error) {
      console.error(
        "Cloud status error:",
        error
      );

      setResources([]);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  // =========================
  // CLOUD PROVIDERS
  // =========================
  const providers = [
    "AWS",
    "Azure",
    "GCP",
  ];

  // =========================
  // GROUP RESOURCES
  // =========================
  const clouds = providers
    .map((provider) => {
      const providerResources =
        resources.filter(
          (resource) =>
            resource.provider === provider
        );

      if (
        providerResources.length === 0
      ) {
        return null;
      }

      // Calculate average security score
      const totalScore =
        providerResources.reduce(
          (sum, resource) =>
            sum +
            (Number(
              resource.securityScore
            ) || 0),
          0
        );

      const averageScore =
        Math.round(
          totalScore /
            providerResources.length
        );

      // Count running resources
      const runningResources =
        providerResources.filter(
          (resource) =>
            resource.status === "Running"
        ).length;

      const healthStatus =
        getHealthStatus(
          averageScore
        );

      return {
        provider,

        name: getProviderName(
          provider
        ),

        resources:
          providerResources.length,

        runningResources,

        region:
          providerResources[0]
            ?.region ||
          "Not specified",

        score: averageScore,

        status: healthStatus,
      };
    })
    .filter(Boolean);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Cloud Infrastructure
        </h2>

        <p className="text-sm text-slate-400">
          Current health of connected cloud providers
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="py-8 text-center text-slate-400">
          Loading cloud infrastructure...
        </p>

      ) : clouds.length === 0 ? (

        /* EMPTY STATE */
        <p className="py-8 text-center text-slate-400">
          No cloud resources found.
        </p>

      ) : (

        <div className="space-y-5">

          {clouds.map((cloud) => (

            <div
              key={cloud.provider}
              className="rounded-xl border border-slate-700 bg-slate-950 p-5 transition hover:border-cyan-500"
            >

              {/* PROVIDER HEADER */}
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  {getProviderIcon(
                    cloud.provider
                  )}

                  <div>
                    <h3 className="font-semibold text-white">
                      {cloud.name}
                    </h3>

                    <p className="text-sm text-slate-400">
                      {cloud.region}
                    </p>
                  </div>

                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                    cloud.status
                  )}`}
                >
                  {cloud.status}
                </span>

              </div>

              {/* DETAILS */}
              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">

                <div>
                  <p className="text-slate-500">
                    Resources
                  </p>

                  <p className="font-semibold text-white">
                    {cloud.resources}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">
                    Running
                  </p>

                  <p className="font-semibold text-green-400">
                    {cloud.runningResources}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">
                    Region
                  </p>

                  <p className="font-semibold text-cyan-400">
                    {cloud.region}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">
                    Security Score
                  </p>

                  <p className="font-semibold text-white">
                    {cloud.score}%
                  </p>
                </div>

              </div>

              {/* HEALTH SCORE */}
              <div className="mt-5">

                <div className="mb-2 flex justify-between text-xs text-slate-400">

                  <span>
                    Health Score
                  </span>

                  <span>
                    {cloud.score}%
                  </span>

                </div>

                <div className="h-2 rounded-full bg-slate-700">

                  <div
                    className={`${getProgressColor(
                      cloud.score
                    )} h-2 rounded-full transition-all`}
                    style={{
                      width: `${cloud.score}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default CloudStatus;