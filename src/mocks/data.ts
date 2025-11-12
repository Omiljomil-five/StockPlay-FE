import type {
  TradingSignal,
  AnalysisResult,
  Report,
  SectorAnalysis,
} from "../types";

// Mock 트레이딩 시그널
export const mockTradingSignals: TradingSignal[] = [
  {
    id: "signal-1",
    symbol: "AAPL",
    companyName: "Apple Inc.",
    sector: "IT",
    signalType: "BUY",
    yoyGrowth: 18.5,
    momGrowth: 12.3,
    expectedReturn: 15.8,
    confidenceScore: 92.5,
  },
  // ... 나머지 19개 (이전과 동일하게 추가)
];

// Mock 섹터 분석
export const mockSectorAnalysis: SectorAnalysis[] = [
  {
    sector: "IT",
    avgYoYGrowth: 22.5,
    avgMoMGrowth: 12.8,
    signalCount: 6,
    color: "#4c6fff",
  },
  {
    sector: "통신서비스",
    avgYoYGrowth: 18.3,
    avgMoMGrowth: 10.2,
    signalCount: 4,
    color: "#10b981",
  },
  {
    sector: "임의소비재",
    avgYoYGrowth: 15.7,
    avgMoMGrowth: 8.9,
    signalCount: 4,
    color: "#f59e0b",
  },
  {
    sector: "산업재",
    avgYoYGrowth: 14.2,
    avgMoMGrowth: 7.5,
    signalCount: 2,
    color: "#ef4444",
  },
  {
    sector: "에너지",
    avgYoYGrowth: 12.8,
    avgMoMGrowth: 6.3,
    signalCount: 2,
    color: "#818cf8",
  },
  {
    sector: "헬스케어",
    avgYoYGrowth: 11.5,
    avgMoMGrowth: 5.8,
    signalCount: 2,
    color: "#ec4899",
  },
  {
    sector: "필수소비재",
    avgYoYGrowth: 9.2,
    avgMoMGrowth: 4.2,
    signalCount: 3,
    color: "#8b5cf6",
  },
];

// Mock 분석 결과
export const mockAnalysisResult: AnalysisResult = {
  date: new Date().toISOString(),
  topPicks: mockTradingSignals.slice(0, 5),
  performance: {
    avgReturn: 11.2,
    winRate: 75.3,
    sharpeRatio: 1.8,
    maxDrawdown: -8.5,
  },
  sectorAnalysis: mockSectorAnalysis,
  totalSignals: mockTradingSignals.length,
};

// Mock 리포트 (6개월치)
export const mockReports: Report[] = Array.from({ length: 6 }, (_, i) => {
  const date = new Date();
  date.setMonth(date.getMonth() - i);

  return {
    id: `report-2024-${String(11 - i).padStart(2, "0")}`,
    date: date.toISOString(),
    pdfUrl: `/reports/2024-${String(11 - i).padStart(2, "0")}-report.pdf`,
    analysisResult: {
      ...mockAnalysisResult,
      date: date.toISOString(),
    },
    createdAt: date.toISOString(),
  };
});
