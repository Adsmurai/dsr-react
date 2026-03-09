/**
 * @fileoverview RadioGroup component wrapper for DSR RadioButtonGroup
 *
 * @description
 * Wrapper that adapts DSR RadioButtonGroup to a standard React API.
 * DSR RadioButton uses `selected` instead of `checked`.
 *
 * @ai-note CRITICAL: RadioGroupItem children must be plain text (string), NOT JSX.
 * Passing JSX elements will result in "[object Object]" being displayed.
 *
 * @when_to_use
 * - Single selection among mutually exclusive options
 * - When all options should be visible
 *
 * @when_not_to_use
 * - For multiple selection -> use Checkbox
 * - For many options -> use Select
 *
 * @example
 * ```tsx
 * // CORRECT - string children
 * <RadioGroup value={selected} onValueChange={setSelected}>
 *   <RadioGroupItem value="opt1">Option 1</RadioGroupItem>
 *   <RadioGroupItem value="opt2">Option 2</RadioGroupItem>
 *   <RadioGroupItem value="opt3">Option 3</RadioGroupItem>
 * </RadioGroup>
 *
 * // WRONG - JSX children will break
 * <RadioGroup value={selected} onValueChange={setSelected}>
 *   <RadioGroupItem value="opt1"><Icon />Option 1</RadioGroupItem>  // DON'T DO THIS
 * </RadioGroup>
 *
 * // Horizontal
 * <RadioGroup value={selected} onValueChange={setSelected} orientation="horizontal">
 *   <RadioGroupItem value="a">A</RadioGroupItem>
 *   <RadioGroupItem value="b">B</RadioGroupItem>
 * </RadioGroup>
 *
 * // With disabled item
 * <RadioGroup value={selected} onValueChange={setSelected}>
 *   <RadioGroupItem value="opt1">Option 1</RadioGroupItem>
 *   <RadioGroupItem value="opt2" disabled>Option 2 (not available)</RadioGroupItem>
 * </RadioGroup>
 * ```
 */
import * as React from "react";
import { RadioButton, RadioButtonGroup as DSRRadioButtonGroup } from "@adsmurai/design-system-react";

import { cn } from "@/lib/utils";

/**
 * Valid RadioGroup orientation values.
 *
 * @example
 * ```tsx
 * <RadioGroup orientation="vertical" value={v} onValueChange={setV}>
 *   <RadioGroupItem value="a">Option A</RadioGroupItem>
 *   <RadioGroupItem value="b">Option B</RadioGroupItem>
 * </RadioGroup>
 * ```
 */
export const RADIO_GROUP_ORIENTATIONS = {
  /** Vertical - stacked (default) */
  vertical: 'vertical',
  /** Horizontal - inline */
  horizontal: 'horizontal',
} as const;

export interface RadioGroupProps {
  /** Current selected value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Callback when selection changes */
  onValueChange?: (value: string) => void;
  /** If disabled (entire group) */
  disabled?: boolean;
  /** Group orientation */
  orientation?: "vertical" | "horizontal";
  /** Field name (for forms) */
  name?: string;
  /** data-qa attribute for testing */
  dataQa?: string;
  /** Additional CSS classes */
  className?: string;
  /** Radio items */
  children?: React.ReactNode;
}

/**
 * RadioGroup container that internally uses DSR RadioButtonGroup.
 */
const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ 
    className, 
    value, 
    defaultValue, 
    onValueChange, 
    disabled, 
    orientation = "vertical",
    name,
    dataQa,
    children, 
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const orientationClass = orientation === "horizontal" 
      ? "flex flex-row gap-4" 
      : "grid gap-2";

    return (
      <div 
        ref={ref} 
        className={cn(orientationClass, className)}
        role="radiogroup"
        data-qa={dataQa}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === RadioGroupItem) {
            return React.cloneElement(child as React.ReactElement<RadioGroupItemProps>, {
              selected: currentValue === (child.props as RadioGroupItemProps).value,
              onSelect: handleChange,
              disabled: disabled || (child.props as RadioGroupItemProps).disabled,
              name,
            });
          }
          return child;
        })}
      </div>
    );
  },
);
RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps {
  /** Value of this item */
  value: string;
  /** If selected (controlled by RadioGroup) */
  selected?: boolean;
  /** Selection callback (controlled by RadioGroup) */
  onSelect?: (value: string) => void;
  /** If disabled */
  disabled?: boolean;
  /** Field name (passed by RadioGroup) */
  name?: string;
  /** Additional CSS classes */
  className?: string;
  /** Element ID */
  id?: string;
  /** data-qa attribute for testing */
  dataQa?: string;
  /**
   * Radio label - MUST be plain text string.
   * @ai-note DO NOT pass JSX elements - they will render as "[object Object]"
   */
  children?: string;
}

/**
 * RadioGroupItem that internally uses DSR RadioButton.
 */
const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, selected, onSelect, disabled, name, children, id, dataQa }, ref) => {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <RadioButton
          value={value}
          selected={selected}
          onChange={() => onSelect?.(value)}
          disabled={disabled}
          dataQa={dataQa}
        >
          {children ? String(children) : undefined}
        </RadioButton>
      </div>
    );
  },
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
