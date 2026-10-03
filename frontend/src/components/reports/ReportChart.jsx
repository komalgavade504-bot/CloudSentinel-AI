import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function ReportChart({ reports = [] }) {
  const chartData = [...reports]
    .reverse()
    .map((report, index) => ({
      name: report.createdAt
        ? new Date(report.createdAt).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
            }
          )
        : `Report ${index + 1}`,

      score: Number(report.securityScore) || 0,
    }));

  // Show sample baseline if there are no reports
  const data =
    chartData.length > 0
      ? chartData
      : [
          { name: "No Data", score: 0 },
        ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        Security Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
          />

          <XAxis
            dataKey="name"
            stroke="#94a3b8"
          />

          <YAxis
            domain={[0, 100]}
            stroke="#94a3b8"
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "10px",
              color: "#ffffff",
            }}
          />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#06b6d4"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#06b6d4",
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

export default ReportChart;