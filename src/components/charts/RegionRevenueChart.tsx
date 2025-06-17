import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LegendProps,
  TooltipProps,
} from "recharts";
import { Card } from "../ui/Card";
import { ChartPlaceholder } from "./ChartPlaceholder";
import { MapPin } from "lucide-react";
import { RegionData } from "../../types";

interface RegionRevenueChartProps {
  data: RegionData[];
  isLoading?: boolean;
  error?: string | null;
  height?: string;
  className?: string;
  variant?: "pie" | "donut";
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: {
    payload: RegionData;
  }[];
}

interface CustomLegendProps extends LegendProps {
  payload?: {
    value: string;
    color?: string;
    payload: RegionData & { strokeDasharray?: string | number };
  }[];
}

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
  "#6366f1",
];

export const RegionRevenueChart: React.FC<RegionRevenueChartProps> = ({
  data,
  isLoading = false,
  error = null,
  height = "h-80",
  className = "",
  variant = "pie",
}) => {
  if (isLoading) {
    return (
      <ChartPlaceholder
        icon={MapPin}
        title="Loading Region Data"
        description="Fetching revenue by region..."
        height={height}
      />
    );
  }

  if (error) {
    return (
      <ChartPlaceholder
        icon={MapPin}
        title="Error Loading Data"
        description={error}
        height={height}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <ChartPlaceholder
        icon={MapPin}
        title="No Region Data"
        description="No revenue data available by region."
        height={height}
      />
    );
  }

  // Format currency for tooltip
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Custom tooltip component
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload as RegionData;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium text-gray-900">{data.region}</p>
          <p className="text-sm text-gray-600">
            {formatCurrency(data.revenue)}
            <span className="ml-2 text-gray-500">
              ({data.percentage.toFixed(1)}%)
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend formatter to include percentage
  const renderLegend = (props: CustomLegendProps) => {
    const { payload } = props;
    if (!payload) return null;

    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => {
          const data = entry.payload as RegionData;
          const color = entry.color || COLORS[index % COLORS.length];
          return (
            <div
              key={`legend-${index}`}
              className="flex items-center text-sm"
              style={{ color: color }}>
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: color }}
              />
              <span>
                {entry.value} {data.percentage.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  // Label formatter for pie chart
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#6b7280"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className={className}>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Revenue by Region
      </h3>
      <div className={height}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={variant === "donut" ? "60%" : 0}
              outerRadius="80%"
              paddingAngle={2}
              dataKey="revenue"
              nameKey="region"
              labelLine={false}
              label={renderCustomizedLabel}>
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#ffffff"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
