import type { SectorAnalysis } from "@/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface SectorChartProps {
  sectorAnalysis: SectorAnalysis[];
}

export default function SectorChart({ sectorAnalysis }: SectorChartProps) {
  const chartData = sectorAnalysis.map((sector) => ({
    name: sector.sectorName,
    yoy: sector.avgYoyGrowth,
    mom: sector.avgMomGrowth,
    count: sector.signalCount,
  }));

  const colors = [
    "#4c6fff",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#818cf8",
    "#34d399",
  ];

  return (
    <div>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          marginBottom: "1.5rem",
          letterSpacing: "-0.01em",
        }}
      >
        📊 섹터별 분석
      </h2>

      <div
        style={{
          backgroundColor: "#111633",
          border: "1px solid #1f2937",
          borderRadius: "16px",
          padding: "2rem",
        }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            섹터별 평균 성장률 (YoY)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis
                dataKey="name"
                stroke="#9aa0a6"
                style={{ fontSize: "0.75rem" }}
              />
              <YAxis
                stroke="#9aa0a6"
                style={{ fontSize: "0.75rem" }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1f3a",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                }}
                labelStyle={{ color: "#e8eaed", fontWeight: 600 }}
                itemStyle={{ color: "#9aa0a6" }}
                formatter={(value: number) => [
                  `${value.toFixed(2)}%`,
                  "YoY 성장률",
                ]}
              />
              <Bar dataKey="yoy" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          {sectorAnalysis.map((sector, index) => (
            <div
              key={sector.sector}
              style={{
                padding: "1rem",
                backgroundColor: "#0a0e27",
                borderRadius: "10px",
                border: "1px solid #1f2937",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: colors[index % colors.length],
                    borderRadius: "3px",
                  }}
                />
                <p style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                  {sector.sectorName}
                </p>
              </div>
              <div style={{ fontSize: "0.8125rem", color: "#9aa0a6" }}>
                <p>
                  시그널 수:{" "}
                  <span style={{ color: "#e8eaed", fontWeight: 600 }}>
                    {sector.signalCount}개
                  </span>
                </p>
                <p>
                  평균 YoY:{" "}
                  <span
                    style={{
                      color: sector.avgYoyGrowth >= 0 ? "#10b981" : "#ef4444",
                      fontWeight: 600,
                    }}
                  >
                    {sector.avgYoyGrowth >= 0 ? "+" : ""}
                    {sector.avgYoyGrowth.toFixed(1)}%
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
