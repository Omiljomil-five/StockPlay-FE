import { useEffect, useState } from "react";
import { getSignals } from "@/lib/api";
import type { AnalysisResult } from "@/types";
import TopPicksCard from "../components/dashboard/TopPicksCard";
import PerformanceMetrics from "../components/dashboard/PerformanceMetrics";
import SectorChart from "../components/dashboard/SectorChart";
import { TrendingUp, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    loadData();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    const response = await getSignals();

    if (response.success) {
      setData(response.data);
    } else {
      setError(response.error || "데이터를 불러오는데 실패했습니다.");
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            border: "3px solid #1f2937",
            borderTop: "3px solid #4c6fff",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <p style={{ color: "#9aa0a6", fontSize: "0.875rem" }}>
          데이터 로딩중...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div
          style={{
            padding: "2rem",
            backgroundColor: "#111633",
            borderRadius: "12px",
            border: "1px solid #1f2937",
            textAlign: "center",
            maxWidth: "400px",
          }}
        >
          <AlertCircle
            size={48}
            color="#ef4444"
            style={{ marginBottom: "1rem" }}
          />
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
            오류 발생
          </h2>
          <p
            style={{
              color: "#9aa0a6",
              fontSize: "0.875rem",
              marginBottom: "1.5rem",
            }}
          >
            {error}
          </p>
          <button
            onClick={loadData}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#4c6fff",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.875rem",
              minHeight: "44px",
              minWidth: "44px",
            }}
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* 헤더 */}
      <div style={{ marginBottom: isMobile ? "1.5rem" : "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <TrendingUp size={isMobile ? 24 : 28} color="#4c6fff" />
          <h1
            style={{
              fontSize: isMobile ? "1.5rem" : "2rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            수출 데이터 기반 주식 트레이딩 시그널
          </h1>
        </div>
        <p
          style={{
            color: "#9aa0a6",
            fontSize: isMobile ? "0.8125rem" : "0.9375rem",
            lineHeight: 1.5,
          }}
        >
          관세청 수출 데이터를 활용하여 매월 자동으로 투자 시그널을 생성합니다
        </p>
        <div
          style={{
            marginTop: "1rem",
            padding: isMobile ? "0.75rem 1rem" : "1rem 1.25rem",
            backgroundColor: "rgba(76, 111, 255, 0.1)",
            border: "1px solid rgba(76, 111, 255, 0.2)",
            borderRadius: "10px",
            display: "inline-block",
          }}
        >
          <span
            style={{
              color: "#9aa0a6",
              fontSize: isMobile ? "0.8125rem" : "0.875rem",
            }}
          >
            마지막 업데이트:
          </span>
          <span
            style={{
              color: "#4c6fff",
              fontWeight: 600,
              fontSize: isMobile ? "0.8125rem" : "0.875rem",
              marginLeft: "0.25rem",
            }}
          >
            {new Date(data.date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* 성과 지표 */}
      <PerformanceMetrics performance={data.performance} />

      {/* Top 5 추천 종목 */}
      <div
        style={{
          marginTop: isMobile ? "1.5rem" : "2rem",
          marginBottom: isMobile ? "1.5rem" : "2rem",
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? "1.25rem" : "1.5rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
            letterSpacing: "-0.01em",
          }}
        >
          🎯 Top 5 추천 종목
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {data.topPicks.slice(0, 5).map((signal, index) => (
            <TopPicksCard key={signal.id} signal={signal} rank={index + 1} />
          ))}
        </div>
      </div>

      {/* 섹터별 분석 */}
      <SectorChart sectorAnalysis={data.sectorAnalysis} />
    </div>
  );
}
