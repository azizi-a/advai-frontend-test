import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { ActiveFiltersSummary } from "../components/filters/ActiveFiltersSummary";
import { FilterState } from "../types";

const meta: Meta<typeof ActiveFiltersSummary> = {
  title: "Filters/ActiveFiltersSummary",
  component: ActiveFiltersSummary,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof ActiveFiltersSummary>;

const baseFilters: FilterState = {
  dateRange: { startDate: "", endDate: "" },
  categories: [],
  regions: [],
  searchTerm: "",
};

export const NoFilters: Story = {
  args: {
    filters: { ...baseFilters },
    resultCount: 100,
    totalCount: 100,
  },
};

export const SearchOnly: Story = {
  args: {
    filters: { ...baseFilters, searchTerm: "foo" },
    resultCount: 25,
    totalCount: 100,
  },
};

export const CategoriesOnly: Story = {
  args: {
    filters: { ...baseFilters, categories: ["Books", "Electronics"] },
    resultCount: 50,
    totalCount: 100,
  },
};

export const RegionsOnly: Story = {
  args: {
    filters: { ...baseFilters, regions: ["North", "South"] },
    resultCount: 60,
    totalCount: 100,
  },
};

export const AllFilters: Story = {
  args: {
    filters: {
      ...baseFilters,
      searchTerm: "Jane",
      categories: ["Sports", "Books"],
      regions: ["East"],
    },
    resultCount: 5,
    totalCount: 100,
  },
};
