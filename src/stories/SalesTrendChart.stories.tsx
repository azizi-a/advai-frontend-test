import type { Meta, StoryObj } from "@storybook/react-vite";
import { SalesTrendChart } from "../components/charts/SalesTrendChart";
import { MonthlyData } from "../types";

// Sample data for the chart
const sampleData: MonthlyData[] = [
  { month: "Jan", sales: 4000, name: "Jan", value: 4000 },
  { month: "Feb", sales: 3000, name: "Feb", value: 3000 },
  { month: "Mar", sales: 5000, name: "Mar", value: 5000 },
  { month: "Apr", sales: 2780, name: "Apr", value: 2780 },
  { month: "May", sales: 1890, name: "May", value: 1890 },
  { month: "Jun", sales: 2390, name: "Jun", value: 2390 },
  { month: "Jul", sales: 3490, name: "Jul", value: 3490 },
  { month: "Aug", sales: 4000, name: "Aug", value: 4000 },
  { month: "Sep", sales: 4500, name: "Sep", value: 4500 },
  { month: "Oct", sales: 5200, name: "Oct", value: 5200 },
  { month: "Nov", sales: 4800, name: "Nov", value: 4800 },
  { month: "Dec", sales: 6100, name: "Dec", value: 6100 },
];

const meta: Meta<typeof SalesTrendChart> = {
  title: "Components/Charts/SalesTrendChart",
  component: SalesTrendChart,
  tags: ["autodocs"],
  argTypes: {
    data: { control: "object" },
    isLoading: { control: "boolean" },
    error: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof SalesTrendChart>;

export const Default: Story = {
  args: {
    data: sampleData,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    data: [],
    error: "Failed to load sales data. Please try again later.",
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
      sales: item.sales * 1000, // Convert to thousands to demo large numbers
    })),
  },
};

export const CustomHeight: Story = {
  args: {
    data: sampleData,
    height: "h-96",
  },
};
