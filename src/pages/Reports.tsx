import { useEffect, useState } from "react";
import { getReports } from "@/lib/api";
import type { Report } from "@/types";
import ReportCard from "../components/reports/ReportCard";
import Pagination from "../components/reports/Pagination";
import { FileText, AlertCircle } from "lucide-react";

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    loadReports();
  }, [currentPage]);

  const loadReports = async () => {
    setLoading(true);
    setError(null);

    const offset = (currentPage - 1) * itemsPerPage;
    const response = await getReports({ limit: itemsPerPage, offset });

    if (response.success) {
      setReports(response.data.reports);
      setTotal(response.data.total);
    } else {
      setError(response.error || "리포트를 불러오는데 실패했습니다.");
    }

    setLoading(false);
  };

  const totalPages = Math.ceil(total / itemsPerPage);

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
          리포트 로딩중...
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
            onClick={loadReports}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#4c6fff",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.875rem",
            }}
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <div
          style={{
            padding: "3rem",
            backgroundColor: "#111633",
            borderRadius: "16px",
            border: "1px solid #1f2937",
            textAlign: "center",
            maxWidth: "500px",
          }}
        >
          <FileText
            size={64}
            color="#4c6fff"
            style={{ marginBottom: "1.5rem", opacity: 0.5 }}
          />
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>
            리포트가 없습니다
          </h2>
          <p style={{ color: "#9aa0a6", fontSize: "0.9375rem" }}>
            아직 생성된 리포트가 없습니다. 첫 번째 리포트가 생성되면 여기에
            표시됩니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* 헤더 */}
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "0.5rem",
          }}
        >
          <FileText size={28} color="#4c6fff" />
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            과거 리포트
          </h1>
        </div>
        <p
          style={{
            color: "#9aa0a6",
            fontSize: "0.9375rem",
          }}
        >
          매월 생성된 트레이딩 시그널 리포트를 확인하고 다운로드할 수 있습니다
        </p>
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem 1.25rem",
            backgroundColor: "rgba(76, 111, 255, 0.1)",
            border: "1px solid rgba(76, 111, 255, 0.2)",
            borderRadius: "10px",
            display: "inline-block",
          }}
        >
          <span style={{ color: "#9aa0a6", fontSize: "0.875rem" }}>총 </span>
          <span
            style={{ color: "#4c6fff", fontWeight: 700, fontSize: "0.875rem" }}
          >
            {total}개
          </span>
          <span style={{ color: "#9aa0a6", fontSize: "0.875rem" }}>
            {" "}
            리포트
          </span>
        </div>
      </div>

      {/* 리포트 목록 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
