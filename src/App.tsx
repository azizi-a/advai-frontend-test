import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Package,
  Filter,
  LineChart,
  BarChart3,
  PieChart,
} from "lucide-react";

import { useFilters } from "./hooks/useFilters";
import { useDashboardMetrics } from "./hooks/useDashboardMetrics";
import { mockSalesData } from "./data/mockSalesData";
import { SearchFilter } from "./components/filters/SearchFilter";
import { DateRangePicker } from "./components/filters/DateRangePicker";
import { MultiSelectFilter } from "./components/filters/MultiSelectFilter";
import { ClearFiltersButton } from "./components/filters/ClearFiltersButton";
import { MetricCard } from "./components/dashboard/MetricCard";
import { SalesTrendChart } from "./components/charts/SalesTrendChart";
import { CategorySalesChart } from "./components/charts/CategorySalesChart";
import { RegionRevenueChart } from "./components/charts/RegionRevenueChart";
import { DataTable } from "./components/dashboard/DataTable";
import {
  getMonthlyData,
  getCategoryData,
  getRegionData,
} from "./utils/dataUtils";
import { ActiveFiltersSummary } from "./components/filters/ActiveFiltersSummary";
import { SaleRecord } from "./types";
import { ColumnDef } from "./components/dashboard/DataTable";

const categoryOptions = ["Electronics", "Clothing", "Books", "Home", "Sports"];
const regionOptions = ["North", "South", "East", "West"];

function App() {
  const { filters, setFilters, filteredData, hasActiveFilters, clearFilters } =
    useFilters(mockSalesData);

  const metrics = useDashboardMetrics(filteredData);

  const formatCurrency = (value: number | string): string => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
    }).format(Number(value));
  };

  const columns: ColumnDef<SaleRecord>[] = [
    { field: "date", headerName: "Date", sortable: true, width: "8em" },
    { field: "customerName", headerName: "Customer", sortable: true },
    { field: "productName", headerName: "Product", sortable: true },
    { field: "category", headerName: "Category", sortable: true },
    { field: "region", headerName: "Region", sortable: true },
    {
      field: "totalAmount",
      headerName: "Amount",
      sortable: true,
      valueFormatter: formatCurrency,
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Sales Analytics Dashboard
            </h1>
          </div>
          <p className="text-gray-600 ml-11">
            Monitor your sales performance with interactive charts and real-time
            data
          </p>
        </header>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={DollarSign}
            title="Total Sales"
            value={metrics.totalSales}
            formatValue={formatCurrency}
          />
          <MetricCard
            icon={ShoppingCart}
            title="Total Orders"
            value={metrics.totalOrders}
            formatValue={(value) => value.toLocaleString()}
          />
          <MetricCard
            icon={Package}
            title="Avg Order Value"
            value={metrics.averageOrderValue}
            formatValue={formatCurrency}
          />
          <MetricCard
            icon={TrendingUp}
            title="Top Month"
            value={metrics.topPerformingMonth}
          />
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h2>
            </div>

            <div className="space-y-4">
              <SearchFilter
                value={filters.searchTerm}
                onChange={(searchTerm) =>
                  setFilters((f) => ({ ...f, searchTerm }))
                }
                disabled={false}
                loading={false}
                placeholder="Search customers, products..."
              />

              <DateRangePicker
                startDate={filters.dateRange.startDate}
                endDate={filters.dateRange.endDate}
                onStartDateChange={(startDate) =>
                  setFilters((f) => ({
                    ...f,
                    dateRange: { ...f.dateRange, startDate },
                  }))
                }
                onEndDateChange={(endDate) =>
                  setFilters((f) => ({
                    ...f,
                    dateRange: { ...f.dateRange, endDate },
                  }))
                }
                loading={false}
                disabled={false}
                error={null}
              />

              <MultiSelectFilter
                label="Categories"
                options={categoryOptions}
                selected={filters.categories}
                onChange={(categories) =>
                  setFilters((f) => ({ ...f, categories }))
                }
                disabled={false}
              />

              <MultiSelectFilter
                label="Regions"
                options={regionOptions}
                selected={filters.regions}
                onChange={(regions) => setFilters((f) => ({ ...f, regions }))}
                disabled={false}
              />

              <ClearFiltersButton
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                loading={false}
              />

              {hasActiveFilters && (
                <ActiveFiltersSummary
                  filters={filters}
                  resultCount={filteredData.length}
                  totalCount={mockSalesData.length}
                />
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Monthly Sales Trend */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <LineChart className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Monthly Sales Trend
                  </h3>
                </div>
                <SalesTrendChart data={getMonthlyData(filteredData)} />
              </div>

              {/* Secondary Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <BarChart3 className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Sales by Category
                    </h3>
                  </div>
                  <CategorySalesChart data={getCategoryData(filteredData)} />
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <PieChart className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Revenue by Region
                    </h3>
                  </div>
                  <RegionRevenueChart
                    data={getRegionData(filteredData)}
                    variant="donut"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Sales Records
                </h3>
                <p className="text-sm text-gray-500">
                  {filteredData.length} records{" "}
                  {hasActiveFilters && `filtered from ${mockSalesData.length}`}
                </p>
              </div>
            </div>
          </div>
          <DataTable
            data={filteredData}
            columns={columns}
            loading={false}
            pageSize={10}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
