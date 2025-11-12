import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      style={{
        height: "64px",
        backgroundColor: "#111633",
        borderBottom: "1px solid #1f2937",
        display: "flex",
        alignItems: "center",
        padding: isMobile ? "0 1rem" : "0 2rem",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flex: 1,
        }}
      >
        {/* 햄버거 메뉴 - 모바일에서만 표시 */}
        {isMobile && (
          <button
            onClick={onMenuClick}
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              borderRadius: "8px",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1a1f3a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <Menu size={24} color="#4c6fff" />
          </button>
        )}

        {/* 로고 */}
        <img
          src="/assets/StockPlay.png"
          alt="StockPlay Logo"
          style={{
            height: isMobile ? "210px" : "240px",
            width: "auto",
          }}
        />
      </div>

      {/* 실시간 데이터 분석중 - 데스크톱에서만 표시 */}
      {!isMobile && (
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#1a1f3a",
              borderRadius: "8px",
              fontSize: "0.875rem",
              color: "#9aa0a6",
            }}
          >
            <span style={{ color: "#4c6fff", fontWeight: 600 }}>실시간</span>{" "}
            데이터 분석중
          </div>
        </div>
      )}
    </header>
  );
}
