import { NavLink } from "react-router-dom";
import { TrendingUp, FileText, Mail } from "lucide-react";
import { useState, useEffect } from "react";

interface NavigationProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Navigation({
  isOpen = true,
  onClose,
}: NavigationProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { path: "/subscribe", icon: Mail, label: "구독하기" },
    { path: "/dashboard", icon: TrendingUp, label: "대시보드" },
    { path: "/reports", icon: FileText, label: "리포트" },
  ];

  const handleClick = () => {
    // 스크롤 상단으로
    window.scrollTo(0, 0);

    if (onClose) {
      onClose();
    }
  };

  const getLinkStyle = (isActive: boolean) => ({
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: isMobile ? "1rem 1.5rem" : "0.75rem 1rem",
    borderRadius: isMobile ? "0" : "8px",
    textDecoration: "none",
    color: isActive ? "#4c6fff" : "#9aa0a6",
    backgroundColor: isActive ? "rgba(76, 111, 255, 0.1)" : "transparent",
    fontWeight: isActive ? 600 : 500,
    fontSize: isMobile ? "1rem" : "0.9375rem",
    transition: "all 0.2s ease",
    borderLeft: isMobile && isActive ? "3px solid #4c6fff" : "none",
    minHeight: "44px",
    minWidth: "44px",
    cursor: "pointer",
  });

  // 모바일: 사이드바 슬라이드
  if (isMobile) {
    return (
      <aside
        style={{
          position: "fixed",
          top: "64px",
          left: 0,
          bottom: 0,
          width: "280px",
          backgroundColor: "#0a0e27",
          borderRight: "1px solid #1f2937",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          zIndex: 1000,
          overflowY: "auto",
        }}
      >
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0",
            padding: "1rem 0",
          }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => getLinkStyle(isActive)}
              onClick={handleClick}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    );
  }

  // 데스크톱: 고정 사이드바
  return (
    <aside
      style={{
        width: "240px",
        backgroundColor: "#0a0e27",
        borderRight: "1px solid #1f2937",
        padding: "1.5rem 1rem",
        position: "sticky",
        top: "64px",
        height: "calc(100vh - 64px)",
        overflowY: "auto",
      }}
    >
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => getLinkStyle(isActive)}
            onClick={handleClick}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
