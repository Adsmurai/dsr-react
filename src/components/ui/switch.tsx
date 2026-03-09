/**
 * @fileoverview Switch component wrapper for DSR Switch
 *
 * @description
 * Wrapper that adapts DSR Switch to a standard React API.
 * DSR Switch uses `value` (boolean) instead of `checked` and
 * does NOT have a `label` prop - it must be rendered separately.
 *
 * @when_to_use
 * - On/off toggles for settings
 * - Enable/disable features
 * - Binary preferences with clear visual feedback
 *
 * @when_not_to_use
 * - For multiple selection → use Checkbox
 * - For options with long text → use Checkbox with label
 *
 * @example
 * ```tsx
 * // Basic
 * <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
 *
 * // With external label
 * <div className="flex items-center gap-2">
 *   <Switch checked={isDark} onCheckedChange={setIsDark} />
 *   <Typography>Dark mode</Typography>
 * </div>
 *
 * // Initial value (uncontrolled)
 * <Switch defaultChecked={true} onCheckedChange={handleChange} />
 * ```
 */
import * as React from "react";
import { Switch as DSRSwitch } from "@adsmurai/design-system-react";

import { cn } from "@/lib/utils";

export interface SwitchProps {
  /** Switch state (controlled) */
  checked?: boolean;
  /** Initial switch state (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Whether it is disabled */
  disabled?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
  /** Element ID */
  id?: string;
  /** Field name */
  name?: string;
  /** data-qa attribute for testing */
  dataQa?: string;
}

/**
 * Switch component that internally uses DSR Switch.
 * Maintains standard React API (checked, onCheckedChange, disabled)
 *
 * NOTE: DSR Switch does not support refs, that's why we don't use forwardRef
 */
const Switch: React.FC<SwitchProps> = ({ 
  className, 
  checked, 
  defaultChecked,
  onCheckedChange, 
  disabled, 
  id, 
  name,
  dataQa,
}) => {
  const handleChange = (newValue: boolean) => {
    onCheckedChange?.(newValue);
  };

  return (
    <div className={cn("inline-flex items-center", className)}>
      <DSRSwitch
        value={checked}
        defaultValue={defaultChecked}
        onChange={handleChange}
        disabled={disabled}
        dataQa={dataQa}
      />
    </div>
  );
};
Switch.displayName = "Switch";

export { Switch };
