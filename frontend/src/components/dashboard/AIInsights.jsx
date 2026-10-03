import { useEffect, useState } from "react";

import {
  FaRobot,
  FaShieldAlt,
  FaKey,
  FaBug,
  FaDatabase,
} from "react-icons/fa";

import { getThreats } from "../../api/threatApi";

function getInsight(threat) {
  const text = `
    ${threat.title}
    ${threat.description}
    ${threat.source}
  `.toLowerCase();

  if (
    text.includes("mfa") ||
    text.includes("multi-factor") ||
    text.includes("authentication")
  ) {
    return {
      icon: <FaShieldAlt className="text-green-400" />,
      title: "Strengthen Authentication",
      description:
        "Enable Multi-Factor Authentication and review authentication policies.",
    };
  }

  if (
    text.includes("s3") ||
    text.includes("bucket") ||
    text.includes("storage")
  ) {
    return {
      icon: <FaDatabase className="text-yellow-400" />,
      title: "Review Cloud Storage",
      description:
        "Check storage permissions and remove unnecessary public access.",
    };
  }

  if (
    text.includes("key") ||
    text.includes("credential") ||
    text.includes("access")
  ) {
    return {
      icon: <FaKey className="text-cyan-400" />,
      title: "Review Access Credentials",
      description:
        "Rotate exposed or old credentials and review access permissions.",
    };
  }

  if (
    text.includes("ec2") ||
    text.includes("patch") ||
    text.includes("vulnerability") ||
    text.includes("software")
  ) {
    return {
      icon: <FaBug className="text-red-400" />,
      title: "Patch Vulnerable Resources",
      description:
        "Apply available security updates and verify the affected resources.",
    };
  }

  return {
    icon: <FaShieldAlt className="text-cyan-400" />,
    title: "Investigate Security Threat",
    description:
      "Review this threat and take appropriate remediation action.",
  };
}

function AIInsights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      const response = await getThreats();

      const threats = response.data.data || [];

      const activeThreats = threats
        .filter(
          (threat) => threat.status === "Active"
        )
        .sort((a, b) => {
          const priority = {
            Critical: 4,
            High: 3,
            Medium: 2,
            Low: 1,
          };

          return (
            (priority[b.severity] || 0) -
            (priority[a.severity] || 0)
          );
        });

      const generatedInsights = activeThreats
        .slice(0, 4)
        .map((threat) => {
          const insight = getInsight(threat);

          return {
            ...insight,
            priority: threat.severity,
            threatId: threat._id,
          };
        });

      setInsights(generatedInsights);
    } catch (error) {
      console.error(
        "Failed to load AI insights:",
        error
      );

      setInsights([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      {/* Header */}
      <div className="mb-6 flex items-center gap-3">

        <FaRobot className="text-3xl text-cyan-400" />

        <div>
          <h2 className="text-xl font-bold text-white">
            AI Security Insights
          </h2>

          <p className="text-sm text-slate-400">
            Smart recommendations generated from threats
          </p>
        </div>

      </div>

      {/* Loading */}
      {loading && (
        <div className="py-10 text-center">
          <p className="text-slate-400">
            Analyzing security threats...
          </p>
        </div>
      )}

      {/* No threats */}
      {!loading && insights.length === 0 && (
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-6 text-center">

          <FaShieldAlt className="mx-auto mb-3 text-3xl text-green-400" />

          <h3 className="font-semibold text-green-400">
            Security Looks Good
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            No active threats require immediate attention.
          </p>

        </div>
      )}

      {/* Insights */}
      {!loading && insights.length > 0 && (
        <div className="space-y-4">

          {insights.map((item) => (
            <div
              key={item.threatId}
              className="rounded-xl border border-slate-700 bg-slate-950 p-4 transition hover:border-cyan-500"
            >

              <div className="flex items-start gap-4">

                <div className="text-2xl">
                  {item.icon}
                </div>

                <div className="flex-1">

                  <h3 className="font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {item.description}
                  </p>

                  <span
                    className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      item.priority === "Critical"
                        ? "bg-red-500/20 text-red-400"
                        : item.priority === "High"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : item.priority === "Medium"
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "bg-slate-700 text-slate-300"
                    }`}
                  >
                    {item.priority}
                  </span>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default AIInsights;