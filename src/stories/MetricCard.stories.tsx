import type { Meta, StoryObj } from "@storybook/react-vite";
import { MetricCard } from "../components/dashboard/MetricCard";
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";

const meta: Meta<typeof MetricCard> = {
  title: "Components/MetricCard",
  component: MetricCard,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    value: { control: "text" },
    iconColor: { control: "color" },
  },
};

export default meta;

type Story = StoryObj<typeof MetricCard>;

export const Default: Story = {
  args: {
    title: "Total Revenue",
    value: "$45,231.89",
    icon: DollarSign,
    iconColor: "text-green-600",
  },
};

export const WithTrend: Story = {
  args: {
    title: "Total Orders",
    value: "1,234",
    icon: ShoppingCart,
    iconColor: "text-blue-600",
    trend: {
      value: 12.5,
      isPositive: true,
    },
  },
};

export const NegativeTrend: Story = {
  args: {
    title: "Active Users",
    value: "2,345",
    icon: Users,
    iconColor: "text-purple-600",
    trend: {
      value: 3.2,
      isPositive: false,
    },
  },
};

export const WithCustomFormatting: Story = {
  args: {
    title: "Growth Rate",
    value: 0.125,
    icon: TrendingUp,
    iconColor: "text-yellow-600",
    formatValue: (value) => `${(Number(value) * 100).toFixed(1)}%`,
  },
};
