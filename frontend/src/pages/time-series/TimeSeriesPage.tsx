import React, { useState } from 'react';
import { useTimeSeries, useTimeSeriesMetrics, useTimeSeriesComparison } from '../../hooks/useTimeSeries';
import ShadcnTimeSeriesChart from '@/components/charts/ShadcnTimeSeriesChart';
import ShadcnComparisonChart from '@/components/charts/ShadcnComparisonChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TimeSeriesPage() {
  const [selectedTab, setSelectedTab] = useState<string>('single');
  const [selectedMetric, setSelectedMetric] = useState<string>('temperature');
  const [days, setDays] = useState<number>(30);
  const [resolution, setResolution] = useState<'daily' | 'hourly'>('daily');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['temperature', 'users']);

  // Fetch available metrics
  const {
    data: metricsData,
    isLoading: isLoadingMetrics
  } = useTimeSeriesMetrics();

  // Fetch time series data
  const {
    data: timeSeriesData,
    isLoading: isLoadingTimeSeries,
    error: timeSeriesError
  } = useTimeSeries(selectedMetric, days, resolution);

  // Fetch comparison data
  const {
    data: comparisonData,
    isLoading: isLoadingComparison,
    error: comparisonError
  } = useTimeSeriesComparison(selectedMetrics, days);

  // Handle metric change
  const handleMetricChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMetric(e.target.value);
  };

  // Handle days change
  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDays = parseInt(e.target.value);
    setDays(newDays);

    // Reset to daily resolution if days > 7 and resolution is hourly
    if (newDays > 7 && resolution === 'hourly') {
      setResolution('daily');
    }
  };

  // Handle resolution change
  const handleResolutionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResolution(e.target.checked ? 'hourly' : 'daily');
  };

  // Handle metric selection for comparison
  const handleMetricSelectionChange = (metric: string) => {
    setSelectedMetrics(prev => {
      if (prev.includes(metric)) {
        return prev.filter(m => m !== metric);
      } else {
        return [...prev, metric];
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Time Series Data</h1>

      <Tabs defaultValue="single" onValueChange={setSelectedTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single">Single Metric</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="mt-4">
          {/* Controls for Single Metric */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Metric Selector */}
              <div>
                <label className="block text-sm font-medium mb-1">Metric</label>
                <select
                  value={selectedMetric}
                  onChange={handleMetricChange}
                  className="w-full p-2 border rounded"
                  disabled={isLoadingMetrics}
                >
                  {isLoadingMetrics ? (
                    <option>Loading metrics...</option>
                  ) : (
                    metricsData?.metrics.map(metric => (
                      <option key={metric} value={metric}>
                        {metric.charAt(0).toUpperCase() + metric.slice(1)}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Days Selector */}
              <div>
                <label className="block text-sm font-medium mb-1">Days: {days}</label>
                <input
                  type="range"
                  min="1"
                  max="365"
                  value={days}
                  onChange={handleDaysChange}
                  className="w-full"
                />
              </div>

              {/* Resolution Toggle */}
              <div className="flex items-center">
                <label className="block text-sm font-medium mr-2">Hourly Resolution</label>
                <input
                  type="checkbox"
                  checked={resolution === 'hourly'}
                  onChange={handleResolutionChange}
                  disabled={days > 7}
                  className="h-4 w-4"
                />
                {days > 7 && resolution === 'daily' && (
                  <span className="text-xs text-gray-500 ml-2">
                    (Available for 7 days or less)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Single Metric Chart */}
          <div className="bg-white p-4 rounded shadow">
            {isLoadingTimeSeries ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading data...</p>
              </div>
            ) : timeSeriesError ? (
              <div className="text-red-500 p-4">
                Error loading data: {(timeSeriesError as Error).message}
              </div>
            ) : (
              <div>
                <h2 className="text-xl mb-4">
                  {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Data
                  {timeSeriesData?.meta.unit && ` (${timeSeriesData.meta.unit})`}
                </h2>

                {/* Time Series Chart */}
                <ShadcnTimeSeriesChart
                  data={timeSeriesData?.data || []}
                  unit={timeSeriesData?.meta.unit}
                  title={selectedMetric}
                  resolution={resolution}
                  height={300}
                />

                {/* Data summary */}
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-100 p-2 rounded">
                    <div className="text-sm text-gray-500">Start Date</div>
                    <div>{new Date(timeSeriesData?.meta.start_date || '').toLocaleDateString()}</div>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <div className="text-sm text-gray-500">End Date</div>
                    <div>{new Date(timeSeriesData?.meta.end_date || '').toLocaleDateString()}</div>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <div className="text-sm text-gray-500">Data Points</div>
                    <div>{timeSeriesData?.meta.points}</div>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <div className="text-sm text-gray-500">Resolution</div>
                    <div>{resolution === 'daily' ? 'Daily' : 'Hourly'}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="mt-4">
          {/* Controls for Comparison */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Metrics Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Select Metrics to Compare</label>
                {isLoadingMetrics ? (
                  <p>Loading metrics...</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {metricsData?.metrics.map(metric => (
                      <div key={metric} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`metric-${metric}`}
                          checked={selectedMetrics.includes(metric)}
                          onChange={() => handleMetricSelectionChange(metric)}
                          className="mr-2 h-4 w-4"
                        />
                        <label htmlFor={`metric-${metric}`} className="text-sm">
                          {metric.charAt(0).toUpperCase() + metric.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Days Selector */}
              <div>
                <label className="block text-sm font-medium mb-1">Days: {days}</label>
                <input
                  type="range"
                  min="1"
                  max="365"
                  value={days}
                  onChange={handleDaysChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Comparison Chart */}
          <div className="bg-white p-4 rounded shadow">
            {isLoadingComparison ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading comparison data...</p>
              </div>
            ) : comparisonError ? (
              <div className="text-red-500 p-4">
                Error loading comparison data: {(comparisonError as Error).message}
              </div>
            ) : selectedMetrics.length === 0 ? (
              <div className="text-amber-600 p-4">
                Please select at least one metric to display
              </div>
            ) : (
              <div>
                <h2 className="text-xl mb-4">Metric Comparison</h2>

                {/* Comparison Chart */}
                <ShadcnComparisonChart
                  data={comparisonData?.comparison || []}
                  days={days}
                  height={300}
                />

                {/* Selected metrics summary */}
                <div className="mt-4">
                  <h3 className="text-md font-medium mb-2">Selected Metrics</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMetrics.map(metric => (
                      <div key={metric} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {metric.charAt(0).toUpperCase() + metric.slice(1)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
