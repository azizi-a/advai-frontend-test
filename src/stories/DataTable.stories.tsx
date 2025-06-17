import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable } from "../components/dashboard/DataTable";
import { SaleRecord } from "../types";

const generateMockSalesData = (count: number): SaleRecord[] => {
  const categories: Array<SaleRecord["category"]> = [
    "Electronics",
    "Clothing",
    "Books",
    "Home",
    "Sports",
  ];
  const regions: Array<SaleRecord["region"]> = [
    "North",
    "South",
    "East",
    "West",
  ];
  const salesReps = [
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Sarah Williams",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `sale-${i + 1}`,
    date: new Date(2024, i % 12, (i % 28) + 1).toISOString(),
    customerName: `Customer ${String.fromCharCode(65 + (i % 26))}`,
    productName: `Product ${(i % 50) + 1}`,
    category: categories[i % categories.length],
    region: regions[i % regions.length],
    quantity: Math.floor(Math.random() * 10) + 1,
    unitPrice: Number((Math.random() * 500 + 50).toFixed(2)),
    totalAmount: 0, // Will be calculated below
    salesRep: salesReps[i % salesReps.length],
  })).map((sale) => ({
    ...sale,
    totalAmount: Number((sale.quantity * sale.unitPrice).toFixed(2)),
  }));
};

const sampleData: SaleRecord[] = generateMockSalesData(50);

type ColumnDef<T extends Record<string, unknown>> = Parameters<
  typeof DataTable<T>
>[0]["columns"][number];
const columns: ColumnDef<SaleRecord>[] = [
  {
    field: "date",
    headerName: "Date",
    sortable: true,
    valueFormatter: (value: string) => value.slice(0, 10), // YYYY-MM-DD
  },
  {
    field: "customerName",
    headerName: "Customer",
    sortable: true,
  },
  {
    field: "productName",
    headerName: "Product",
    sortable: true,
  },
  {
    field: "category",
    headerName: "Category",
    sortable: true,
  },
  {
    field: "region",
    headerName: "Region",
    sortable: true,
  },
  {
    field: "quantity",
    headerName: "Qty",
    sortable: true,
    width: "80px",
  },
  {
    field: "unitPrice",
    headerName: "Unit Price",
    sortable: true,
    valueFormatter: (value: number) =>
      new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(value),
  },
  {
    field: "totalAmount",
    headerName: "Total",
    sortable: true,
    valueFormatter: (value: number) =>
      new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(value),
  },
  {
    field: "salesRep",
    headerName: "Sales Rep",
    sortable: true,
  },
];

const meta: Meta<typeof DataTable<SaleRecord>> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  argTypes: {
    data: { control: "object" },
    loading: { control: "boolean" },
    pageSize: {
      control: {
        type: "number",
        min: 5,
        max: 50,
        step: 5,
      },
    },
  },
  args: {
    data: sampleData,
    columns: columns,
    pageSize: 10,
  },
};

export default meta;

type Story = StoryObj<typeof DataTable<SaleRecord>>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const NoData: Story = {
  args: {
    data: [],
  },
};

export const WithRowClick: Story = {
  args: {
    onRowClick: (row) => {
      // In a real app, you would navigate to a detail view or show a modal
      alert(`Clicked row with ID: ${row.id}`);
    },
  },
};

export const WithCustomPageSize: Story = {
  args: {
    pageSize: 5,
  },
};

export const Compact: Story = {
  args: {
    className: "text-sm",
    pageSize: 20,
  },
  render: (args) => (
    <div className="max-w-5xl mx-auto">
      <DataTable {...args} />
    </div>
  ),
};

export const WithCustomStyling: Story = {
  args: {
    className: "border-2 border-blue-100 rounded-lg overflow-hidden",
  },
  render: (args) => (
    <div className="p-4 bg-gray-50">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Sales Records
      </h2>
      <DataTable {...args} />
    </div>
  ),
};
