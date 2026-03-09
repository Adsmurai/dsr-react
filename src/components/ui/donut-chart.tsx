/**
 * DonutChart wrapper component for DSR DonutChartV2
 * 
 * Uses @adsmurai/design-system-react DonutChartV2 component with ECharts.
 * 
 * @example
 * <DonutChart
 *   data={[
 *     { name: 'Category A', value: 40 },
 *     { name: 'Category B', value: 30 },
 *   ]}
 *   height={300}
 *   hasLegend
 * />
 */
import * as React from 'react';
import { DonutChartV2 } from '@adsmurai/design-system-react';

export interface DonutChartDataItem {
  /** Name/label for the segment */
  name: string;
  /** Value for the segment */
  value: number;
}

export interface DonutChartProps {
  /** Data for the chart - array of { name, value } */
  data: DonutChartDataItem[];
  /** Height of the chart in pixels */
  height?: number;
  /** Colors for segments (hex values) */
  colors?: string[];
  /** Show legend */
  hasLegend?: boolean;
  /** Show inner label with total */
  hasInnerLabel?: boolean;
  /** Display as half donut */
  isHalfDonutChart?: boolean;
  /** Show tooltip on hover */
  hasTooltip?: boolean;
  /** Show total sum in center */
  showTotalSum?: boolean;
  /** Data-qa attribute for testing */
  dataQa?: string;
}

/**
 * DonutChart component
 * 
 * Wrapper around DSR's DonutChartV2 for donut/pie chart visualization.
 */
export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  height = 300,
  colors,
  hasLegend = true,
  hasInnerLabel = false,
  isHalfDonutChart = false,
  hasTooltip = true,
  showTotalSum = false,
  dataQa,
}) => {
  return (
    <DonutChartV2
      data={data}
      height={height}
      color={colors}
      hasLegend={hasLegend}
      hasInnerLabel={hasInnerLabel}
      isHalfDonutChart={isHalfDonutChart}
      hasTooltip={hasTooltip}
      showTotalSum={showTotalSum}
      dataQa={dataQa}
    />
  );
};

DonutChart.displayName = 'DonutChart';

export default DonutChart;
