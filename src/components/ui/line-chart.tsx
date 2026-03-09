/**
 * LineChart wrapper component
 * 
 * HTML/SVG fallback for line chart visualization.
 * DSR's LineChartWidget caused re-render loops, using stable SVG implementation.
 * 
 * @example
 * <LineChart
 *   data={[
 *     { label: 'Jan', value: 100 },
 *     { label: 'Feb', value: 200 },
 *   ]}
 *   height={200}
 * />
 */
import * as React from 'react';

export interface LineChartDataItem {
  /** Label for the data point */
  label: string;
  /** Value for the data point */
  value: number;
}

export interface LineChartProps {
  /** Data for the chart */
  data: LineChartDataItem[];
  /** Height of the chart */
  height?: number;
  /** Width of the chart */
  width?: number | string;
  /** Line color */
  color?: string;
  /** Show data points */
  showDots?: boolean;
  /** Optional className */
  className?: string;
}

/**
 * LineChart component
 * 
 * Simple line chart visualization using SVG.
 */
export const LineChart: React.FC<LineChartProps> = ({
  data,
  height = 200,
  width = '100%',
  color = '#008dff',
  showDots = true,
  className,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(300);

  React.useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  if (data.length === 0) return null;

  const padding = 40;
  const chartWidth = containerWidth - padding * 2;
  const chartHeight = height - padding * 2;

  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));
  const valueRange = maxValue - minValue || 1;

  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1 || 1)) * chartWidth;
    const y = padding + chartHeight - ((item.value - minValue) / valueRange) * chartHeight;
    return { x, y, ...item };
  });

  const pathD = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  return (
    <div 
      ref={containerRef}
      className={`relative ${className || ''}`}
      style={{ width, height }}
    >
      <svg 
        width="100%" 
        height={height}
        className="overflow-visible"
      >
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <line
            key={i}
            x1={padding}
            y1={padding + chartHeight * ratio}
            x2={containerWidth - padding}
            y2={padding + chartHeight * ratio}
            stroke="currentColor"
            strokeOpacity={0.1}
          />
        ))}

        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dots */}
        {showDots && points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={4}
            fill={color}
          />
        ))}

        {/* Labels */}
        {points.map((point, index) => (
          <text
            key={index}
            x={point.x}
            y={height - 10}
            textAnchor="middle"
            className="text-xs fill-muted-foreground"
          >
            {point.label}
          </text>
        ))}
      </svg>
    </div>
  );
};

LineChart.displayName = 'LineChart';

export default LineChart;
