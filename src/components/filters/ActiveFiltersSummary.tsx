import React from "react";
import { Badge, Card } from "../ui";
import { FilterState } from "../../types";

interface ActiveFiltersSummaryProps {
  filters: FilterState;
  resultCount: number;
  totalCount: number;
}

export const ActiveFiltersSummary: React.FC<ActiveFiltersSummaryProps> = ({
  filters,
  resultCount,
  totalCount,
}) => (
  <Card padding="sm">
    <h3 className="text-sm font-medium text-gray-900 mb-2">Active Filters</h3>
    <div className="flex flex-wrap gap-1 mb-2">
      {filters.searchTerm && (
        <Badge variant="info" size="sm">
          Search: {filters.searchTerm}
        </Badge>
      )}
      {filters.categories.map((category) => (
        <Badge key={category} variant="default" size="sm">
          {category}
        </Badge>
      ))}
      {filters.regions.map((region) => (
        <Badge key={region} variant="default" size="sm">
          {region}
        </Badge>
      ))}
    </div>
    <p className="text-xs text-gray-500">
      Showing {resultCount} of {totalCount} records
    </p>
  </Card>
);
