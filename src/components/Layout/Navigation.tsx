import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText } from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/reports", label: "Reports", icon: FileText },
];

export default function Navigation() {
  return (
    <nav
      style={{
        width: "240px",
        backgroundColor: "#111633",
        borderRight: "1px solid #1f2937",
        padding: "1.5rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
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
          })}
        >
          <item.icon size={20} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
