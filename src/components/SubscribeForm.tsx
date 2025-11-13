import { useState, useEffect } from "react";
import { subscribe } from "@/lib/api";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "warning";
    text: string;
  } | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!email.trim()) {
      setMessage({ type: "error", text: "이메일을 입력해주세요." });
      return;
    }

    if (!validateEmail(email)) {
      setMessage({ type: "error", text: "올바른 이메일 형식이 아닙니다." });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await subscribe(email);

      if (response.success) {
        setMessage({
          type: "success",
          text: "✅ 구독이 완료되었습니다! 매일 오전 9시에 리포트를 보내드립니다.",
        });
        setEmail("");
      } else {
        // 이미 구독 중인 경우
        if (response.error?.includes("이미 구독")) {
          setMessage({
            type: "warning",
            text: "⚠️ 이미 구독 중인 이메일입니다.",
          });
        } else {
          setMessage({
            type: "error",
            text: `❌ ${response.error || "구독에 실패했습니다."}`,
          });
        }
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "❌ 네트워크 오류가 발생했습니다. 다시 시도해주세요.",
      });
      console.error("Subscribe error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              flex: 1,
              padding: isMobile ? "0.875rem 1rem" : "1rem 1.25rem",
              border: "2px solid #1f2937",
              borderRadius: "10px",
              backgroundColor: "#111633",
              color: "#e5e7eb",
              outline: "none",
              fontSize: isMobile ? "0.9375rem" : "1rem",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#4c6fff";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#1f2937";
            }}
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: isMobile ? "0.875rem 1.5rem" : "1rem 2rem",
              borderRadius: "10px",
              border: "none",
              fontWeight: 600,
              fontSize: isMobile ? "0.9375rem" : "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              minWidth: isMobile ? "100%" : "140px",
              background: loading
                ? "#1f2937"
                : "linear-gradient(135deg, #4c6fff 0%, #764ba2 100%)",
              color: "#fff",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 16px rgba(76, 111, 255, 0.3)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {loading ? "처리 중..." : "구독하기"}
          </button>
        </div>
      </form>

      {message && (
        <div
          style={{
            padding: isMobile ? "0.875rem 1rem" : "1rem 1.25rem",
            borderRadius: "10px",
            marginBottom: "1.5rem",
            fontSize: isMobile ? "0.875rem" : "0.9375rem",
            backgroundColor:
              message.type === "success"
                ? "rgba(16, 185, 129, 0.1)"
                : message.type === "warning"
                ? "rgba(245, 158, 11, 0.1)"
                : "rgba(239, 68, 68, 0.1)",
            color:
              message.type === "success"
                ? "#10b981"
                : message.type === "warning"
                ? "#f59e0b"
                : "#ef4444",
            border: `1px solid ${
              message.type === "success"
                ? "rgba(16, 185, 129, 0.2)"
                : message.type === "warning"
                ? "rgba(245, 158, 11, 0.2)"
                : "rgba(239, 68, 68, 0.2)"
            }`,
          }}
        >
          {message.text}
        </div>
      )}

      {/* 구독 취소 안내 */}
      <div
        style={{
          textAlign: "center",
          padding: isMobile ? "1rem" : "1.25rem",
          backgroundColor: "#111633",
          borderRadius: "10px",
          border: "1px solid #1f2937",
        }}
      >
        <p
          style={{
            color: "#9aa0a6",
            fontSize: isMobile ? "0.8125rem" : "0.875rem",
            margin: 0,
          }}
        >
          💡 구독을 취소하고 싶으신가요?
        </p>
        <p
          style={{
            color: "#9aa0a6",
            fontSize: isMobile ? "0.8125rem" : "0.875rem",
            margin: "0.5rem 0 0 0",
            lineHeight: 1.5,
          }}
        >
          이메일로 전송되는 리포트 하단의 '구독 취소' 링크를 클릭하거나,
        </p>
        <p
          style={{
            color: "#4c6fff",
            fontSize: isMobile ? "0.75rem" : "0.8125rem",
            margin: "0.25rem 0 0 0",
            fontWeight: 500,
            wordBreak: "break-all",
          }}
        >
          DELETE {window.location.origin}/api/subscribe/[email]
        </p>
      </div>
    </div>
  );
}
