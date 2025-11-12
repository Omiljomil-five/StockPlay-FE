import type { SectorAnalysis } from "@/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

interface SectorChartProps {
  sectorAnalysis: SectorAnalysis[];
}

export default function SectorChart({ sectorAnalysis }: SectorChartProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Recharts용 데이터 변환
  const chartData = sectorAnalysis.map((sector) => ({
    sector: sector.sector,
    YoY: sector.avgYoYGrowth,
    MoM: sector.avgMoMGrowth,
  }));

  return (
    <div>
      <h2
        style={{
          fontSize: isMobile ? "1.25rem" : "1.5rem",
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
          padding: isMobile ? "1.5rem" : "2rem",
        }}
      >
        {/* 차트 */}
        <div
          style={{
            backgroundColor: "#0a0e27",
            borderRadius: "12px",
            padding: isMobile ? "1rem" : "1.5rem",
            marginBottom: isMobile ? "1.5rem" : "2rem",
          }}
        >
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis
                dataKey="sector"
                stroke="#9aa0a6"
                style={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}
              />
              <YAxis
                stroke="#9aa0a6"
                style={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111633",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                }}
                labelStyle={{ color: "#e8eaed" }}
              />
              <Legend
                wrapperStyle={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}
              />
              <Bar dataKey="YoY" fill="#4c6fff" name="YoY 성장률 (%)" />
              <Bar dataKey="MoM" fill="#10b981" name="MoM 성장률 (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 섹터 상세 카드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(200px, 1fr))",
            gap: isMobile ? "0.75rem" : "1rem",
          }}
        >
          {sectorAnalysis.map((sector, index) => (
            <div
              key={index}
              style={{
                padding: isMobile ? "1rem" : "1.25rem",
                backgroundColor: "#0a0e27",
                border: "1px solid #1f2937",
                borderRadius: "12px",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = sector.color;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1f2937";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* 섹터 이름 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: sector.color,
                    borderRadius: "3px",
                    flexShrink: 0,
                  }}
                />
                <h3
                  style={{
                    fontSize: isMobile ? "0.875rem" : "0.9375rem",
                    fontWeight: 600,
                    color: "#e8eaed",
                  }}
                >
                  {sector.sector}
                </h3>
              </div>

              {/* 성장률 */}
              <div style={{ marginBottom: "0.75rem" }}>
                <div
                  style={{
                    fontSize: isMobile ? "0.75rem" : "0.8125rem",
                    color: "#9aa0a6",
                    marginBottom: "0.25rem",
                  }}
                >
                  YoY 평균
                </div>
                <div
                  style={{
                    fontSize: isMobile ? "1.25rem" : "1.5rem",
                    fontWeight: 700,
                    color: "#4c6fff",
                  }}
                >
                  +{sector.avgYoYGrowth.toFixed(1)}%
                </div>
              </div>

              <div style={{ marginBottom: "0.75rem" }}>
                <div
                  style={{
                    fontSize: isMobile ? "0.75rem" : "0.8125rem",
                    color: "#9aa0a6",
                    marginBottom: "0.25rem",
                  }}
                >
                  MoM 평균
                </div>
                <div
                  style={{
                    fontSize: isMobile ? "1.25rem" : "1.5rem",
                    fontWeight: 700,
                    color: "#10b981",
                  }}
                >
                  +{sector.avgMoMGrowth.toFixed(1)}%
                </div>
              </div>

              {/* 시그널 수 */}
              <div
                style={{
                  paddingTop: "0.75rem",
                  borderTop: "1px solid #1f2937",
                }}
              >
                <span
                  style={{
                    fontSize: isMobile ? "0.75rem" : "0.8125rem",
                    color: "#9aa0a6",
                  }}
                >
                  시그널 수:{" "}
                </span>
                <span
                  style={{
                    fontSize: isMobile ? "0.875rem" : "0.9375rem",
                    fontWeight: 600,
                    color: "#e8eaed",
                  }}
                >
                  {sector.signalCount}개
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
