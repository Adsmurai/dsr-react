/**
 * ProcessingIcon Wrapper - DSR ProcessingIcon component
 * 
 * @description Animated spinner icon for loading states. Use when you need
 * a spinning indicator without text.
 * 
 * @example
 * // Basic usage
 * <ProcessingIcon />
 * 
 * // With custom size and density
 * <ProcessingIcon width={48} density="high" />
 * 
 * @see Use Button's isLoading prop for button loading states
 * @see Use Skeleton for content placeholders
 */
import { ProcessingIcon as DSRProcessingIcon } from '@adsmurai/design-system-react';

/**
 * Available spinner line densities for ProcessingIcon.
 * - `low`: Sparse lines
 * - `medium`: Default density
 * - `high`: Dense lines
 */
export const PROCESSING_ICON_DENSITIES = ['low', 'medium', 'high'] as const;

/** Type for processing icon density values */
export type SpinnerDensity = (typeof PROCESSING_ICON_DENSITIES)[number];

export interface ProcessingIconProps {
  /** Width/size of the spinner in pixels */
  width?: number;
  /** Line density of the spinner */
  density?: SpinnerDensity;
  /** Test ID for QA */
  dataQa?: string;
  /** Additional CSS class */
  className?: string;
}

const densityMap: Record<SpinnerDensity, 'Low' | 'Medium' | 'High'> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export function ProcessingIcon({
  width = 24,
  density = 'medium',
  dataQa,
}: ProcessingIconProps) {
  return (
    <DSRProcessingIcon
      width={width}
      spinnerLinesDensity={densityMap[density]}
      dataQa={dataQa}
    />
  );
}

export default ProcessingIcon;
