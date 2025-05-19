import React from 'react';
import { format, parseISO } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { TimeSeriesDataPoint } from '@/types/timeseries';

interface ShadcnTimeSeriesChartProps {
  data: TimeSeriesDataPoint[];
  unit?: string;
  title?: string;
  resolution?: 'daily' | 'hourly';
  height?: number | string;
}

// Define chart config with colors
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
  value: {
    label: 'Value',
    color: '#6b7280', // gray-500
  },
};

const ShadcnTimeSeriesChart: React.FC<ShadcnTimeSeriesChartProps> = ({
  data,
  unit = '',
  title,
  resolution = 'daily',
  height,
}) => {
  // Format data for the chart
  const chartData = data.map(point => ({
    ...point,
    date: point.timestamp,
    unit,
  }));

  // Format date for X-axis
  const formatXAxis = (tickItem: string) => {
    const date = parseISO(tickItem);
    return resolution === 'hourly'
      ? format(date, 'h aaa') // Format for hourly data (e.g., "3 PM")
      : format(date, 'MMM d'); // Format for daily data (e.g., "Jan 15")
  };

  // Custom tooltip formatter
  const tooltipFormatter = (value: number) => {
    return [`${value}${unit ? ` ${unit}` : ''}`, title || 'Value'];
  };

  // Custom label formatter
  const labelFormatter = (label: string) => {
    if (!label) return '';
    try {
      const date = parseISO(label);
      return format(date, 'PPP');
    } catch {
      // If parsing fails, return the original label
      return label;
    }
  };

  return (
    <ChartContainer config={chartConfig} className={`w-full ${height ? 'aspect-auto' : ''}`} style={height ? { height } : undefined}>
      <LineChart
        data={chartData}
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
          tickFormatter={(value) => `${value}${unit ? ` ${unit}` : ''}`}
        />
        <ChartTooltip
          formatter={tooltipFormatter}
          labelFormatter={labelFormatter}
          content={<ChartTooltipContent />}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke={title && title.toLowerCase() in chartConfig
            ? chartConfig[title.toLowerCase() as keyof typeof chartConfig].color
            : chartConfig.value.color}
          strokeWidth={2}
          activeDot={{ r: 6 }}
          name={title || 'Value'}
          dot={{ strokeWidth: 1, r: 2 }}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default ShadcnTimeSeriesChart;
