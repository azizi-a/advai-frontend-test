import { useState } from "react";
import { Calendar } from "lucide-react";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string | null;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  loading = false,
  disabled = false,
  className = "",
  error = null,
}: DateRangePickerProps) {
  const [activeInput, setActiveInput] = useState<"start" | "end" | null>(null);

  const handleDateChange = (type: "start" | "end", date: string) => {
    if (type === "start") {
      onStartDateChange(date);
    } else {
      onEndDateChange(date);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        Date Range
      </label>
      <div className="flex gap-2">
        <input
          type="date"
          className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm 
            ${
              disabled
                ? "bg-gray-100 cursor-not-allowed"
                : "focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ${error ? "border-red-500" : ""}
          ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          value={startDate}
          onChange={(e) => handleDateChange("start", e.target.value)}
          disabled={disabled || loading}
          onFocus={() => setActiveInput("start")}
          onBlur={() => setActiveInput(null)}
        />
        <input
          type="date"
          className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm 
            ${
              disabled
                ? "bg-gray-100 cursor-not-allowed"
                : "focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ${error ? "border-red-500" : ""}
          ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          value={endDate}
          onChange={(e) => handleDateChange("end", e.target.value)}
          disabled={disabled || loading}
          onFocus={() => setActiveInput("end")}
          onBlur={() => setActiveInput(null)}
        />
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
