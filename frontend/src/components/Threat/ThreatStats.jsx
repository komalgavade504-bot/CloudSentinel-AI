function ThreatStats({ threats = [] }) {
  // Count threats by severity
  const criticalCount = threats.filter(
    (threat) => threat.severity === "Critical"
  ).length;

  const highCount = threats.filter(
    (threat) => threat.severity === "High"
  ).length;

  const mediumCount = threats.filter(
    (threat) => threat.severity === "Medium"
  ).length;

  const lowCount = threats.filter(
    (threat) => threat.severity === "Low"
  ).length;

  // Calculate percentages
  const totalThreats = threats.length;

  const getPercentage = (count) => {
    if (totalThreats === 0) return 0;

    return Math.round(
      (count / totalThreats) * 100
    );
  };

  const threatLevels = [
    {
      label: "Critical",
      count: criticalCount,
      percentage: getPercentage(criticalCount),
      textColor: "text-red-400",
      bgColor: "bg-red-500",
    },
    {
      label: "High",
      count: highCount,
      percentage: getPercentage(highCount),
      textColor: "text-orange-400",
      bgColor: "bg-orange-500",
    },
    {
      label: "Medium",
      count: mediumCount,
      percentage: getPercentage(mediumCount),
      textColor: "text-yellow-400",
      bgColor: "bg-yellow-500",
    },
    {
      label: "Low",
      count: lowCount,
      percentage: getPercentage(lowCount),
      textColor: "text-green-400",
      bgColor: "bg-green-500",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      
      <h2 className="mb-5 text-xl font-bold text-white">
        Threat Level
      </h2>

      <div className="space-y-4">
        
        {threatLevels.map((level) => (
          <div key={level.label}>
            
            <div className="mb-1 flex justify-between">
              <span className="text-slate-300">
                {level.label} ({level.count})
              </span>

              <span className={level.textColor}>
                {level.percentage}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-3 rounded-full ${level.bgColor} transition-all duration-500`}
                style={{
                  width: `${level.percentage}%`,
                }}
              />
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ThreatStats;