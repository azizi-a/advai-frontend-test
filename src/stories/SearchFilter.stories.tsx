import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { SearchFilter } from "../components/filters/SearchFilter";

const meta: Meta<typeof SearchFilter> = {
  title: "Filters/SearchFilter",
  component: SearchFilter,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};
export default meta;
type Story = StoryObj<typeof SearchFilter>;

const Template = (args: any) => {
  const [value, setValue] = useState(args.value ?? "");
  return <SearchFilter {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: Template,
  args: {
    value: "",
    placeholder: "Search...",
  },
};

export const WithValue: Story = {
  render: Template,
  args: {
    value: "lorem",
    placeholder: "Search...",
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    value: "",
    disabled: true,
    placeholder: "Search...",
  },
};

export const Loading: Story = {
  render: Template,
  args: {
    value: "loading",
    loading: true,
    placeholder: "Search...",
  },
};

export const CustomStyles: Story = {
  render: Template,
  args: {
    value: "",
    className: "max-w-xs",
    placeholder: "Search for products...",
  },
};
