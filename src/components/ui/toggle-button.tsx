/**
 * @fileoverview ToggleButton wrapper for DSR ToggleButton
 *
 * @description
 * A selectable button that can be toggled on/off using DSR ToggleButton.
 * Used inside ToggleButtonGroup for grouped selection.
 *
 * @when_to_use
 * - Binary state toggles (on/off)
 * - Grouped selection buttons
 * - View mode switches
 *
 * @when_not_to_use
 * - For form boolean inputs -> use Switch or Checkbox
 * - For navigation -> use Tabs
 *
 * @example
 * ```tsx
 * // Inside a ToggleButtonGroup
 * <ToggleButtonGroup value={alignment} onChange={setAlignment}>
 *   <ToggleButton value="left" label="Left" />
 *   <ToggleButton value="center" label="Center" />
 *   <ToggleButton value="right" label="Right" />
 * </ToggleButtonGroup>
 *
 * // With icon
 * import { IconsEnum } from 'adsmurai-dsr-react/enums';
 * <ToggleButton value="bold" icon={IconsEnum.FormatBold} />
 *
 * // With label and icon
 * <ToggleButton value="grid" label="Grid View" icon={IconsEnum.GridView} />
 * ```
 */
import * as React from "react";
import {
  ToggleButton as DSRToggleButton,
  IconsEnum,
} from "@adsmurai/design-system-react";

export interface ToggleButtonProps {
  /** Value identifier */
  value: string;
  /** Button label text */
  label?: string;
  /** Icon to display (from IconsEnum) */
  icon?: keyof typeof IconsEnum;
  /** Whether this button is selected (provided by ToggleButtonGroup) */
  selected?: boolean;
  /** Change handler (provided by ToggleButtonGroup) */
  onChange?: (value: string) => void;
  /** Tooltip text */
  tooltip?: string;
  /** Tooltip position */
  tooltipPosition?: "top" | "right" | "bottom" | "left";
  /** data-qa attribute for testing */
  dataQa?: string;
}

/**
 * ToggleButton component - wrapper for DSR ToggleButton.
 */
export const ToggleButton: React.FC<ToggleButtonProps> = ({
  value,
  label,
  icon,
  selected,
  onChange,
  tooltip,
  tooltipPosition,
  dataQa,
}) => {
  return (
    <DSRToggleButton
      value={value}
      label={label}
      selected={selected}
      onChange={onChange}
      tooltip={tooltip}
      tooltipPosition={tooltipPosition}
      dataQa={dataQa}
    >
      {icon ? IconsEnum[icon] : undefined}
    </DSRToggleButton>
  );
};

ToggleButton.displayName = "ToggleButton";

export default ToggleButton;
