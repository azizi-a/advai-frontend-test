import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "../ui/Card";
import { ChartPlaceholder } from "./ChartPlaceholder";
import { TrendingUp } from "lucide-react";
import { MonthlyData } from "../../types";

interface SalesTrendChartProps {
  data: MonthlyData[];
  isLoading?: boolean;
  error?: string | null;
  height?: string;
  className?: string;
}

export const SalesTrendChart: React.FC<SalesTrendChartProps> = ({
  data,
  isLoading = false,
  error = null,
  height = "h-80",
  className = "",
}) => {
  if (isLoading) {
    return (
      <ChartPlaceholder
        icon={TrendingUp}
        title="Loading Sales Data"
        description="Fetching monthly sales trends..."
        height={height}
      />
    );
  }

  if (error) {
    return (
      <ChartPlaceholder
        icon={TrendingUp}
        title="Error Loading Data"
        description={error}
        height={height}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <ChartPlaceholder
        icon={TrendingUp}
        title="No Data Available"
        description="No sales data found for the selected filters."
        height={height}
      />
    );
  }

  // Format numbers for the Y-axis
  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `£${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `£${(value / 1000).toFixed(0)}K`;
    }
    return `£${value}`;
  };

  // Custom tooltip formatter
  const formatTooltip = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className={`p-4 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Monthly Sales Trend
      </h3>
      <div className={height}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => [formatTooltip(Number(value)), "Sales"]}
              labelFormatter={(label) => `Month: ${label}`}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              name="Sales"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SalesTrendChart;
