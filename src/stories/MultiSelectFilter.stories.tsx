import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { MultiSelectFilter } from "../components/filters/MultiSelectFilter";

const meta: Meta<typeof MultiSelectFilter> = {
  title: "Filters/MultiSelectFilter",
  component: MultiSelectFilter,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};
export default meta;
type Story = StoryObj<typeof MultiSelectFilter>;

const options = ["Electronics", "Clothing", "Books", "Home", "Sports"];

const Template = (args: any) => {
  const [selected, setSelected] = useState<string[]>(args.selected ?? []);
  return (
    <MultiSelectFilter {...args} selected={selected} onChange={setSelected} />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    label: "Categories",
    options,
    selected: [],
  },
};

export const WithSelections: Story = {
  render: Template,
  args: {
    label: "Categories",
    options,
    selected: ["Books", "Electronics"],
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    label: "Categories",
    options,
    selected: ["Clothing"],
    disabled: true,
  },
};

export const Error: Story = {
  render: Template,
  args: {
    label: "Categories",
    options,
    selected: [],
    error: "You must select at least one category",
  },
};

export const CustomStyles: Story = {
  render: Template,
  args: {
    label: "Categories",
    options,
    selected: [],
    className: "max-w-xs",
  },
};
