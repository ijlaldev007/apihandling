//
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type {
    TimeSeriesResponse,
    MetricsResponse,
    ComparisonResponse,
} from "@/types/timeseries";

import { get } from "@/api/client";

// Base API URL
const API_URL = "/time-series";

// Hook to fetch time series data
export function useTimeSeries(
  metric?: string,
  days?: number,
  resolution?: "daily" | "hourly"
) {
  return useQuery({
    queryKey: ["timeSeries", metric, days, resolution],
    queryFn: async ({ signal }): Promise<TimeSeriesResponse> => {
      try {
        // Build query parameters manually instead of using URL constructor
        const queryParams = new URLSearchParams();
        if (metric) queryParams.append("metric", metric);
        if (days) queryParams.append("days", days.toString());
        if (resolution) queryParams.append("resolution", resolution);

        const url = `${API_URL}?${queryParams.toString()}`;
        const response = await get<TimeSeriesResponse>(url, {
          signal,
        });
        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled:", error.message);
          throw new Error("Request cancelled");
        }
        throw error;
      }
    },
    enabled: !!metric,
  });
}

// Hook to fetch available metrics
export function useTimeSeriesMetrics() {
  return useQuery({
    queryKey: ["timeSeriesMetrics"],
    queryFn: async ({ signal }): Promise<MetricsResponse> => {
      try {
        const response = await get<MetricsResponse>(`${API_URL}/metrics`, {
          signal,
        });
        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled:", error.message);
          throw new Error("Request cancelled");
        }
        throw error;
      }
    },
  });
}

// Hook to fetch comparison of multiple metrics

export function useTimeSeriesComparison(metrics?: string[], days?: number) {
  return useQuery({
    queryKey: ["timeSeriesComparison", metrics, days],
    queryFn: async ({ signal }): Promise<ComparisonResponse> => {
      try {
        // Build query parameters manually instead of using URL constructor
        const queryParams = new URLSearchParams();
        if (metrics) queryParams.append("metrics", metrics.join(","));
        if (days) queryParams.append("days", days.toString());

        const url = `${API_URL}/compare?${queryParams.toString()}`;
        const response = await get<ComparisonResponse>(url, {
          signal,
        });
        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled:", error.message);
          throw new Error("Request cancelled");
        }
        throw error;
      }
    },
    enabled: !!metrics,
  });
}
