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
  signalType: "BUY" | "SELL" | "HOLD"; // ✅ HOLD 추가
  surpriseZ?: number; // ✅ Surprise Z-Score 추가
  yoyGrowth: number;
  // momGrowth: number; ❌ 제거됨
  expectedReturn: number;
  vsKospi?: number; // ✅ KOSPI 대비 추가
  kospiReturn?: number; // ✅ KOSPI 수익률 추가
  confidenceScore: number;
  period?: string; // 1d, 5d, 10d, 20d
}

// 성과 지표
export interface PerformanceMetrics {
  avgReturn: number;
  winRate: number;
  sharpeRatio: number;
  maxDrawdown: number;
  period?: string; // 1d, 5d, 10d, 20d
}

// 섹터 분석
export interface SectorAnalysis {
  sector: string;
  avgYoYGrowth: number;
  // avgMoMGrowth: number; ❌ 제거됨
  signalCount: number;
  color: string;
  period?: string; // 1d, 5d, 10d, 20d
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
  period?: string; // 1d, 5d, 10d, 20d
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

// 구독 관련 타입
export interface SubscribeRequest {
  email: string;
}

export interface SubscriptionData {
  email: string;
  notification_enabled: boolean;
  created_at: string;
  updated_at: string;
}
