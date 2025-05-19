import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format, parseISO } from 'date-fns';
import type { ComparisonItem } from '@/types/timeseries';

// Define our own tooltip props type
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length && label) {
    return (
      <div className="bg-white p-3 border rounded shadow-sm">
        <p className="font-medium text-sm">{format(parseISO(label), 'PPP')}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            <span className="font-medium">{entry.name}:</span> {entry.value}
            {entry.payload.unit && ` ${entry.payload.unit}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

// Define colors for different metrics
const metricColors: Record<string, string> = {
  temperature: '#3b82f6', // blue-500
  stock: '#10b981', // emerald-500
  users: '#8b5cf6', // violet-500
  traffic: '#f59e0b', // amber-500
};

interface ComparisonChartProps {
  data: ComparisonItem[];
  days: number;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ data, days }) => {
  // Process data for the chart
  // We need to merge data from different metrics into a single array
  const processedData = React.useMemo(() => {
    if (!data.length) return [];

    // Get all unique dates from all metrics
    const allDates = new Set<string>();
    data.forEach(item => {
      item.data.forEach(point => {
        allDates.add(point.timestamp);
      });
    });

    // Sort dates chronologically
    const sortedDates = Array.from(allDates).sort();

    // Create a map of date -> data point for each metric
    const metricMaps = data.map(item => {
      const map = new Map<string, number>();
      item.data.forEach(point => {
        map.set(point.timestamp, point.value);
      });
      return {
        metric: item.metric,
        map,
        unit: item.meta.unit
      };
    });

    // Create the merged data array
    return sortedDates.map(date => {
      const point: Record<string, any> = { date };

      metricMaps.forEach(({ metric, map, unit }) => {
        point[metric] = map.get(date) || null;
        point[`${metric}_unit`] = unit;
      });

      return point;
    });
  }, [data]);

  // Format date for X-axis based on the number of days
  const formatXAxis = (tickItem: string) => {
    const date = parseISO(tickItem);
    if (days <= 7) {
      return format(date, 'EEE'); // Mon, Tue, etc.
    } else if (days <= 31) {
      return format(date, 'MMM d'); // Jan 15, etc.
    } else {
      return format(date, 'MMM yyyy'); // Jan 2023, etc.
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-2">Metric Comparison</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={processedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxis}
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {data.map(item => (
            <Line
              key={item.metric}
              type="monotone"
              dataKey={item.metric}
              name={item.metric.charAt(0).toUpperCase() + item.metric.slice(1)}
              stroke={metricColors[item.metric] || '#6b7280'}
              strokeWidth={2}
              activeDot={{ r: 6 }}
              dot={{ strokeWidth: 1, r: 2 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonChart;
