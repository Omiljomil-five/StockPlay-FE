import type {
  ApiResponse,
  AnalysisResult,
  Report,
  SignalsQueryParams,
  ReportsQueryParams,
  BacktestRequest,
  BacktestResponse,
} from "../types";

import { mockAnalysisResult, mockReports, mockTradingSignals } from "./data";

/**
 * 지연 시뮬레이션 (실제 API처럼)
 */
const delay = (ms: number = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock GET /api/signals
 */
export async function getMockSignals(
  params?: SignalsQueryParams
): Promise<ApiResponse<AnalysisResult>> {
  await delay();

  try {
    let result = { ...mockAnalysisResult };

    // 섹터 필터링
    if (params?.sector) {
      const filteredSignals = mockTradingSignals.filter(
        (signal) => signal.sector === params.sector
      );
      result = {
        ...result,
        topPicks: filteredSignals.slice(0, params?.limit || 5),
        totalSignals: filteredSignals.length,
      };
    }

    // limit 적용
    if (params?.limit) {
      result.topPicks = result.topPicks.slice(0, params.limit);
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      data: {} as AnalysisResult,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Mock GET /api/reports
 */
export async function getMockReports(
  params?: ReportsQueryParams
): Promise<
  ApiResponse<{ reports: Report[]; total: number; hasMore: boolean }>
> {
  await delay();

  try {
    const limit = params?.limit || 10;
    const offset = params?.offset || 0;

    const paginatedReports = mockReports.slice(offset, offset + limit);
    const hasMore = offset + limit < mockReports.length;

    return {
      success: true,
      data: {
        reports: paginatedReports,
        total: mockReports.length,
        hasMore,
      },
    };
  } catch (error) {
    return {
      success: false,
      data: { reports: [], total: 0, hasMore: false },
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Mock GET /api/reports/:id/download
 */
export async function getMockReportDownloadUrl(
  reportId: string
): Promise<ApiResponse<{ url: string; expiresIn: number }>> {
  await delay(500);

  try {
    const report = mockReports.find((r) => r.id === reportId);

    if (!report) {
      return {
        success: false,
        data: { url: "", expiresIn: 0 },
        error: "Report not found",
      };
    }

    return {
      success: true,
      data: {
        url: report.pdfUrl,
        expiresIn: 3600, // 1시간
      },
    };
  } catch (error) {
    return {
      success: false,
      data: { url: "", expiresIn: 0 },
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Mock POST /api/backtest
 */
export async function runMockBacktest(
  request: BacktestRequest
): Promise<ApiResponse<BacktestResponse>> {
  await delay(2000); // 백테스트는 시간이 걸리므로

  try {
    // request 파라미터 사용 (로그 또는 시뮬레이션)
    console.log("Mock Backtest Request:", request);

    // 간단한 시뮬레이션
    const jobId = `job-${Date.now()}`;

    return {
      success: true,
      data: {
        jobId,
        status: "completed",
        result: {
          avgReturn: Math.random() * 15 + 5, // 5-20%
          winRate: Math.random() * 20 + 60, // 60-80%
          sharpeRatio: Math.random() * 1 + 1, // 1-2
          maxDrawdown: -(Math.random() * 5 + 5), // -5% ~ -10%
        },
      },
    };
  } catch (error) {
    return {
      success: false,
      data: {
        jobId: "",
        status: "failed",
      },
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Mock GET /api/backtest/:jobId
 */
export async function getMockBacktestStatus(
  jobId: string
): Promise<ApiResponse<BacktestResponse>> {
  await delay(300);

  try {
    return {
      success: true,
      data: {
        jobId,
        status: "completed",
        result: {
          avgReturn: 11.5,
          winRate: 74.2,
          sharpeRatio: 1.75,
          maxDrawdown: -8.8,
        },
      },
    };
  } catch (error) {
    return {
      success: false,
      data: {
        jobId: "",
        status: "failed",
      },
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Mock Health Check
 */
export async function mockHealthCheck(): Promise<boolean> {
  await delay(200);
  return true;
}
