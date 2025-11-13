import SubscribeForm from "@/components/SubscribeForm";
import { Mail } from "lucide-react";
import { useState, useEffect } from "react";

export default function Subscribe() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        padding: isMobile ? "1rem" : "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          marginBottom: isMobile ? "2.5rem" : "3.5rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            marginBottom: "0.75rem",
          }}
        >
          <Mail size={isMobile ? 28 : 32} color="#4c6fff" />
          <h1
            style={{
              fontSize: isMobile ? "1.75rem" : "2.5rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            이메일 구독
          </h1>
        </div>
        <p
          style={{
            color: "#9aa0a6",
            fontSize: isMobile ? "0.9375rem" : "1.0625rem",
            lineHeight: 1.6,
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          매일 오전 9시, 수출 데이터 기반 ML 트레이딩 시그널을 이메일로
          받아보세요
        </p>
      </div>

      {/* 구독 폼 */}
      <div style={{ marginBottom: isMobile ? "3rem" : "4rem" }}>
        <SubscribeForm />
      </div>

      {/* 혜택 안내 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: isMobile ? "1.25rem" : "1.5rem",
        }}
      >
        {[
          {
            number: "1",
            title: "일일 리포트",
            description:
              "매일 최신 수출 데이터 기반 트레이딩 시그널을 받아보세요",
          },
          {
            number: "2",
            title: "ML 기반 분석",
            description: "머신러닝 모델이 자동으로 분석한 Top 5 추천 종목",
          },
          {
            number: "3",
            title: "성과 지표",
            description: "평균 수익률, 승률, Sharpe Ratio 등 상세한 성과 분석",
          },
        ].map((item) => (
          <div
            key={item.number}
            style={{
              padding: isMobile ? "1.5rem" : "2rem",
              backgroundColor: "#111633",
              borderRadius: "12px",
              border: "1px solid #1f2937",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#4c6fff";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#1f2937";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4c6fff 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "1rem",
              }}
            >
              {item.number}
            </div>
            <h3
              style={{
                fontSize: isMobile ? "1.0625rem" : "1.125rem",
                fontWeight: 600,
                marginBottom: "0.5rem",
                color: "#fff",
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                color: "#9aa0a6",
                fontSize: isMobile ? "0.8125rem" : "0.875rem",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
