import type { TradingSignal } from "@/types";
import { TrendingUp } from "lucide-react"; // TrendingDown 추가!
import { useState, useEffect } from "react";

interface TopPicksCardProps {
  signal: TradingSignal;
  rank: number;
}

export default function TopPicksCard({ signal, rank }: TopPicksCardProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔧 숫자 안전하게 변환 (undefined 처리 추가)
  const safeToFixed = (
    value: number | string | undefined,
    decimals: number = 1
  ): string => {
    if (value === undefined || value === null) {
      return "0.0";
    }
    const num = typeof value === "string" ? parseFloat(value) : value;
    return isNaN(num) ? "0.0" : num.toFixed(decimals);
  };

  const isTopThree = rank <= 3;

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#111633",
        border: "1px solid #1f2937",
        borderRadius: "16px",
        padding: isMobile ? "1.25rem" : "1.5rem",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.borderColor = isTopThree ? "#4c6fff" : "#374151";
        e.currentTarget.style.boxShadow = isTopThree
          ? "0 20px 40px rgba(76, 111, 255, 0.3)"
          : "0 20px 25px -5px rgba(0, 0, 0, 0.3)";
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
          width: "200px",
          height: "200px",
          background: isTopThree
            ? "radial-gradient(circle, rgba(76, 111, 255, 0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(55, 65, 81, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* 랭킹 배지 */}
      <div
        style={{
          position: "absolute",
          top: "-4px",
          right: "-4px",
          width: isMobile ? "44px" : "52px",
          height: isMobile ? "44px" : "52px",
          background: isTopThree
            ? "linear-gradient(135deg, #4c6fff 0%, #818cf8 100%)"
            : "linear-gradient(135deg, #374151 0%, #4b5563 100%)",
          borderRadius: "0 16px 0 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: isMobile ? "1rem" : "1.25rem",
          fontWeight: 800,
          color: "#fff",
          boxShadow: isTopThree ? "0 4px 12px rgba(76, 111, 255, 0.4)" : "none",
        }}
      >
        {rank}
      </div>

      {/* 종목 정보 */}
      <div style={{ marginBottom: "1rem", position: "relative" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "0.75rem",
          }}
        >
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: isMobile ? "1.25rem" : "1.5rem",
                fontWeight: 800,
                color: "#e8eaed",
                letterSpacing: "-0.02em",
                marginBottom: "0.375rem",
              }}
            >
              {signal.symbol}
            </h3>
            <p
              style={{
                fontSize: isMobile ? "0.8125rem" : "0.875rem",
                color: "#9aa0a6",
                lineHeight: 1.4,
              }}
            >
              {signal.companyName}
            </p>
          </div>

          {/* 시그널 타입 배지 */}
          <div
            style={{
              padding: "0.5rem 0.875rem",
              backgroundColor:
                signal.signalType === "BUY"
                  ? "rgba(16, 185, 129, 0.2)"
                  : "rgba(239, 68, 68, 0.2)",
              border: `1px solid ${
                signal.signalType === "BUY"
                  ? "rgba(16, 185, 129, 0.4)"
                  : "rgba(239, 68, 68, 0.4)"
              }`,
              borderRadius: "8px",
              color: signal.signalType === "BUY" ? "#10b981" : "#ef4444",
              fontSize: isMobile ? "0.8125rem" : "0.875rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              flexShrink: 0,
              marginLeft: "0.75rem",
            }}
          >
            {signal.signalType}
          </div>
        </div>

        {/* 섹터 */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            padding: "0.375rem 0.75rem",
            backgroundColor: "#1a1f3a",
            border: "1px solid #374151",
            borderRadius: "6px",
            fontSize: isMobile ? "0.75rem" : "0.8125rem",
            color: "#9aa0a6",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              backgroundColor: "#4c6fff",
              borderRadius: "50%",
            }}
          />
          {signal.sector}
        </div>
      </div>

      {/* 성장률 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            padding: isMobile ? "0.875rem" : "1rem",
            backgroundColor: "#0a0e27",
            borderRadius: "10px",
            border: "1px solid #1f2937",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              marginBottom: "0.375rem",
            }}
          >
            <TrendingUp size={14} color="#10b981" />
            <span
              style={{
                fontSize: isMobile ? "0.6875rem" : "0.75rem",
                color: "#9aa0a6",
              }}
            >
              YoY 성장률
            </span>
          </div>
          <p
            style={{
              fontSize: isMobile ? "1.25rem" : "1.5rem",
              fontWeight: 700,
              color: "#10b981",
              letterSpacing: "-0.01em",
            }}
          >
            +{safeToFixed(signal.yoyGrowth)}%
          </p>
        </div>

        <div
          style={{
            padding: isMobile ? "0.875rem" : "1rem",
            backgroundColor: "#0a0e27",
            borderRadius: "10px",
            border: "1px solid #1f2937",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              marginBottom: "0.375rem",
            }}
          >
            <TrendingUp size={14} color="#10b981" />
            <span
              style={{
                fontSize: isMobile ? "0.6875rem" : "0.75rem",
                color: "#9aa0a6",
              }}
            >
              MoM 성장률
            </span>
          </div>
          <p
            style={{
              fontSize: isMobile ? "1.25rem" : "1.5rem",
              fontWeight: 700,
              color: "#10b981",
              letterSpacing: "-0.01em",
            }}
          >
            +{safeToFixed(signal.momGrowth)}%
          </p>
        </div>
      </div>

      {/* 예상 수익률 */}
      <div
        style={{
          padding: isMobile ? "1rem" : "1.25rem",
          background:
            "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.2) 100%)",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          borderRadius: "12px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            fontSize: isMobile ? "4rem" : "5rem",
            fontWeight: 900,
            color: "rgba(16, 185, 129, 0.05)",
            lineHeight: 1,
            pointerEvents: "none",
          }}
        >
          {rank}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: isMobile ? "0.75rem" : "0.8125rem",
                color: "#9aa0a6",
                marginBottom: "0.375rem",
                fontWeight: 500,
              }}
            >
              예상 수익률 <span style={{ fontSize: "0.75rem" }}>(20일)</span>
            </p>
            <p
              style={{
                fontSize: isMobile ? "1.75rem" : "2rem",
                fontWeight: 800,
                color: "#10b981",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              +{safeToFixed(signal.expectedReturn)}%
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "0.25rem",
            }}
          >
            <div
              style={{
                fontSize: isMobile ? "0.6875rem" : "0.75rem",
                color: "#9aa0a6",
              }}
            >
              신뢰도
            </div>
            <div
              style={{
                fontSize: isMobile ? "1rem" : "1.125rem",
                fontWeight: 700,
                color: "#4c6fff",
              }}
            >
              {safeToFixed(signal.confidenceScore)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
