import type { TradingSignal } from "@/types";
import { TrendingUp, TrendingDown, Minus, ArrowUpRight } from "lucide-react";
import { getSectorName } from "@/types";

interface TopPicksCardProps {
  signal: TradingSignal;
  rank: number;
}

export default function TopPicksCard({ signal, rank }: TopPicksCardProps) {
  const getSignalColor = (signalType: string) => {
    switch (signalType) {
      case "BUY":
        return "#10b981";
      case "SELL":
        return "#ef4444";
      case "HOLD":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  const getSignalIcon = (signalType: string) => {
    switch (signalType) {
      case "BUY":
        return <TrendingUp size={16} />;
      case "SELL":
        return <TrendingDown size={16} />;
      case "HOLD":
        return <Minus size={16} />;
      default:
        return null;
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "HIGH":
        return "#10b981";
      case "MEDIUM":
        return "#f59e0b";
      case "LOW":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  const signalColor = getSignalColor(signal.signal);
  const confidenceColor = getConfidenceColor(signal.confidence);

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#111633",
        border: "1px solid #1f2937",
        borderRadius: "16px",
        padding: "1.5rem",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "#374151";
        e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "#1f2937";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* 랭킹 배지 */}
      <div
        style={{
          position: "absolute",
          top: "-4px",
          right: "-4px",
          width: "48px",
          height: "48px",
          background:
            rank <= 3
              ? "linear-gradient(135deg, #4c6fff 0%, #818cf8 100%)"
              : "linear-gradient(135deg, #374151 0%, #4b5563 100%)",
          borderRadius: "0 16px 0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.125rem",
          fontWeight: 800,
          color: "#fff",
          boxShadow: rank <= 3 ? "0 0 20px rgba(76, 111, 255, 0.4)" : "none",
        }}
      >
        {rank}
      </div>

      {/* 헤더 */}
      <div style={{ marginBottom: "1rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                marginBottom: "0.25rem",
                letterSpacing: "-0.01em",
              }}
            >
              {signal.symbol}
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#9aa0a6",
              }}
            >
              {signal.companyName}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              padding: "0.5rem 0.875rem",
              backgroundColor: `${signalColor}22`,
              border: `1px solid ${signalColor}44`,
              borderRadius: "8px",
              color: signalColor,
              fontSize: "0.875rem",
              fontWeight: 700,
            }}
          >
            {getSignalIcon(signal.signal)}
            {signal.signal}
          </div>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            padding: "0.375rem 0.75rem",
            backgroundColor: "#1a1f3a",
            borderRadius: "6px",
            fontSize: "0.8125rem",
            color: "#9aa0a6",
          }}
        >
          <span style={{ color: "#4c6fff" }}>●</span>
          {getSectorName(signal.sector)}
        </div>
      </div>

      {/* 수출 데이터 */}
      <div
        style={{
          backgroundColor: "#0a0e27",
          borderRadius: "10px",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#9aa0a6",
                marginBottom: "0.25rem",
              }}
            >
              YoY 성장률
            </p>
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: signal.yoyGrowth >= 0 ? "#10b981" : "#ef4444",
              }}
            >
              {signal.yoyGrowth >= 0 ? "+" : ""}
              {signal.yoyGrowth.toFixed(1)}%
            </p>
          </div>
          <div>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#9aa0a6",
                marginBottom: "0.25rem",
              }}
            >
              MoM 성장률
            </p>
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: signal.momGrowth >= 0 ? "#10b981" : "#ef4444",
              }}
            >
              {signal.momGrowth >= 0 ? "+" : ""}
              {signal.momGrowth.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* 예측 수익률 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          background: `linear-gradient(135deg, ${signalColor}11 0%, ${signalColor}22 100%)`,
          border: `1px solid ${signalColor}33`,
          borderRadius: "10px",
          marginBottom: "1rem",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.75rem",
              color: "#9aa0a6",
              marginBottom: "0.25rem",
            }}
          >
            예상 수익률 (20일)
          </p>
          <p
            style={{ fontSize: "1.75rem", fontWeight: 800, color: signalColor }}
          >
            {signal.expectedReturn20d >= 0 ? "+" : ""}
            {signal.expectedReturn20d.toFixed(2)}%
          </p>
        </div>
        <ArrowUpRight size={32} color={signalColor} strokeWidth={3} />
      </div>

      {/* 신뢰도 & 기술적 지표 */}
      <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.8125rem" }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: "#9aa0a6", marginBottom: "0.375rem" }}>신뢰도</p>
          <div
            style={{
              padding: "0.5rem",
              backgroundColor: "#1a1f3a",
              borderRadius: "6px",
              textAlign: "center",
              color: confidenceColor,
              fontWeight: 700,
            }}
          >
            {signal.confidence}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: "#9aa0a6", marginBottom: "0.375rem" }}>RSI</p>
          <div
            style={{
              padding: "0.5rem",
              backgroundColor: "#1a1f3a",
              borderRadius: "6px",
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            {signal.rsi.toFixed(1)}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: "#9aa0a6", marginBottom: "0.375rem" }}>거래량</p>
          <div
            style={{
              padding: "0.5rem",
              backgroundColor: "#1a1f3a",
              borderRadius: "6px",
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            {signal.volumeRatio.toFixed(2)}x
          </div>
        </div>
      </div>
    </div>
  );
}
