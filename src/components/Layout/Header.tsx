export default function Header() {
  return (
    <header
      style={{
        height: "64px",
        backgroundColor: "#111633",
        borderBottom: "1px solid #1f2937",
        display: "flex",
        alignItems: "center",
        padding: "0 2rem",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="/StockPlay.png"
          alt="StockPlay Logo"
          style={{
            height: "80px",
            width: "auto",
          }}
        />
      </div>

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
    </header>
  );
}
