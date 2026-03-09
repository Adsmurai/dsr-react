/**
 * @fileoverview ToggleButtonGroup wrapper for DSR ToggleButtonGroup
 *
 * @description
 * Container for ToggleButton components with selection management.
 * Supports single and multiple selection modes.
 *
 * @when_to_use
 * - Grouped toggle buttons for selection
 * - View mode switches
 * - Format toolbars
 *
 * @when_not_to_use
 * - For navigation -> use Tabs
 * - For form options -> use RadioGroup or CheckboxGroup
 *
 * @example
 * ```tsx
 * // Single selection (exclusive)
 * const [value, setValue] = useState('left');
 *
 * <ToggleButtonGroup value={value} onChange={setValue}>
 *   <ToggleButton value="left" label="Left" />
 *   <ToggleButton value="center" label="Center" />
 *   <ToggleButton value="right" label="Right" />
 * </ToggleButtonGroup>
 *
 * // Multiple selection
 * const [values, setValues] = useState(['bold']);
 *
 * <ToggleButtonGroup value={values} onChange={setValues} isMultiple>
 *   <ToggleButton value="bold" icon={IconsEnum.FormatBold} />
 *   <ToggleButton value="italic" icon={IconsEnum.FormatItalic} />
 *   <ToggleButton value="underline" icon={IconsEnum.FormatUnderlined} />
 * </ToggleButtonGroup>
 *
 * // With size variant
 * <ToggleButtonGroup value={view} onChange={setView} size="small">
 *   <ToggleButton value="list" label="List" />
 *   <ToggleButton value="grid" label="Grid" />
 * </ToggleButtonGroup>
 * ```
 */
import * as React from "react";
import { ToggleButtonGroup as DSRToggleButtonGroup } from "@adsmurai/design-system-react";
import { cn } from "@/lib/utils";

/**
 * Valid ToggleButtonGroup size values.
 *
 * @example
 * ```tsx
 * <ToggleButtonGroup size="small" value={v} onChange={setV}>...</ToggleButtonGroup>
 * ```
 */
export const TOGGLE_BUTTON_GROUP_SIZES = {
  /** Small size */
  small: 'small',
  /** Medium size (default) */
  medium: 'medium',
  /** Large size */
  large: 'large',
} as const;

/**
 * Valid ToggleButtonGroup variant values.
 *
 * @example
 * ```tsx
 * <ToggleButtonGroup variant="secondary" value={v} onChange={setV}>...</ToggleButtonGroup>
 * ```
 */
export const TOGGLE_BUTTON_GROUP_VARIANTS = {
  /** Primary variant */
  primary: 'primary',
  /** Secondary variant */
  secondary: 'secondary',
} as const;

export interface ToggleButtonGroupProps {
  /** Currently selected value(s) */
  value?: string | string[];
  /** Change handler */
  onChange?: (value: string | string[] | undefined) => void;
  /** ToggleButton children */
  children: React.ReactNode;
  /** Whether multiple buttons can be selected */
  isMultiple?: boolean;
  /** Default selected value */
  defaultValue?: string;
  /** Size variant */
  size?: "small" | "medium" | "large";
  /** Visual variant */
  variant?: "primary" | "secondary";
  /** Show scroll buttons for overflow */
  hasScrollButtons?: boolean;
  /** Additional className for wrapper */
  className?: string;
  /** data-qa attribute for testing */
  dataQa?: string;
}

/**
 * ToggleButtonGroup component - wrapper for DSR ToggleButtonGroup.
 */
export const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  value,
  onChange,
  children,
  isMultiple = false,
  defaultValue,
  size = "medium",
  variant,
  hasScrollButtons,
  className,
  dataQa,
}) => {
  return (
    <div className={cn(className)}>
      <DSRToggleButtonGroup
        value={value}
        onChange={onChange}
        isMultiple={isMultiple}
        defaultValue={defaultValue}
        size={size}
        variant={variant}
        hasScrollButtons={hasScrollButtons}
        dataQa={dataQa}
      >
        {children}
      </DSRToggleButtonGroup>
    </div>
  );
};

ToggleButtonGroup.displayName = "ToggleButtonGroup";

export default ToggleButtonGroup;
