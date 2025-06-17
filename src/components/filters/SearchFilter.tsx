import { Search, X, LoaderCircle } from "lucide-react";
import { ChangeEvent, useRef } from "react";

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function SearchFilter({
  value,
  onChange,
  placeholder = "Search...",
  disabled = false,
  loading = false,
  className = "",
}: SearchFilterProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {loading && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LoaderCircle className="h-4 w-4 text-gray-400 animate-spin" />
          </div>
        )}
        {(!loading && !value) || disabled ? (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
        ) : null}
        {value && !disabled && !loading && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={handleClear}
              aria-label="Clear search">
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          className={`block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm ${
            disabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          disabled={disabled || loading}
        />
      </div>
    </div>
  );
}
