// 프로젝트 전체에서 사용할 TypeScript 타입 정의

/**
 * GICS 섹터 코드
 */
export const enum Sector {
  ENERGY = 10,
  MATERIALS = 15,
  INDUSTRIALS = 20,
  CONSUMER_DISCRETIONARY = 25,
  CONSUMER_STAPLES = 30,
  HEALTH_CARE = 35,
  FINANCIALS = 40,
  INFORMATION_TECHNOLOGY = 45,
  COMMUNICATION_SERVICES = 50,
  UTILITIES = 55,
  REAL_ESTATE = 60,
}

/**
 * 섹터 이름 매핑
 */
export const SECTOR_NAMES = {
  10: "에너지",
  15: "소재",
  20: "산업재",
  25: "임의소비재",
  30: "필수소비재",
  35: "헬스케어",
  40: "금융",
  45: "IT",
  50: "통신서비스",
  55: "유틸리티",
  60: "부동산",
} as const;

/**
 * 섹터 코드로 이름 가져오기
 */
export function getSectorName(sector: Sector): string {
  return SECTOR_NAMES[sector as keyof typeof SECTOR_NAMES] || "알 수 없음";
}

/**
 * 신호 타입
 */
export type SignalType = "BUY" | "HOLD" | "SELL";

/**
 * 신뢰도
 */
export type Confidence = "HIGH" | "MEDIUM" | "LOW";

/**
 * 백테스트 결과
 */
export interface BacktestResult {
  return5d: number;
  return10d: number;
  return20d: number;
  maxReturn30d: number;
  minReturn30d: number;
}

/**
 * 트레이딩 시그널 (핵심 데이터 모델)
 */
export interface TradingSignal {
  id: string;
  date: string; // ISO 8601
  symbol: string;
  companyName: string;
  sector: Sector;
  sectorCode: number;

  // 수출 데이터
  exportValue: number;
  yoyGrowth: number;
  momGrowth: number;

  // 서프라이즈 지표
  zscoreYoy: number;
  zscoreMom: number;
  momAcceleration: number;
  combinedScore: number;

  // 기술적 지표
  momentum20d: number;
  volumeRatio: number;
  rsi: number;

  // 예측
  expectedReturn20d: number;
  confidence: Confidence;
  signal: SignalType;

  // 백테스트 결과 (선택적)
  backtest?: BacktestResult;
}

/**
 * 섹터별 분석 결과
 */
export interface SectorAnalysis {
  sector: Sector;
  sectorName: string;
  avgYoyGrowth: number;
  avgMomGrowth: number;
  signalCount: number;
  topSymbols: string[];
}

/**
 * 성과 지표
 */
export interface PerformanceMetrics {
  avgReturn: number;
  winRate: number;
  sharpeRatio: number;
  maxDrawdown: number;
}

/**
 * 분석 결과 (API 응답)
 */
export interface AnalysisResult {
  date: string;
  totalSignals: number;
  topPicks: TradingSignal[];
  sectorAnalysis: SectorAnalysis[];
  performance: PerformanceMetrics;
}

/**
 * 리포트
 */
export interface Report {
  id: string;
  date: string;
  analysisResult: AnalysisResult;
  pdfUrl: string;
  createdAt: string;
}

/**
 * API 응답 공통 형식
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

/**
 * API 에러
 */
export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

/**
 * 시그널 조회 파라미터
 */
export interface SignalsQueryParams {
  date?: string;
  limit?: number;
  sector?: Sector;
}

/**
 * 리포트 조회 파라미터
 */
export interface ReportsQueryParams {
  limit?: number;
  offset?: number;
}

/**
 * 백테스트 요청
 */
export interface BacktestRequest {
  strategy: string;
  startDate: string;
  endDate: string;
  parameters?: {
    zscoreYoyMin?: number;
    momConsecutiveIncrease?: number;
    [key: string]: unknown;
  };
}

/**
 * 백테스트 응답
 */
export interface BacktestResponse {
  jobId: string;
  status: "processing" | "completed" | "failed";
  estimatedTime?: number;
  result?: PerformanceMetrics;
}
