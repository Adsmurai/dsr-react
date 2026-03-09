/**
 * @fileoverview InputSearch wrapper for DSR InputSearch
 *
 * @description
 * Wrapper that adapts DSR InputSearch to a standard React API.
 * DSR InputSearch uses `search`/`onSearch` instead of `value`/`onChange`.
 *
 * @when_to_use
 * - Search fields with integrated icon
 * - List/table filtering
 * - Main search bars
 *
 * @when_not_to_use
 * - For generic text inputs -> use Input
 * - For complex forms -> use InputField
 *
 * @example
 * ```tsx
 * <InputSearch value={query} onChange={setQuery} label="Search..." />
 * ```
 */
import * as React from "react";
import { InputSearch as DSRInputSearch } from "@adsmurai/design-system-react";
import { cn } from "@/lib/utils";

/**
 * Valid InputSearch size values.
 *
 * @example
 * ```tsx
 * <InputSearch size="small" value={query} onChange={setQuery} />
 * <InputSearch size="large" value={query} onChange={setQuery} />
 * ```
 */
export const INPUT_SEARCH_SIZES = {
  /** Small - compact (default) */
  small: 'small',
  /** Medium */
  medium: 'medium',
  /** Large */
  large: 'large',
} as const;

export interface InputSearchProps {
  /** Current search value */
  value?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Input label (DSR does not support placeholder, uses label) */
  label?: string;
  /** If disabled */
  disabled?: boolean;
  /** Size */
  size?: "small" | "medium" | "large";
  /**
   * Compact mode that removes extra bottom spacing.
   * Useful for table filters where error messages are not shown.
   * @default false
   */
  compact?: boolean;
  /** Additional CSS classes (DSR InputSearch accepts className) */
  className?: string;
}

/**
 * InputSearch component that internally uses DSR InputSearch.
 * Adapts standard value/onChange to DSR's search/onSearch.
 */
const InputSearch = React.forwardRef<HTMLDivElement, InputSearchProps>(
  ({ className, value = "", onChange, label = "Search", disabled, size = "small", compact = false }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn(
          "w-full",
          compact && "[&_.MuiFormControl-root]:!mb-0 [&_.MuiFormHelperText-root]:!hidden",
          className
        )}
      >
        <DSRInputSearch
          search={value}
          onSearch={(newValue: string) => onChange?.(newValue)}
          label={label}
          disabled={disabled}
          size={size}
          isAlwaysOpened
        />
      </div>
    );
  }
);
InputSearch.displayName = "InputSearch";

export { InputSearch };
