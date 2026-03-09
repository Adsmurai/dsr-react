/**
 * BarChart wrapper component for DSR BarChart
 * 
 * Uses @adsmurai/design-system-react BarChart component with ECharts.
 * 
 * @example
 * <BarChart
 *   categories={['Jan', 'Feb', 'Mar']}
 *   series={[
 *     { name: 'Sales', data: [100, 200, 150] },
 *     { name: 'Revenue', data: [80, 160, 120], color: '#00cdc0' },
 *   ]}
 *   height={300}
 *   hasLegend
 * />
 */
import * as React from 'react';
import { BarChart as DSRBarChart } from '@adsmurai/design-system-react';

export interface BarChartSeriesData {
  /** Series name for legend */
  name: string;
  /** Data values array */
  data: number[] | { value: number; itemStyle?: { color?: string } }[];
  /** Color for this series */
  color?: string;
  /** Stack group name for stacked charts */
  stack?: string;
  /** Width of bars */
  barWidth?: number | string;
}

export interface BarChartProps {
  /** Categories for X axis */
  categories: string[];
  /** Series data array */
  series: BarChartSeriesData[];
  /** Height of the chart in pixels */
  height?: number;
  /** Show legend */
  hasLegend?: boolean;
  /** Legend data labels */
  legendData?: string[];
  /** Show value labels on bars */
  showLabel?: boolean;
  /** Grid configuration */
  grid?: {
    bottom?: number | string;
    top?: number | string;
    left?: number | string;
    right?: number | string;
    containLabel?: boolean;
  };
  /** Y-axis label formatter */
  yAxisLabelFormatter?: (value: string | number) => string;
  /** Data-qa attribute for testing */
  dataQa?: string;
}

/**
 * BarChart component
 * 
 * Wrapper around DSR's BarChart for bar chart visualization.
 */
export const BarChart: React.FC<BarChartProps> = ({
  categories,
  series,
  height = 300,
  hasLegend = true,
  legendData,
  showLabel = false,
  grid,
  yAxisLabelFormatter,
  dataQa,
}) => {
  return (
    <DSRBarChart
      categories={categories}
      series={series}
      height={height}
      hasLegend={hasLegend}
      legendData={legendData}
      showLabel={showLabel}
      grid={grid}
      yAxisLabelFormatter={yAxisLabelFormatter}
      dataQa={dataQa}
    />
  );
};

BarChart.displayName = 'BarChart';

export default BarChart;
