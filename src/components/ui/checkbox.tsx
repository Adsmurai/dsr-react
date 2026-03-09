/**
 * @fileoverview Checkbox component wrapper for DSR CheckBox
 *
 * @description
 * Wrapper that adapts DSR CheckBox to a standard React API.
 * DSR CheckBox uses `value` (boolean) instead of `checked` and
 * `onChange` receives boolean directly, not event.
 *
 * @ai-note CRITICAL: Checkbox children must be plain text (string), NOT JSX.
 * Passing JSX elements will result in "[object Object]" being displayed.
 * Also, this component does NOT support refs (DSR limitation).
 *
 * @when_to_use
 * - Multiple selection in forms
 * - Option/preference toggles
 * - Terms and conditions acceptance
 *
 * @when_not_to_use
 * - For visual on/off toggle → use Switch
 * - For single selection → use RadioGroup
 *
 * @example
 * ```tsx
 * // CORRECT - string children
 * <Checkbox checked={isAccepted} onCheckedChange={setIsAccepted}>
 *   I accept the terms
 * </Checkbox>
 *
 * // WRONG - JSX children will break
 * <Checkbox checked={isActive} onCheckedChange={setIsActive}>
 *   <strong>Enable</strong> notifications  // DON'T DO THIS
 * </Checkbox>
 *
 * // Basic without label
 * <Checkbox checked={isAccepted} onCheckedChange={setIsAccepted} />
 *
 * // Rounded style
 * <Checkbox checked={value} onCheckedChange={setValue} rounded />
 *
 * // Indeterminate (for "select all")
 * <Checkbox checked={allSelected} indeterminate={someSelected} />
 * ```
 */
import * as React from "react";
import { CheckBox as DSRCheckBox } from "@adsmurai/design-system-react";

import { cn } from "@/lib/utils";

export interface CheckboxProps {
  /** Checkbox state */
  checked?: boolean;
  /** Callback when state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Whether it is disabled */
  disabled?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
  /**
   * Checkbox label - MUST be plain text string.
   * @ai-note DO NOT pass JSX elements - they will render as "[object Object]"
   */
  children?: string;
  /** Element ID */
  id?: string;
  /** Field name */
  name?: string;
  /** Indeterminate state (for "select all") */
  indeterminate?: boolean;
  /** Checkbox with rounded borders */
  rounded?: boolean;
  /** data-qa attribute for testing */
  dataQa?: string;
}

/**
 * Checkbox component that internally uses DSR CheckBox.
 * Maintains standard React API (checked, onCheckedChange, disabled)
 *
 * NOTE: DSR CheckBox does not support refs, that's why we don't use forwardRef
 */
const Checkbox: React.FC<CheckboxProps> = ({
  className,
  checked = false,
  onCheckedChange,
  disabled,
  children,
  id,
  name,
  indeterminate,
  rounded = false,
  dataQa,
}) => {
  const handleChange = (newValue: boolean) => {
    onCheckedChange?.(newValue);
  };

  return (
    <div className={cn("inline-flex items-center", className)}>
      <DSRCheckBox
        value={checked}
        onChange={handleChange}
        disabled={disabled}
        indeterminate={indeterminate}
        rounded={rounded}
        id={id}
        name={name}
        dataQa={dataQa}
      >
        {children ? String(children) : undefined}
      </DSRCheckBox>
    </div>
  );
};
Checkbox.displayName = "Checkbox";

export { Checkbox };
