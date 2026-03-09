/**
 * @fileoverview Slider component wrapper for DSR Slider
 *
 * @description
 * Wrapper that adapts DSR Slider to a standard React API.
 * DSR Slider uses `minValue`/`maxValue` instead of `min`/`max`.
 *
 * @when_to_use
 * - Selection of numeric values within a range
 * - Volume, brightness adjustments, etc.
 * - Price filters
 *
 * @when_not_to_use
 * - For exact numeric input -> use Input type="number"
 * - For rating -> use Rating
 *
 * @example
 * ```tsx
 * // Basic
 * <Slider value={[50]} onValueChange={([v]) => setValue(v)} min={0} max={100} />
 *
 * // With text prefix and suffix
 * <Slider
 *   value={[price]}
 *   onValueChange={([v]) => setPrice(v)}
 *   min={0}
 *   max={1000}
 *   prefixText="$"
 *   suffixText="USD"
 * />
 *
 * // With marks (ticks)
 * <Slider value={[50]} onValueChange={([v]) => setValue(v)} marks />
 * ```
 */
import * as React from "react";
import { Slider as DSRSlider, AddOnType, IconsEnum } from "@adsmurai/design-system-react";

import { cn } from "@/lib/utils";

export interface SliderProps {
  /** Current value (array for Radix compatibility, first element is used) */
  value?: number[];
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Increment step (note: DSR Slider does not support step directly) */
  step?: number;
  /** Callback when value changes */
  onValueChange?: (value: number[]) => void;
  /** Whether it is disabled */
  disabled?: boolean;
  /** Show marks/ticks on the slider */
  marks?: boolean;
  /** Prefix text (e.g.: "$") */
  prefixText?: string;
  /** Prefix icon (IconsEnum name) */
  prefixIcon?: keyof typeof IconsEnum;
  /** Suffix text (e.g.: "%", "USD") */
  suffixText?: string;
  /** Suffix icon (IconsEnum name) */
  suffixIcon?: keyof typeof IconsEnum;
  /** Element ID */
  id?: string;
  /** data-qa attribute for testing */
  dataQa?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Slider component that internally uses DSR Slider.
 * Maintains standard API (value, min, max, step)
 */
const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ 
    className, 
    value = [0], 
    min = 0, 
    max = 100, 
    step = 1, 
    onValueChange, 
    disabled,
    marks = false,
    prefixText,
    prefixIcon,
    suffixText,
    suffixIcon,
    id,
    dataQa,
  }, ref) => {
    const handleChange = (newValue: number | undefined) => {
      if (newValue !== undefined) {
        onValueChange?.([newValue]);
      }
    };

    // Build prefix object if there is text or icon
    const prefix = prefixText 
      ? { type: AddOnType.Text, label: prefixText }
      : prefixIcon 
        ? { type: AddOnType.Icon, label: IconsEnum[prefixIcon] }
        : undefined;

    // Build suffix object if there is text or icon
    const suffix = suffixText 
      ? { type: AddOnType.Text, label: suffixText }
      : suffixIcon 
        ? { type: AddOnType.Icon, label: IconsEnum[suffixIcon] }
        : undefined;

    return (
      <div ref={ref} className={cn("w-full", className)}>
        <DSRSlider
          value={value[0]}
          minValue={min}
          maxValue={max}
          onChange={handleChange}
          disabled={disabled}
          marks={marks}
          prefix={prefix}
          suffix={suffix}
          id={id}
          dataQa={dataQa}
        />
      </div>
    );
  },
);
Slider.displayName = "Slider";

export { Slider };
