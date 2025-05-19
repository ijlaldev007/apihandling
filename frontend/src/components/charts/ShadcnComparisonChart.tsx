import React from 'react';
import { format, parseISO } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { ComparisonItem } from '@/types/timeseries';

interface ShadcnComparisonChartProps {
  data: ComparisonItem[];
  days: number;
  height?: number | string;
}

// Define chart config with colors for different metrics
const chartConfig = {
  temperature: {
    label: 'Temperature',
    color: '#3b82f6', // blue-500
  },
  stock: {
    label: 'Stock Price',
    color: '#10b981', // emerald-500
  },
  users: {
    label: 'Users',
    color: '#8b5cf6', // violet-500
  },
  traffic: {
    label: 'Traffic',
    color: '#f59e0b', // amber-500
  },
};

const ShadcnComparisonChart: React.FC<ShadcnComparisonChartProps> = ({ data, days, height }) => {
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

  // Custom label formatter
  const labelFormatter = (label: string) => {
    if (!label) return '';
    try {
      const date = parseISO(label);
      return format(date, 'PPP');
    } catch (e) {
      return label;
    }
  };

  return (
    <ChartContainer config={chartConfig} className={`w-full ${height ? 'aspect-auto' : ''}`} style={height ? { height } : undefined}>
      <LineChart
        data={processedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={formatXAxis}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tick={{ fontSize: 12 }}
        />
        <ChartTooltip
          labelFormatter={labelFormatter}
          content={<ChartTooltipContent />}
        />
        <Legend />

        {data.map(item => (
          <Line
            key={item.metric}
            type="monotone"
            dataKey={item.metric}
            name={item.metric.charAt(0).toUpperCase() + item.metric.slice(1)}
            stroke={chartConfig[item.metric as keyof typeof chartConfig]?.color || '#6b7280'}
            strokeWidth={2}
            activeDot={{ r: 6 }}
            dot={{ strokeWidth: 1, r: 2 }}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
};

export default ShadcnComparisonChart;
