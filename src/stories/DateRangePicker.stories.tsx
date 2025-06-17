import { Meta, StoryObj } from "@storybook/react-vite";
import { DateRangePicker } from "../components/filters/DateRangePicker";

const meta: Meta<typeof DateRangePicker> = {
  title: "Filters/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  args: {
    startDate: "",
    endDate: "",
    onStartDateChange: (date: string) =>
      console.log("Start date changed:", date),
    onEndDateChange: (date: string) => console.log("End date changed:", date),
  },
};

export const WithDates: Story = {
  args: {
    startDate: "2025-01-01",
    endDate: "2025-06-30",
    onStartDateChange: (date: string) =>
      console.log("Start date changed:", date),
    onEndDateChange: (date: string) => console.log("End date changed:", date),
  },
};

export const Loading: Story = {
  args: {
    startDate: "",
    endDate: "",
    onStartDateChange: (date: string) =>
      console.log("Start date changed:", date),
    onEndDateChange: (date: string) => console.log("End date changed:", date),
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    startDate: "2025-01-01",
    endDate: "2025-06-30",
    onStartDateChange: (date: string) =>
      console.log("Start date changed:", date),
    onEndDateChange: (date: string) => console.log("End date changed:", date),
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    startDate: "",
    endDate: "",
    onStartDateChange: (date: string) =>
      console.log("Start date changed:", date),
    onEndDateChange: (date: string) => console.log("End date changed:", date),
    error: "Please select valid dates",
  },
};

export const CustomStyles: Story = {
  args: {
    startDate: "2025-01-01",
    endDate: "2025-06-30",
    onStartDateChange: (date: string) =>
      console.log("Start date changed:", date),
    onEndDateChange: (date: string) => console.log("End date changed:", date),
    className: "max-w-sm",
  },
};
