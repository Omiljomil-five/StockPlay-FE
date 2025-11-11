// 디자인 시스템 - 프로페셔널한 금융 대시보드 테마

export const theme = {
  colors: {
    // 배경색 (다크 모드)
    background: {
      primary: "#0a0e27",
      secondary: "#111633",
      tertiary: "#1a1f3a",
      overlay: "rgba(10, 14, 39, 0.95)",
    },

    // 텍스트
    text: {
      primary: "#e8eaed",
      secondary: "#9aa0a6",
      tertiary: "#5f6368",
      inverse: "#0a0e27",
    },

    // 브랜드 컬러
    brand: {
      primary: "#4c6fff",
      secondary: "#6366f1",
      accent: "#818cf8",
    },

    // 시그널 컬러
    signal: {
      buy: "#10b981",
      buyLight: "#34d399",
      buyGlow: "rgba(16, 185, 129, 0.2)",

      sell: "#ef4444",
      sellLight: "#f87171",
      sellGlow: "rgba(239, 68, 68, 0.2)",

      hold: "#f59e0b",
      holdLight: "#fbbf24",
      holdGlow: "rgba(245, 158, 11, 0.2)",
    },

    // 신뢰도 컬러
    confidence: {
      high: "#10b981",
      medium: "#f59e0b",
      low: "#6b7280",
    },

    // 차트 컬러
    chart: {
      line1: "#4c6fff",
      line2: "#10b981",
      line3: "#f59e0b",
      line4: "#ef4444",
      grid: "#1f2937",
      tooltip: "#1a1f3a",
    },

    border: "#1f2937",
    borderLight: "#374151",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },

  typography: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
      mono: '"SF Mono", "Fira Code", "Consolas", monospace',
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },

  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },

  shadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
    glow: "0 0 20px rgba(76, 111, 255, 0.4)",
    glowGreen: "0 0 20px rgba(16, 185, 129, 0.4)",
    glowRed: "0 0 20px rgba(239, 68, 68, 0.4)",
  },

  transition: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    base: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "350ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

export type Theme = typeof theme;
