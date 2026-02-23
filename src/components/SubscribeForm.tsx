import { useState, useEffect } from "react";
import { subscribe, unsubscribe } from "@/lib/api";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [unsubEmail, setUnsubEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [unsubLoading, setUnsubLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "warning" | "info";
    text: string;
  } | null>(null);
  const [unsubMessage, setUnsubMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showUnsubscribe, setShowUnsubscribe] = useState(false);
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
        const data = response.data;

        if (data.is_new_subscriber) {
          // 신규 구독자
          if (data.email_sent) {
            setMessage({
              type: "success",
              text: "✅ 구독이 완료되었습니다! 환영 이메일을 확인해주세요.",
            });
          } else if (data.email_sent === false) {
            setMessage({
              type: "warning",
              text: "✅ 구독은 완료되었지만, 환영 이메일 전송에 실패했습니다. 리포트는 내일 오전 9시부터 정상 발송됩니다.",
            });
          } else {
            // email_sent가 없는 경우 (이전 버전 호환)
            setMessage({
              type: "success",
              text: data.message
                ? `✅ ${data.message}`
                : "✅ 구독이 완료되었습니다! 매일 오전 9시에 리포트를 보내드립니다.",
            });
          }
          setEmail("");
        } else {
          // 기존 구독자
          setMessage({
            type: "info",
            text: data.message
              ? `ℹ️ ${data.message}`
              : "ℹ️ 이미 구독 중인 이메일입니다.",
          });
        }
      } else {
        setMessage({
          type: "error",
          text: `❌ ${response.error || "구독에 실패했습니다."}`,
        });
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

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!unsubEmail.trim()) {
      setUnsubMessage({
        type: "error",
        text: "이메일을 입력해주세요.",
      });
      return;
    }

    if (!validateEmail(unsubEmail)) {
      setUnsubMessage({
        type: "error",
        text: "올바른 이메일 형식이 아닙니다.",
      });
      return;
    }

    setUnsubLoading(true);
    setUnsubMessage(null);

    try {
      const response = await unsubscribe(unsubEmail);

      if (response.success) {
        setUnsubMessage({
          type: "success",
          text: "✅ 구독이 취소되었습니다.",
        });
        setUnsubEmail("");
      } else {
        setUnsubMessage({
          type: "error",
          text: `❌ ${response.error || "구독 취소에 실패했습니다."}`,
        });
      }
    } catch (error) {
      setUnsubMessage({
        type: "error",
        text: "❌ 네트워크 오류가 발생했습니다. 다시 시도해주세요.",
      });
      console.error("Unsubscribe error:", error);
    } finally {
      setUnsubLoading(false);
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
                : message.type === "info"
                ? "rgba(59, 130, 246, 0.1)"
                : "rgba(239, 68, 68, 0.1)",
            color:
              message.type === "success"
                ? "#10b981"
                : message.type === "warning"
                ? "#f59e0b"
                : message.type === "info"
                ? "#3b82f6"
                : "#ef4444",
            border: `1px solid ${
              message.type === "success"
                ? "rgba(16, 185, 129, 0.2)"
                : message.type === "warning"
                ? "rgba(245, 158, 11, 0.2)"
                : message.type === "info"
                ? "rgba(59, 130, 246, 0.2)"
                : "rgba(239, 68, 68, 0.2)"
            }`,
          }}
        >
          {message.text}
        </div>
      )}

      {/* 구독 취소 섹션 */}
      <div
        style={{
          padding: isMobile ? "1rem" : "1.25rem",
          backgroundColor: "#111633",
          borderRadius: "10px",
          border: "1px solid #1f2937",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: showUnsubscribe ? "1rem" : 0,
          }}
        >
          <p
            style={{
              color: "#9aa0a6",
              fontSize: isMobile ? "0.8125rem" : "0.875rem",
              margin: "0 0 0.75rem 0",
            }}
          >
            💡 구독을 취소하고 싶으신가요?
          </p>
          <button
            onClick={() => setShowUnsubscribe(!showUnsubscribe)}
            style={{
              background: "transparent",
              border: "none",
              color: "#4c6fff",
              cursor: "pointer",
              fontSize: isMobile ? "0.8125rem" : "0.875rem",
              textDecoration: "underline",
              padding: 0,
            }}
          >
            {showUnsubscribe ? "취소" : "여기를 클릭하여 구독 취소하기"}
          </button>
        </div>

        {showUnsubscribe && (
          <>
            <form onSubmit={handleUnsubscribe} style={{ marginTop: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <input
                  type="email"
                  value={unsubEmail}
                  onChange={(e) => setUnsubEmail(e.target.value)}
                  placeholder="구독 취소할 이메일 주소"
                  style={{
                    flex: 1,
                    padding: isMobile ? "0.875rem 1rem" : "1rem 1.25rem",
                    border: "2px solid #1f2937",
                    borderRadius: "10px",
                    backgroundColor: "#0a0e27",
                    color: "#e5e7eb",
                    outline: "none",
                    fontSize: isMobile ? "0.9375rem" : "1rem",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#ef4444";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#1f2937";
                  }}
                  disabled={unsubLoading}
                />

                <button
                  type="submit"
                  disabled={unsubLoading}
                  style={{
                    padding: isMobile ? "0.875rem 1.5rem" : "1rem 2rem",
                    borderRadius: "10px",
                    border: "none",
                    fontWeight: 600,
                    fontSize: isMobile ? "0.9375rem" : "1rem",
                    cursor: unsubLoading ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    minWidth: isMobile ? "100%" : "140px",
                    background: unsubLoading
                      ? "#1f2937"
                      : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                    color: "#fff",
                  }}
                  onMouseEnter={(e) => {
                    if (!unsubLoading) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 16px rgba(239, 68, 68, 0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {unsubLoading ? "처리 중..." : "구독 취소"}
                </button>
              </div>
            </form>

            {unsubMessage && (
              <div
                style={{
                  padding: isMobile ? "0.875rem 1rem" : "1rem 1.25rem",
                  borderRadius: "10px",
                  marginTop: "1rem",
                  fontSize: isMobile ? "0.875rem" : "0.9375rem",
                  backgroundColor:
                    unsubMessage.type === "success"
                      ? "rgba(16, 185, 129, 0.1)"
                      : "rgba(239, 68, 68, 0.1)",
                  color:
                    unsubMessage.type === "success" ? "#10b981" : "#ef4444",
                  border: `1px solid ${
                    unsubMessage.type === "success"
                      ? "rgba(16, 185, 129, 0.2)"
                      : "rgba(239, 68, 68, 0.2)"
                  }`,
                }}
              >
                {unsubMessage.text}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
