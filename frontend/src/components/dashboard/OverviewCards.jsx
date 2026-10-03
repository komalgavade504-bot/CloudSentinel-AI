import {
  FaExclamationTriangle,
  FaShieldAlt,
  FaCloud,
  FaCheckCircle,
} from "react-icons/fa";

function OverviewCards({ stats }) {

  const cards = [
    {
      title: "Total Threats",
      value: stats.totalThreats,
      change: "Detected Threats",
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      progress: Math.min(stats.totalThreats * 20, 100),

      icon: (
        <FaExclamationTriangle className="text-2xl text-red-400" />
      ),
    },

    {
      title: "Vulnerabilities",
      value: stats.vulnerabilityFindings,
      change: "Issues Found",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      progress: Math.min(
        stats.vulnerabilityFindings * 2,
        100
      ),

      icon: (
        <FaShieldAlt className="text-2xl text-yellow-400" />
      ),
    },

    {
      title: "Cloud Resources",
      value: stats.totalResources,
      change: "Total Connected",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      progress: 100,

      icon: (
        <FaCloud className="text-2xl text-cyan-400" />
      ),
    },

    {
      title: "Security Score",
      value: `${stats.securityScore}%`,
      change: "Overall Protection",
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      progress: stats.securityScore,

      icon: (
        <FaCheckCircle className="text-2xl text-green-400" />
      ),
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {cards.map((card, index) => (

        <div
          key={index}
          className={`rounded-2xl border ${card.border} ${card.bg} p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-cyan-500/20`}
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-400">
                {card.title}
              </p>

              <h2
                className={`mt-2 text-3xl font-bold ${card.color}`}
              >
                {card.value}
              </h2>

              <p className="mt-2 text-sm text-slate-300">
                {card.change}
              </p>

            </div>

            <div className="rounded-xl bg-slate-900 p-4">
              {card.icon}
            </div>

          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-700">

            <div
              className="h-full rounded-full bg-cyan-400 transition-all duration-700"
              style={{
                width: `${card.progress}%`,
              }}
            />

          </div>

        </div>

      ))}

    </div>
  );
}

export default OverviewCards;