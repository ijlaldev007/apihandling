// This file contains the types for the time series data.

// The hourly data points for the time series data.
export interface TimeSeriesDataPoint {
  timestamp: string;
  value: number;
  hourly?: TimeSeriesHourlyDataPoint[] | null;
}

// The hourly data points for the time series data.
export interface TimeSeriesHourlyDataPoint {
  timestamp: string;
  value: number;
}

// The meta data for the time series data.
export interface TimeSeriesMeta {
  metric: string;
  unit: string;
  start_date: string;
  end_date: string;
  points: number;
}

// The response for the time series data.
export interface TimeSeriesResponse {
  data: TimeSeriesDataPoint[];
  meta: TimeSeriesMeta;
}

// The response for the available metrics.
export interface MetricsResponse {
  metrics: string[];
  default: string;
}

// The response for the comparison of multiple metrics.
export interface ComparisonItem {
  metric: string;
  data: TimeSeriesDataPoint[];
  meta: TimeSeriesMeta;
}

// The response for the comparison of multiple metrics.
export interface ComparisonResponse {
  comparison: ComparisonItem[];
  meta: {
    days: number;
    metrics: string[];
  };
}
