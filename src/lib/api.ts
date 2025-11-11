import type {
  ApiResponse,
  AnalysisResult,
  Report,
  SignalsQueryParams,
  ReportsQueryParams,
  BacktestRequest,
  BacktestResponse,
} from "@/types";

/**
 * API Base URL (환경변수에서 가져오기)
 */
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

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
 */
export async function getSignals(
  params?: SignalsQueryParams
): Promise<ApiResponse<AnalysisResult>> {
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
  return fetchApi<BacktestResponse>(`/backtest/${jobId}`);
}

/**
 * 헬스 체크
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}
