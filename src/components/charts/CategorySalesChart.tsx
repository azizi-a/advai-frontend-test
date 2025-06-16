import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "../ui/Card";
import { ChartPlaceholder } from "./ChartPlaceholder";
import { LayoutGrid } from "lucide-react";
import { CategoryData } from "../../types";

interface CategorySalesChartProps {
  data: CategoryData[];
  isLoading?: boolean;
  error?: string | null;
  height?: string;
  className?: string;
}

export const CategorySalesChart: React.FC<CategorySalesChartProps> = ({
  data,
  isLoading = false,
  error = null,
  height = "h-80",
  className = "",
}) => {
  if (isLoading) {
    return (
      <ChartPlaceholder
        icon={LayoutGrid}
        title="Loading Category Data"
        description="Fetching sales by category..."
        height={height}
      />
    );
  }

  if (error) {
    return (
      <ChartPlaceholder
        icon={LayoutGrid}
        title="Error Loading Data"
        description={error}
        height={height}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <ChartPlaceholder
        icon={LayoutGrid}
        title="No Category Data"
        description="No sales data available by category."
        height={height}
      />
    );
  }

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `£${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `£${(value / 1000).toFixed(0)}K`;
    }
    return `£${value}`;
  };

  const formatTooltip = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const sortedData = [...data].sort((a, b) => b.revenue - a.revenue);

  return (
    <Card className={className}>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Sales by Category
      </h3>
      <div className={height}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            barGap={2}
            barCategoryGap={8}>
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              type="number"
              tickFormatter={formatYAxis}
              tick={{ fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              dataKey="category"
              type="category"
              width={100}
              tick={{ fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => [formatTooltip(Number(value)), "Revenue"]}
              labelFormatter={(label) => `Category: ${label}`}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            />
            <Bar
              dataKey="revenue"
              name="Revenue"
              fill="#3b82f6"
              radius={[0, 4, 4, 0]}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
