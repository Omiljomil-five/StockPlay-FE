import { useEffect, useState } from "react";
import { getSignals, generatePdf } from "@/lib/api";
import type { AnalysisResult, TradingSignal } from "@/types";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<string>("1d");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 접기/펼치기 상태
  const [expandedSections, setExpandedSections] = useState<{
    BUY: boolean;
    HOLD: boolean;
    SELL: boolean;
  }>({
    BUY: true,
    HOLD: true,
    SELL: true,
  });

  useEffect(() => {
    loadData();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [period]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    const response = await getSignals({ period });

    if (response.success) {
      setData(response.data);
    } else {
      setError(response.error || "데이터를 불러오는데 실패했습니다.");
    }
    setLoading(false);
  };

  const downloadPDF = async (signal: TradingSignal) => {
    try {
      // 백엔드 스키마에 맞게 필수 필드 채우기
      const pdfRequest = {
        symbol: signal.symbol,
        companyName: signal.companyName,
        sector: signal.sector,
        signalType: signal.signalType,
        period: signal.period || '1d',
        expectedReturn: signal.expectedReturn,
        vsKospi: signal.vsKospi ?? 0,
        kospiReturn: signal.kospiReturn ?? 0,
        surpriseZ: signal.surpriseZ ?? 0,
        yoyGrowth: signal.yoyGrowth,
        confidenceScore: signal.confidenceScore,
      };

      const response = await generatePdf(pdfRequest as any);

      if (response.success && response.data.url) {
        // PDF 다운로드 URL로 새 탭 열기
        // presigned URL이면 전체 URL이므로 그대로 사용, 상대 경로면 API URL과 결합
        const downloadUrl = response.data.url.startsWith('http')
          ? response.data.url
          : `${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${response.data.url}`;
        window.open(downloadUrl, '_blank');
      } else {
        alert(response.error || "PDF 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("PDF 다운로드 실패:", error);
      alert("PDF 다운로드 중 오류가 발생했습니다.");
    }
  };

  const toggleSection = (type: "BUY" | "HOLD" | "SELL") => {
    setExpandedSections((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
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
            width: "40px",
            height: "40px",
            border: "3px solid #e5e7eb",
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
          데이터 로딩 중...
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
          padding: "2rem",
        }}
      >
        <AlertCircle size={48} color="#ef4444" />
        <p style={{ color: "#ef4444", fontSize: "1rem", fontWeight: 600 }}>
          {error}
        </p>
        <button
          onClick={loadData}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#4c6fff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!data) return null;

  const periodLabels: Record<string, string> = {
    "1d": "1일",
    "5d": "5일",
    "10d": "10일",
    "20d": "20일",
  };

  // 시그널 타입별 그룹화
  const buySignals = data.topPicks.filter((s) => s.signalType === "BUY");
  const holdSignals = data.topPicks.filter((s) => s.signalType === "HOLD");
  const sellSignals = data.topPicks.filter((s) => s.signalType === "SELL");

  return (
    <div style={{ padding: isMobile ? "1.5rem 1rem" : "2rem" }}>
      {/* 헤더 */}
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: isMobile ? "1.5rem" : "2rem",
            fontWeight: 700,
            color: "#e5e7eb",
            marginBottom: "0.5rem",
          }}
        >
          트레이딩 시그널
        </h1>
        <p style={{ color: "#9aa0a6", fontSize: "0.875rem" }}>
          AI 기반 매수/매도/홀드 추천
        </p>
      </div>

      {/* 기간 선택 버튼 */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        {Object.entries(periodLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setPeriod(key)}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: period === key ? "#4c6fff" : "#1a1f3a",
              color: period === key ? "#fff" : "#9aa0a6",
              border:
                period === key ? "2px solid #4c6fff" : "2px solid transparent",
              borderRadius: "8px",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (period !== key) {
                e.currentTarget.style.backgroundColor = "#242948";
                e.currentTarget.style.borderColor = "#4c6fff";
              }
            }}
            onMouseLeave={(e) => {
              if (period !== key) {
                e.currentTarget.style.backgroundColor = "#1a1f3a";
                e.currentTarget.style.borderColor = "transparent";
              }
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 성과 메트릭 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <MetricCard
          label="평균 수익률"
          value={`${data.performance.avgReturn.toFixed(1)}%`}
          color={data.performance.avgReturn >= 0 ? "#10b981" : "#ef4444"}
        />
        <MetricCard
          label="승률"
          value={`${data.performance.winRate.toFixed(1)}%`}
          color="#4c6fff"
        />
        <MetricCard
          label="총 시그널"
          value={`${data.totalSignals}개`}
          color="#9aa0a6"
        />
      </div>

      {/* 간단한 분포 차트 */}
      <SignalDistributionChart
        buy={buySignals.length}
        hold={holdSignals.length}
        sell={sellSignals.length}
      />

      {/* 매수 시그널 섹션 */}
      {buySignals.length > 0 && (
        <SignalSection
          title="매수"
          count={buySignals.length}
          color="#10b981"
          icon={<TrendingUp size={20} />}
          expanded={expandedSections.BUY}
          onToggle={() => toggleSection("BUY")}
          signals={buySignals}
          onDownload={downloadPDF}
          isMobile={isMobile}
        />
      )}

      {/* 홀드 시그널 섹션 */}
      {holdSignals.length > 0 && (
        <SignalSection
          title="홀드"
          count={holdSignals.length}
          color="#f59e0b"
          icon={<Minus size={20} />}
          expanded={expandedSections.HOLD}
          onToggle={() => toggleSection("HOLD")}
          signals={holdSignals}
          onDownload={downloadPDF}
          isMobile={isMobile}
        />
      )}

      {/* 매도 시그널 섹션 */}
      {sellSignals.length > 0 && (
        <SignalSection
          title="매도"
          count={sellSignals.length}
          color="#ef4444"
          icon={<TrendingDown size={20} />}
          expanded={expandedSections.SELL}
          onToggle={() => toggleSection("SELL")}
          signals={sellSignals}
          onDownload={downloadPDF}
          isMobile={isMobile}
        />
      )}

      {/* 시그널이 없을 때 */}
      {data.topPicks.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "#9aa0a6",
          }}
        >
          <p>현재 {periodLabels[period]} 시그널이 없습니다.</p>
        </div>
      )}
    </div>
  );
}

// 메트릭 카드 컴포넌트
function MetricCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        backgroundColor: "#1a1f3a",
        borderRadius: "12px",
        padding: "1.5rem",
        border: "1px solid #2a2f4a",
      }}
    >
      <p
        style={{
          color: "#9aa0a6",
          fontSize: "0.875rem",
          marginBottom: "0.5rem",
        }}
      >
        {label}
      </p>
      <p style={{ color, fontSize: "1.75rem", fontWeight: 700 }}>{value}</p>
    </div>
  );
}

// 시그널 분포 차트
function SignalDistributionChart({
  buy,
  hold,
  sell,
}: {
  buy: number;
  hold: number;
  sell: number;
}) {
  const total = buy + hold + sell;
  if (total === 0) return null;

  const buyPercent = (buy / total) * 100;
  const holdPercent = (hold / total) * 100;
  const sellPercent = (sell / total) * 100;

  return (
    <div
      style={{
        backgroundColor: "#1a1f3a",
        borderRadius: "12px",
        padding: "1.5rem",
        border: "1px solid #2a2f4a",
        marginBottom: "2rem",
      }}
    >
      <h3
        style={{
          color: "#e5e7eb",
          fontSize: "1rem",
          fontWeight: 600,
          marginBottom: "1rem",
        }}
      >
        시그널 분포
      </h3>

      {/* 막대 차트 */}
      <div
        style={{
          display: "flex",
          height: "40px",
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "1rem",
        }}
      >
        {buy > 0 && (
          <div
            style={{
              width: `${buyPercent}%`,
              backgroundColor: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            {buy}
          </div>
        )}
        {hold > 0 && (
          <div
            style={{
              width: `${holdPercent}%`,
              backgroundColor: "#f59e0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            {hold}
          </div>
        )}
        {sell > 0 && (
          <div
            style={{
              width: `${sellPercent}%`,
              backgroundColor: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            {sell}
          </div>
        )}
      </div>

      {/* 범례 */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#10b981",
              borderRadius: "2px",
            }}
          />
          <span style={{ color: "#9aa0a6", fontSize: "0.875rem" }}>
            매수 {buy}개 ({buyPercent.toFixed(0)}%)
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#f59e0b",
              borderRadius: "2px",
            }}
          />
          <span style={{ color: "#9aa0a6", fontSize: "0.875rem" }}>
            홀드 {hold}개 ({holdPercent.toFixed(0)}%)
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#ef4444",
              borderRadius: "2px",
            }}
          />
          <span style={{ color: "#9aa0a6", fontSize: "0.875rem" }}>
            매도 {sell}개 ({sellPercent.toFixed(0)}%)
          </span>
        </div>
      </div>

      {/* 데이터 기준일 */}
      <div
        style={{
          marginTop: "1rem",
          paddingTop: "1rem",
          borderTop: "1px solid #2a2f4a",
          textAlign: "center",
        }}
      >
        <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>
          데이터 기준일: {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>
    </div>
  );
}

// 시그널 섹션 (접기/펼치기)
function SignalSection({
  title,
  count,
  color,
  icon,
  expanded,
  onToggle,
  signals,
  onDownload,
  isMobile,
}: {
  title: string;
  count: number;
  color: string;
  icon: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
  signals: TradingSignal[];
  onDownload: (signal: TradingSignal) => void;
  isMobile: boolean;
}) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      {/* 섹션 헤더 (접기/펼치기 버튼) */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.5rem",
          backgroundColor: "#1a1f3a",
          border: `2px solid ${color}`,
          borderRadius: "12px",
          cursor: "pointer",
          marginBottom: expanded ? "1rem" : 0,
          transition: "all 0.2s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ color }}>{icon}</div>
          <span
            style={{
              color: "#e5e7eb",
              fontSize: "1.125rem",
              fontWeight: 600,
            }}
          >
            {title}
          </span>
          <span
            style={{
              color: "#9aa0a6",
              fontSize: "0.875rem",
            }}
          >
            {count}개
          </span>
        </div>
        {expanded ? (
          <ChevronUp size={20} color="#9aa0a6" />
        ) : (
          <ChevronDown size={20} color="#9aa0a6" />
        )}
      </button>

      {/* 시그널 카드 그리드 */}
      {expanded && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {signals.map((signal) => (
            <SignalCard
              key={signal.id}
              signal={signal}
              onDownload={onDownload}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// 시그널 카드 컴포넌트
function SignalCard({
  signal,
  onDownload,
}: {
  signal: TradingSignal;
  onDownload: (signal: TradingSignal) => void;
}) {
  const isBuy = signal.signalType === "BUY";
  const isHold = signal.signalType === "HOLD";
  const isSell = signal.signalType === "SELL";
  const [isHovered, setIsHovered] = useState(false);

  // 시그널 타입별 색상
  const borderColor = isBuy ? "#10b981" : isHold ? "#f59e0b" : "#ef4444";
  const signalColor = isBuy ? "#10b981" : isHold ? "#f59e0b" : "#ef4444";

  return (
    <div
      style={{
        backgroundColor: "#1a1f3a",
        borderRadius: "16px",
        padding: "1.5rem",
        border: `2px solid ${borderColor}`,
        transition: "all 0.3s",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 8px 24px rgba(0,0,0,0.3)"
          : "0 2px 8px rgba(0,0,0,0.1)",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 시그널 타입 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {isBuy && <TrendingUp size={24} color="#10b981" />}
          {isHold && <Minus size={24} color="#f59e0b" />}
          {isSell && <TrendingDown size={24} color="#ef4444" />}
          <span
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: signalColor,
            }}
          >
            {isBuy ? "매수" : isHold ? "홀드" : "매도"}
          </span>
        </div>
        {/* Surprise Z-Score */}
        {signal.surpriseZ !== undefined && (
          <div
            style={{
              padding: "0.25rem 0.75rem",
              backgroundColor: "#0a0e27",
              borderRadius: "6px",
            }}
          >
            <span style={{ color: "#9aa0a6", fontSize: "0.75rem" }}>
              Z: {signal.surpriseZ.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* 종목 정보 */}
      <div style={{ marginBottom: "1rem" }}>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#e5e7eb",
            marginBottom: "0.25rem",
          }}
        >
          {signal.symbol}
        </h3>
        <p style={{ color: "#9aa0a6", fontSize: "0.875rem" }}>
          {signal.sector}
        </p>
      </div>

      {/* 예상 수익률 (KOSPI 대비) */}
      <div
        style={{
          backgroundColor: "#0a0e27",
          borderRadius: "8px",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <div style={{ marginBottom: "0.5rem" }}>
          <p
            style={{
              color: "#9aa0a6",
              fontSize: "0.75rem",
              marginBottom: "0.25rem",
            }}
          >
            예상 수익률
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: signal.expectedReturn >= 0 ? "#10b981" : "#ef4444",
            }}
          >
            {signal.expectedReturn >= 0 ? "+" : ""}
            {signal.expectedReturn.toFixed(1)}%
          </p>
        </div>

        {/* KOSPI 대비 */}
        {signal.vsKospi !== undefined && (
          <div
            style={{
              paddingTop: "0.75rem",
              borderTop: "1px solid #2a2f4a",
            }}
          >
            <p style={{ color: "#9aa0a6", fontSize: "0.75rem" }}>KOSPI 대비</p>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: signal.vsKospi >= 0 ? "#10b981" : "#ef4444",
              }}
            >
              {signal.vsKospi >= 0 ? "+" : ""}
              {signal.vsKospi.toFixed(1)}%
            </p>
          </div>
        )}
      </div>

      {/* YoY Growth (하단으로 이동) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.75rem",
          backgroundColor: "#0a0e27",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      >
        <span style={{ color: "#9aa0a6", fontSize: "0.75rem" }}>
          YoY 성장률
        </span>
        <span
          style={{
            color: "#e5e7eb",
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          {signal.yoyGrowth.toFixed(1)}%
        </span>
      </div>

      {/* Surprise Z-Score 수평선 */}
      {signal.surpriseZ !== undefined && (
        <div
          style={{
            position: "relative",
            height: "24px",
            backgroundColor: "#0a0e27",
            borderRadius: "6px",
            marginBottom: "1rem",
            overflow: "hidden",
          }}
        >
          {/* 기준선 (0) */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "2px",
              backgroundColor: "#4a5568",
            }}
          />
          {/* Z-Score 인디케이터 */}
          <div
            style={{
              position: "absolute",
              left: `${Math.min(
                Math.max(((signal.surpriseZ + 3) / 6) * 100, 0),
                100
              )}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: signalColor,
              boxShadow: `0 0 8px ${signalColor}`,
            }}
          />
          {/* 라벨 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 0.5rem",
              fontSize: "0.625rem",
              color: "#6b7280",
              marginTop: "4px",
            }}
          >
            <span>-3</span>
            <span>0</span>
            <span>+3</span>
          </div>
        </div>
      )}

      {/* PDF 다운로드 버튼 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDownload(signal);
        }}
        style={{
          width: "100%",
          padding: "0.75rem",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "0.875rem",
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <Download size={16} />
        리포트 다운로드
      </button>
    </div>
  );
}
