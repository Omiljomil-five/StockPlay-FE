import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";

export default function Layout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0e27",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <Navigation />
        <main
          style={{
            flex: 1,
            padding: "2rem",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
