import { Meta, StoryObj } from "@storybook/react-vite";
import { ClearFiltersButton } from "../components/filters/ClearFiltersButton";

const meta: Meta<typeof ClearFiltersButton> = {
  title: "Filters/ClearFiltersButton",
  component: ClearFiltersButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};
export default meta;
type Story = StoryObj<typeof ClearFiltersButton>;

export const Default: Story = {
  args: {
    onClick: () => alert("Filters cleared!"),
    label: "Clear Filters",
    disabled: false,
    loading: false,
  },
};

export const Disabled: Story = {
  args: {
    onClick: () => alert("Filters cleared!"),
    label: "Clear Filters",
    disabled: true,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    onClick: () => alert("Filters cleared!"),
    label: "Clearing...",
    disabled: false,
    loading: true,
  },
};

export const CustomLabel: Story = {
  args: {
    onClick: () => alert("Reset!"),
    label: "Reset",
    disabled: false,
    loading: false,
  },
};

export const CustomStyles: Story = {
  args: {
    onClick: () => alert("Filters cleared!"),
    label: "Clear Filters",
    className: "bg-red-100 text-red-700 border-red-300 hover:bg-red-200",
    disabled: false,
    loading: false,
  },
};
