// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// 트레이딩 시그널
export interface TradingSignal {
  id: string;
  symbol: string;
  companyName: string;
  sector: string;
  signalType: "BUY" | "SELL";
  yoyGrowth: number;
  momGrowth: number;
  expectedReturn: number;
  confidenceScore: number;
}

// 성과 지표
export interface PerformanceMetrics {
  avgReturn: number;
  winRate: number;
  sharpeRatio: number;
  maxDrawdown: number;
}

// 섹터 분석
export interface SectorAnalysis {
  sector: string;
  avgYoYGrowth: number;
  avgMoMGrowth: number;
  signalCount: number;
  color: string;
}

// 분석 결과
export interface AnalysisResult {
  date: string;
  topPicks: TradingSignal[];
  performance: PerformanceMetrics;
  sectorAnalysis: SectorAnalysis[];
  totalSignals: number;
}

// 리포트
export interface Report {
  id: string;
  date: string;
  pdfUrl: string;
  analysisResult: AnalysisResult;
  createdAt: string;
}

// Query 파라미터
export interface SignalsQueryParams {
  sector?: string;
  limit?: number;
}

export interface ReportsQueryParams {
  limit?: number;
  offset?: number;
}

// 백테스트
export interface BacktestRequest {
  startDate: string;
  endDate: string;
  stocks: string[];
  strategy: string;
}

export interface BacktestResponse {
  jobId: string;
  status: "pending" | "running" | "completed" | "failed";
  result?: {
    avgReturn: number;
    winRate: number;
    sharpeRatio: number;
    maxDrawdown: number;
  };
}
