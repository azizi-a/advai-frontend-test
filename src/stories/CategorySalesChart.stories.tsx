import type { Meta, StoryObj } from "@storybook/react-vite";
import { CategorySalesChart } from "../components/charts/CategorySalesChart";
import { CategoryData } from "../types";

// Sample data for the chart
const sampleData: CategoryData[] = [
  {
    category: "Electronics",
    revenue: 12500,
    orders: 78,
    name: "Electronics",
    value: 12500,
  },
  {
    category: "Clothing",
    revenue: 8900,
    orders: 124,
    name: "Clothing",
    value: 8900,
  },
  {
    category: "Books",
    revenue: 5200,
    orders: 210,
    name: "Books",
    value: 5200,
  },
  {
    category: "Home",
    revenue: 7600,
    orders: 92,
    name: "Home",
    value: 7600,
  },
  {
    category: "Sports",
    revenue: 6800,
    orders: 85,
    name: "Sports",
    value: 6800,
  },
];

const meta: Meta<typeof CategorySalesChart> = {
  title: "Components/Charts/CategorySalesChart",
  component: CategorySalesChart,
  tags: ["autodocs"],
  argTypes: {
    data: { control: "object" },
    isLoading: { control: "boolean" },
    error: { control: "text" },
    height: {
      control: "select",
      options: ["h-64", "h-80", "h-96", "h-[400px]", "h-[500px]"],
    },
    className: { control: "text" },
  },
  args: {
    data: sampleData,
    height: "h-80",
  },
};

export default meta;

type Story = StoryObj<typeof CategorySalesChart>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    data: [],
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    data: [],
    error: "Failed to load category data. Please try again later.",
  },
};

export const NoData: Story = {
  args: {
    data: [],
  },
};

export const LargeNumbers: Story = {
  args: {
    data: sampleData.map((item) => ({
      ...item,
      revenue: item.revenue * 1000, // Larger numbers to test formatting
      value: item.value * 100,
    })),
  },
};

export const TallChart: Story = {
  args: {
    height: "h-96",
  },
};

export const WithCustomStyling: Story = {
  args: {
    className: "bg-blue-50 border border-blue-200",
  },
};
