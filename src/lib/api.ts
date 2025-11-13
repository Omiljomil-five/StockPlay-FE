import type {
  ApiResponse,
  AnalysisResult,
  Report,
  SignalsQueryParams,
  ReportsQueryParams,
  BacktestRequest,
  BacktestResponse,
  SubscriptionData,
} from "@/types";

// Mock API import (상대 경로 사용)
import {
  getMockSignals,
  getMockReports,
  getMockReportDownloadUrl,
  runMockBacktest,
  getMockBacktestStatus,
  mockHealthCheck,
} from "../mocks/api";

/**
 * Mock 데이터 사용 여부 (환경 변수로 제어)
 */
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true";

/**
 * API Base URL (환경변수에서 가져오기)
 */
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// 🔍 디버깅용 로그 (나중에 제거 가능)
console.log("🔍 API Configuration:", {
  USE_MOCK_DATA,
  VITE_USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA,
  API_BASE_URL,
});

/**
 * Fetch 래퍼 - 에러 핸들링 포함
 */
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      data: {} as T,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * GET /api/signals - 최신 트레이딩 시그널 조회
 * @param params.sector - 섹터 필터 (optional)
 * @param params.period - 예측 기간: 1d, 5d, 10d, 20d (optional, default: 1d)
 * @param params.limit - 결과 개수 (optional, default: 20)
 */
export async function getSignals(
  params?: SignalsQueryParams & { period?: string }
): Promise<ApiResponse<AnalysisResult>> {
  if (USE_MOCK_DATA) {
    console.log("📦 Using Mock Data for getSignals", { params });
    return getMockSignals(params);
  }

  const queryString = params
    ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
    : "";

  return fetchApi<AnalysisResult>(`/signals${queryString}`);
}

/**
 * GET /api/reports - 리포트 목록 조회
 */
export async function getReports(
  params?: ReportsQueryParams
): Promise<
  ApiResponse<{ reports: Report[]; total: number; hasMore: boolean }>
> {
  if (USE_MOCK_DATA) {
    console.log("📦 Using Mock Data for getReports");
    return getMockReports(params);
  }

  const queryString = params
    ? `?${new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>)
      ).toString()}`
    : "";

  return fetchApi<{ reports: Report[]; total: number; hasMore: boolean }>(
    `/reports${queryString}`
  );
}

/**
 * GET /api/reports/:id/download - PDF 리포트 다운로드 URL 받기
 */
export async function getReportDownloadUrl(
  reportId: string
): Promise<ApiResponse<{ url: string; expiresIn: number }>> {
  if (USE_MOCK_DATA) {
    return getMockReportDownloadUrl(reportId);
  }

  return fetchApi<{ url: string; expiresIn: number }>(
    `/reports/${reportId}/download`
  );
}

/**
 * POST /api/backtest - 커스텀 백테스트 실행
 */
export async function runBacktest(
  request: BacktestRequest
): Promise<ApiResponse<BacktestResponse>> {
  if (USE_MOCK_DATA) {
    return runMockBacktest(request);
  }

  return fetchApi<BacktestResponse>("/backtest", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

/**
 * GET /api/backtest/:jobId - 백테스트 상태 조회
 */
export async function getBacktestStatus(
  jobId: string
): Promise<ApiResponse<BacktestResponse>> {
  if (USE_MOCK_DATA) {
    return getMockBacktestStatus(jobId);
  }

  return fetchApi<BacktestResponse>(`/backtest/${jobId}`);
}

/**
 * 헬스 체크 - 서버가 살아있는지 확인
 */
export async function healthCheck(): Promise<boolean> {
  if (USE_MOCK_DATA) {
    return mockHealthCheck();
  }

  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * POST /api/subscribe - 이메일 구독
 */
export async function subscribe(
  email: string
): Promise<ApiResponse<SubscriptionData>> {
  return fetchApi<SubscriptionData>("/subscribe", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}
