/**
 * Curve Wrapper - DSR Curve component
 * 
 * @description Decorative curve/wave SVG element for visual design.
 * Typically used as a section divider or background decoration.
 * 
 * @example
 * // Basic usage
 * <Curve />
 * 
 * // With wrapper for positioning
 * <div className="relative">
 *   <Curve />
 *   <div className="content">...</div>
 * </div>
 * 
 * @note This is a purely decorative element with no interactive functionality
 */
import { Curve as DSRCurve } from '@adsmurai/design-system-react';

export interface CurveProps {
  /** Test ID for QA */
  dataQa?: string;
}

export function Curve({ dataQa }: CurveProps) {
  return <DSRCurve dataQa={dataQa} />;
}

export default Curve;
