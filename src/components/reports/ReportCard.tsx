import type { Report } from "@/types";
import { Calendar, TrendingUp, Download, ExternalLink } from "lucide-react";
import { getReportDownloadUrl } from "@/lib/api";
import { useState } from "react";

interface ReportCardProps {
  report: Report;
}

export default function ReportCard({ report }: ReportCardProps) {
  const [downloading, setDownloading] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
    });
  };

  const handleDownload = async () => {
    setDownloading(true);

    try {
      const response = await getReportDownloadUrl(report.id);

      if (response.success) {
        // 새 탭에서 PDF 열기 (실제로는 다운로드)
        window.open(response.data.url, "_blank");
      } else {
        alert("다운로드 URL을 가져올 수 없습니다.");
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("다운로드 중 오류가 발생했습니다.");
    } finally {
      setDownloading(false);
    }
  };

  const { analysisResult } = report;
  const { performance } = analysisResult;

  return (
    <div
      style={{
        backgroundColor: "#111633",
        border: "1px solid #1f2937",
        borderRadius: "16px",
        padding: "1.75rem",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
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
      {/* 헤더 */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <Calendar size={20} color="#4c6fff" />
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#e8eaed",
              }}
            >
              {formatDate(report.date)}
            </h3>
          </div>
          <p
            style={{
              fontSize: "0.8125rem",
              color: "#9aa0a6",
            }}
          >
            총 {analysisResult.totalSignals}개 시그널
          </p>
        </div>

        <button
          onClick={handleDownload}
          disabled={downloading}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.625rem 1rem",
            backgroundColor: downloading ? "#374151" : "#4c6fff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: downloading ? "not-allowed" : "pointer",
            fontSize: "0.875rem",
            fontWeight: 600,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            if (!downloading) {
              e.currentTarget.style.backgroundColor = "#6366f1";
            }
          }}
          onMouseLeave={(e) => {
            if (!downloading) {
              e.currentTarget.style.backgroundColor = "#4c6fff";
            }
          }}
        >
          {downloading ? (
            <>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid #fff",
                  borderTop: "2px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
              처리중...
            </>
          ) : (
            <>
              <Download size={16} />
              PDF
            </>
          )}
        </button>
      </div>

      {/* 성과 지표 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#0a0e27",
            borderRadius: "10px",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              color: "#9aa0a6",
              marginBottom: "0.375rem",
            }}
          >
            평균 수익률
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: performance.avgReturn >= 0 ? "#10b981" : "#ef4444",
            }}
          >
            {performance.avgReturn >= 0 ? "+" : ""}
            {performance.avgReturn.toFixed(2)}%
          </p>
        </div>

        <div
          style={{
            padding: "1rem",
            backgroundColor: "#0a0e27",
            borderRadius: "10px",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              color: "#9aa0a6",
              marginBottom: "0.375rem",
            }}
          >
            승률
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#4c6fff",
            }}
          >
            {performance.winRate.toFixed(1)}%
          </p>
        </div>

        <div
          style={{
            padding: "1rem",
            backgroundColor: "#0a0e27",
            borderRadius: "10px",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              color: "#9aa0a6",
              marginBottom: "0.375rem",
            }}
          >
            Sharpe Ratio
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#818cf8",
            }}
          >
            {performance.sharpeRatio.toFixed(2)}
          </p>
        </div>

        <div
          style={{
            padding: "1rem",
            backgroundColor: "#0a0e27",
            borderRadius: "10px",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              color: "#9aa0a6",
              marginBottom: "0.375rem",
            }}
          >
            최대 낙폭
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#f59e0b",
            }}
          >
            {performance.maxDrawdown.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Top Picks 미리보기 */}
      <div
        style={{
          padding: "1rem",
          backgroundColor: "rgba(76, 111, 255, 0.05)",
          border: "1px solid rgba(76, 111, 255, 0.1)",
          borderRadius: "10px",
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
          <TrendingUp size={16} color="#4c6fff" />
          <p
            style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#4c6fff" }}
          >
            Top 5 종목
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {analysisResult.topPicks.slice(0, 5).map((signal) => (
            <div
              key={signal.id}
              style={{
                padding: "0.375rem 0.75rem",
                backgroundColor: "#1a1f3a",
                border: "1px solid #374151",
                borderRadius: "6px",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "#e8eaed",
              }}
            >
              {signal.symbol}
            </div>
          ))}
        </div>
      </div>

      {/* 푸터 */}
      <div
        style={{
          marginTop: "1.5rem",
          paddingTop: "1rem",
          borderTop: "1px solid #1f2937",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontSize: "0.75rem", color: "#5f6368" }}>
          생성일: {new Date(report.createdAt).toLocaleDateString("ko-KR")}
        </p>
        <ExternalLink size={16} color="#9aa0a6" />
      </div>
    </div>
  );
}
