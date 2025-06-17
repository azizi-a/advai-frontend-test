import { LoaderCircle } from "lucide-react";

interface ClearFiltersButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  className?: string;
}

export function ClearFiltersButton({
  onClick,
  disabled = false,
  loading = false,
  label = "Clear Filters",
  className = "",
}: ClearFiltersButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium
        ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      aria-disabled={disabled || loading}>
      {loading && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
      {label}
    </button>
  );
}
