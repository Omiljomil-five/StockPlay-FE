import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // 7페이지 이하면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 7페이지 이상이면 축약 표시
      if (currentPage <= 3) {
        // 처음 부분
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        // 끝 부분
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        // 중간 부분
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        marginTop: "2rem",
      }}
    >
      {/* 이전 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          backgroundColor: currentPage === 1 ? "#1a1f3a" : "#111633",
          border: "1px solid #1f2937",
          borderRadius: "8px",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          opacity: currentPage === 1 ? 0.5 : 1,
        }}
        onMouseEnter={(e) => {
          if (currentPage !== 1) {
            e.currentTarget.style.backgroundColor = "#1a1f3a";
            e.currentTarget.style.borderColor = "#374151";
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== 1) {
            e.currentTarget.style.backgroundColor = "#111633";
            e.currentTarget.style.borderColor = "#1f2937";
          }
        }}
      >
        <ChevronLeft
          size={20}
          color={currentPage === 1 ? "#5f6368" : "#9aa0a6"}
        />
      </button>

      {/* 페이지 번호들 */}
      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return (
            <div
              key={`ellipsis-${index}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                color: "#5f6368",
                fontSize: "0.875rem",
              }}
            >
              ...
            </div>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              backgroundColor: isActive ? "#4c6fff" : "#111633",
              border: `1px solid ${isActive ? "#4c6fff" : "#1f2937"}`,
              borderRadius: "8px",
              color: isActive ? "#fff" : "#9aa0a6",
              fontSize: "0.875rem",
              fontWeight: isActive ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: isActive ? "0 0 20px rgba(76, 111, 255, 0.4)" : "none",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "#1a1f3a";
                e.currentTarget.style.borderColor = "#374151";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "#111633";
                e.currentTarget.style.borderColor = "#1f2937";
              }
            }}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* 다음 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          backgroundColor: currentPage === totalPages ? "#1a1f3a" : "#111633",
          border: "1px solid #1f2937",
          borderRadius: "8px",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          opacity: currentPage === totalPages ? 0.5 : 1,
        }}
        onMouseEnter={(e) => {
          if (currentPage !== totalPages) {
            e.currentTarget.style.backgroundColor = "#1a1f3a";
            e.currentTarget.style.borderColor = "#374151";
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== totalPages) {
            e.currentTarget.style.backgroundColor = "#111633";
            e.currentTarget.style.borderColor = "#1f2937";
          }
        }}
      >
        <ChevronRight
          size={20}
          color={currentPage === totalPages ? "#5f6368" : "#9aa0a6"}
        />
      </button>
    </div>
  );
}
