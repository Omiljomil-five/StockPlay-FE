import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Navigation from "./Navigation";

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0e27",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header onMenuClick={toggleMobileMenu} />

      <div style={{ display: "flex", flex: 1, position: "relative" }}>
        {/* Overlay - 모바일에서 사이드바 열릴 때 */}
        {isMobileMenuOpen && (
          <div
            onClick={closeMobileMenu}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
              display: window.innerWidth <= 768 ? "block" : "none",
            }}
          />
        )}

        <Navigation isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

        <main
          style={{
            flex: 1,
            padding: window.innerWidth <= 768 ? "1rem" : "2rem",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
