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
import type { TimeSeriesDataPoint } from '@/types/timeseries';

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
        <p className="text-sm">
          <span className="font-medium">Value:</span> {payload[0].value}
          {payload[0].payload.unit && ` ${payload[0].payload.unit}`}
        </p>
      </div>
    );
  }

  return null;
};

interface TimeSeriesChartProps {
  data: TimeSeriesDataPoint[];
  unit?: string;
  color?: string;
  title?: string;
  resolution?: 'daily' | 'hourly';
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  data,
  unit = '',
  color = '#3b82f6', // Default to blue-500
  title,
  resolution = 'daily'
}) => {
  // Format data for the chart
  const chartData = data.map(point => ({
    ...point,
    date: point.timestamp,
    unit
  }));

  // Format date for X-axis
  const formatXAxis = (tickItem: string) => {
    const date = parseISO(tickItem);
    return resolution === 'hourly'
      ? format(date, 'h aaa') // Format for hourly data (e.g., "3 PM")
      : format(date, 'MMM d'); // Format for daily data (e.g., "Jan 15")
  };

  return (
    <div className="w-full h-full">
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={chartData}
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
            tickFormatter={(value) => `${value}${unit ? ` ${unit}` : ''}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            activeDot={{ r: 6 }}
            name={title || 'Value'}
            dot={{ strokeWidth: 1, r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeSeriesChart;
