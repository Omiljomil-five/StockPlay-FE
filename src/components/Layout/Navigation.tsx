import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/reports", label: "Reports", icon: FileText },
];

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Navigation({ isOpen, onClose }: NavigationProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 모바일에서는 메뉴 클릭 시 닫기
  const handleNavClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  return (
    <nav
      style={{
        width: isMobile ? "80%" : "240px",
        maxWidth: isMobile ? "300px" : "240px",
        backgroundColor: "#111633",
        borderRight: "1px solid #1f2937",
        padding: "1.5rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        position: isMobile ? "fixed" : "relative",
        top: isMobile ? 0 : "auto",
        left: isMobile ? (isOpen ? 0 : "-100%") : 0,
        bottom: isMobile ? 0 : "auto",
        zIndex: 1000,
        transition: "left 0.3s ease",
        overflowY: "auto",
      }}
    >
      {/* 닫기 버튼 - 모바일에서만 표시 */}
      {isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1rem",
          }}
        >
          <button
            onClick={onClose}
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
            <X size={24} color="#9aa0a6" />
          </button>
        </div>
      )}

      {/* 네비게이션 아이템 */}
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={handleNavClick}
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.875rem 1rem",
            borderRadius: "10px",
            color: isActive ? "#e8eaed" : "#9aa0a6",
            backgroundColor: isActive ? "#1a1f3a" : "transparent",
            border: isActive ? "1px solid #374151" : "1px solid transparent",
            transition: "all 0.2s ease",
            fontWeight: isActive ? 600 : 400,
            fontSize: "0.9375rem",
            textDecoration: "none",
            minHeight: "44px", // 터치 영역 최소 크기
          })}
        >
          <item.icon size={20} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
