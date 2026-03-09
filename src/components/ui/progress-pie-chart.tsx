/**
 * @fileoverview ProgressPieChart wrapper for DSR ProgressPieChart component
 *
 * @description
 * Wrapper that adapts DSR ProgressPieChart to display circular progress.
 * Ideal for compact progress indicators, metrics, dashboards.
 *
 * @example
 * // Basic progress
 * <ProgressPieChart value={75} />
 *
 * @example
 * // With customization
 * <ProgressPieChart
 *   value={60}
 *   size={80}
 *   showText
 *   color="hsl(var(--primary))"
 * />
 */
import * as React from "react";
import { ProgressPieChart as DSRProgressPieChart } from "@adsmurai/design-system-react";
import { cn } from "@/lib/utils";

export interface ProgressPieChartProps {
  /** Progress value (0-100) */
  value: number;
  /** Chart width in pixels */
  size?: number;
  /** Progress bar thickness */
  barSize?: number;
  /** Progress fill color */
  color?: string;
  /** Show text with percentage */
  showText?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function ProgressPieChart({
  value,
  size = 48,
  barSize,
  color,
  showText = false,
  className,
}: ProgressPieChartProps): React.ReactElement {
  return (
    <div className={cn("inline-flex", className)}>
      <DSRProgressPieChart
        value={value}
        width={size}
        barSize={barSize}
        fillColor={color}
        hasText={showText}
      />
    </div>
  );
}

ProgressPieChart.displayName = "ProgressPieChart";
