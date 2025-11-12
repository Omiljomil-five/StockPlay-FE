import type { PerformanceMetrics as PerformanceMetricsType } from "@/types";
import { TrendingUp, Target, Activity, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";

interface PerformanceMetricsProps {
  performance: PerformanceMetricsType;
}

export default function PerformanceMetrics({
  performance,
}: PerformanceMetricsProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const metrics = [
    {
      label: "평균 수익률",
      value: `${
        performance.avgReturn >= 0 ? "+" : ""
      }${performance.avgReturn.toFixed(2)}%`,
      icon: TrendingUp,
      color: performance.avgReturn >= 0 ? "#10b981" : "#ef4444",
      bgColor:
        performance.avgReturn >= 0
          ? "rgba(16, 185, 129, 0.1)"
          : "rgba(239, 68, 68, 0.1)",
    },
    {
      label: "승률",
      value: `${performance.winRate.toFixed(1)}%`,
      icon: Target,
      color: "#4c6fff",
      bgColor: "rgba(76, 111, 255, 0.1)",
    },
    {
      label: "Sharpe Ratio",
      value: performance.sharpeRatio.toFixed(2),
      icon: Activity,
      color: "#818cf8",
      bgColor: "rgba(129, 140, 248, 0.1)",
    },
    {
      label: "최대 낙폭",
      value: `${performance.maxDrawdown.toFixed(2)}%`,
      icon: TrendingDown,
      color: "#f59e0b",
      bgColor: "rgba(245, 158, 11, 0.1)",
    },
  ];

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
        📈 백테스트 성과 (2020-2024)
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fit, minmax(240px, 1fr))",
          gap: isMobile ? "1rem" : "1.25rem",
        }}
      >
        {metrics.map((metric, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              backgroundColor: "#111633",
              border: "1px solid #1f2937",
              borderRadius: "16px",
              padding: isMobile ? "1.5rem" : "1.75rem 1.5rem",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
              overflow: "hidden",
              minHeight: "44px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = metric.color;
              e.currentTarget.style.boxShadow = `0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 0 20px ${metric.color}44`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#1f2937";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* 배경 그라데이션 */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "120px",
                height: "120px",
                background: `radial-gradient(circle, ${metric.bgColor} 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "0.75rem" : "1rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: isMobile ? "48px" : "56px",
                  height: isMobile ? "48px" : "56px",
                  backgroundColor: metric.bgColor,
                  border: `2px solid ${metric.color}44`,
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <metric.icon
                  size={isMobile ? 24 : 28}
                  color={metric.color}
                  strokeWidth={2.5}
                />
              </div>

              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: isMobile ? "0.75rem" : "0.8125rem",
                    color: "#9aa0a6",
                    marginBottom: "0.375rem",
                    fontWeight: 500,
                  }}
                >
                  {metric.label}
                </p>
                <p
                  style={{
                    fontSize: isMobile ? "1.5rem" : "2rem",
                    fontWeight: 800,
                    color: metric.color,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {metric.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
