"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data: { week: string; value: number }[] = [
  { week: "Week 1", value: 32 },
  { week: "Week 2", value: 38 },
  { week: "Week 3", value: 42 },
  { week: "Week 4", value: 47 },
];

export default function KpiSparkline() {
  return (
    <div className="h-28 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <defs>
            <linearGradient id="kpiStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.9} />
            </linearGradient>
            <linearGradient id="kpiFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#020617" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              border: "1px solid rgba(148,163,184,0.5)",
              borderRadius: 10,
              padding: "6px 10px",
            }}
            labelStyle={{ color: "#e5e7eb", fontSize: 11 }}
            itemStyle={{ color: "#a5b4fc", fontSize: 11 }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#kpiStroke)"
            strokeWidth={2.2}
            dot={false}
            activeDot={{
              r: 4,
              stroke: "#22c55e",
              strokeWidth: 1.6,
              fill: "#020617",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
