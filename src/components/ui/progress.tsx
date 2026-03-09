/**
 * @fileoverview Progress component wrapper for DSR Progress
 *
 * @description
 * Wrapper that adapts DSR Progress to a standard React API.
 * DSR Progress requires `value` as a number (not string).
 *
 * @when_to_use
 * - Task progress indicators
 * - Loading bars
 * - Completion indicators
 *
 * @when_not_to_use
 * - For loading spinners -> use Button isLoading or Skeleton
 * - For circular charts -> use ProgressPieChart
 *
 * @example
 * ```tsx
 * // Basic
 * <Progress value={75} />
 *
 * // With custom maximum
 * <Progress value={30} max={50} />
 *
 * // Color variants
 * <Progress value={60} variant="success" />
 * <Progress value={40} variant="warning" />
 * <Progress value={20} variant="error" />
 *
 * // Sizes
 * <Progress value={50} size="sm" />
 * <Progress value={50} size="md" />
 * <Progress value={50} size="lg" />
 *
 * // With label
 * <Progress value={75} showLabel />
 *
 * // Indeterminate (loading without known percentage)
 * <Progress indeterminate />
 * ```
 */
import * as React from "react";
import { Progress as DSRProgress } from "@adsmurai/design-system-react";

import { cn } from "@/lib/utils";

/**
 * Valid Progress variant values (colors).
 *
 * @example
 * ```tsx
 * <Progress value={75} variant="success" />
 * <Progress value={30} variant="error" />
 * ```
 */
export const PROGRESS_VARIANTS = {
  /** Default color (primary) */
  default: 'default',
  /** Success - green */
  success: 'success',
  /** Warning - yellow/orange */
  warning: 'warning',
  /** Error - red */
  error: 'error',
  /** Info - blue */
  info: 'info',
} as const;

/**
 * Valid Progress size values.
 *
 * @example
 * ```tsx
 * <Progress value={50} size="sm" />
 * <Progress value={50} size="lg" />
 * ```
 */
export const PROGRESS_SIZES = {
  /** Small - thin bar */
  sm: 'sm',
  /** Medium - default */
  md: 'md',
  /** Large - thick bar */
  lg: 'lg',
} as const;

export interface ProgressProps {
  /** Progress value (0-max) */
  value?: number;
  /** Maximum value */
  max?: number;
  /** Color variant */
  variant?: "default" | "success" | "warning" | "error" | "info";
  /** Bar size */
  size?: "sm" | "md" | "lg";
  /** Show label with percentage */
  showLabel?: boolean;
  /** Indeterminate mode (without known value) */
  indeterminate?: boolean;
  /** data-qa attribute for testing */
  dataQa?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Progress component that internally uses DSR Progress.
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100, 
    variant = "default",
    size = "md",
    showLabel = false,
    indeterminate = false,
    dataQa,
    ...props 
  }, ref) => {
    // Normalize value to percentage if max !== 100
    const normalizedValue = max !== 100 ? Math.round((value / max) * 100) : value;

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <DSRProgress 
          value={indeterminate ? undefined : normalizedValue} 
          max={100}
          dataQa={dataQa}
        />
        {showLabel && !indeterminate && (
          <span className="text-xs text-muted-foreground mt-1">
            {normalizedValue}%
          </span>
        )}
      </div>
    );
  },
);
Progress.displayName = "Progress";

export { Progress };
