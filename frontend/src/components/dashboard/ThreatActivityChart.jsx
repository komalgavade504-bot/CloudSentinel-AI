import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { threatActivity } from "../../data/dashboardData";

function ThreatActivityChart() {
  const data = threatActivity;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-white">
            Threat Activity
          </h2>

          <p className="text-sm text-slate-400">
            Detected threats during the last 7 days
          </p>
        </div>

        <span className="rounded-lg bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400">
          Weekly
        </span>

      </div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <LineChart data={data}>

          <CartesianGrid
            stroke="#334155"
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="day"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
            allowDecimals={false}
            domain={[
              0,
              (dataMax) =>
                Math.max(dataMax + 1, 1),
            ]}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "10px",
              color: "#fff",
            }}
            formatter={(value) => [
              value,
              "Threats",
            ]}
          />

          <Line
            type="monotone"
            dataKey="threats"
            stroke="#22d3ee"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#22d3ee",
            }}
            activeDot={{
              r: 7,
            }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ThreatActivityChart;