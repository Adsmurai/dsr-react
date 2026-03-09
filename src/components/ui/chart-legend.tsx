/**
 * @fileoverview ChartLegend wrapper for DSR ChartLegend component
 *
 * @description
 * Wrapper that adapts DSR ChartLegend for chart legends.
 * Typically used alongside DonutChart, BarChart, LineChart.
 *
 * @example
 * // Basic legend
 * const data = [
 *   { name: 'Sales', value: 1200, color: '#008dff' },
 *   { name: 'Expenses', value: 800, color: '#ff486d' },
 * ];
 * <ChartLegend items={data} />
 *
 * @example
 * // Vertical legend with square icons
 * <ChartLegend
 *   items={data}
 *   variant="vertical"
 *   iconType="square"
 * />
 */
import * as React from "react";
import { ChartLegend as DSRChartLegend } from "@adsmurai/design-system-react";
import { cn } from "@/lib/utils";

/**
 * Available icon types for chart legend items.
 */
export const CHART_LEGEND_ICON_TYPES = ['square', 'circle', 'cross', 'diamond', 'star', 'triangle', 'wye'] as const;

/**
 * Available layout variants for chart legend.
 * - `default`: Horizontal inline layout
 * - `vertical`: Stacked vertical layout
 * - `list`: List-style layout with more spacing
 */
export const CHART_LEGEND_VARIANTS = ['default', 'vertical', 'list'] as const;

/** Type for legend icon values */
export type LegendIconType = (typeof CHART_LEGEND_ICON_TYPES)[number];

/** Type for chart legend variant values */
export type ChartLegendVariant = (typeof CHART_LEGEND_VARIANTS)[number];

export interface ChartLegendItem {
  /** Item name/label */
  name: string;
  /** Numeric or string value */
  value: number | string;
  /** Indicator color */
  color: string;
  /** Formatted value for display (optional) */
  formatted?: string;
}

export interface ChartLegendProps {
  /** Legend items */
  items: ChartLegendItem[];
  /** Icon type for each item */
  iconType?: LegendIconType;
  /** Layout variant */
  variant?: ChartLegendVariant;
  /** Additional CSS classes */
  className?: string;
}

export function ChartLegend({
  items,
  iconType = "circle",
  variant = "default",
  className,
}: ChartLegendProps): React.ReactElement {
  // Convert items to DSR expected format
  const payload = items.map(item => ({
    name: item.name,
    value: item.value,
    color: item.color,
    formatted: item.formatted,
  }));

  return (
    <div className={cn("inline-flex", className)}>
      <DSRChartLegend
        payload={payload}
        iconType={iconType}
        variant={variant}
      />
    </div>
  );
}

ChartLegend.displayName = "ChartLegend";
