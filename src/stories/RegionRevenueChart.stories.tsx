import type { Meta, StoryObj } from "@storybook/react-vite";
import { RegionRevenueChart } from "../components/charts/RegionRevenueChart";
import { RegionData } from "../types";

// Sample data for the chart
const sampleData: RegionData[] = [
  {
    region: "North",
    revenue: 18500,
    percentage: 35,
    name: "North",
    value: 18500,
  },
  {
    region: "South",
    revenue: 12500,
    percentage: 24,
    name: "South",
    value: 12500,
  },
  {
    region: "East",
    revenue: 9800,
    percentage: 19,
    name: "East",
    value: 9800,
  },
  {
    region: "West",
    revenue: 11200,
    percentage: 22,
    name: "West",
    value: 11200,
  },
];

const meta: Meta<typeof RegionRevenueChart> = {
  title: "Components/Charts/RegionRevenueChart",
  component: RegionRevenueChart,
  tags: ["autodocs"],
  argTypes: {
    data: { control: "object" },
    isLoading: { control: "boolean" },
    error: { control: "text" },
    height: {
      control: "select",
      options: ["h-64", "h-80", "h-96", "h-[400px]", "h-[500px]"],
    },
    variant: {
      control: "select",
      options: ["pie", "donut"],
    },
    className: { control: "text" },
  },
  args: {
    data: sampleData,
    height: "h-80",
    variant: "pie",
  },
};

export default meta;

type Story = StoryObj<typeof RegionRevenueChart>;

export const Default: Story = {};

export const PieVariant: Story = {
  args: {
    variant: "pie",
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
    error: "Failed to load region data. Please try again later.",
  },
};

export const NoData: Story = {
  args: {
    data: [],
  },
};

export const ManyRegions: Story = {
  args: {
    data: [
      ...sampleData,
      {
        region: "Northwest",
        revenue: 7800,
        percentage: 15,
        name: "Northwest",
        value: 7800,
      },
      {
        region: "Southeast",
        revenue: 9200,
        percentage: 18,
        name: "Southeast",
        value: 9200,
      },
    ],
  },
};

export const TallChart: Story = {
  args: {
    height: "h-96",
  },
};

export const WithCustomStyling: Story = {
  render: (args) => (
    <div className="p-4">
      <RegionRevenueChart
        {...args}
        className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6"
      />
    </div>
  ),
  args: {
    data: sampleData,
  },
};
