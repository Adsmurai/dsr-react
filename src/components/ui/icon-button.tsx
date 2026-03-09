/**
 * @fileoverview IconButton component wrapper for DSR IconButtonV2
 *
 * @description
 * Wrapper that exposes DSR IconButtonV2 with a more intuitive API using `icon` prop.
 * DSR IconButtonV2 uses children to receive the icon.
 *
 * @when_to_use
 * - Icon-only buttons (no text)
 * - Quick actions in toolbars
 * - Close, menu buttons, etc.
 *
 * @when_not_to_use
 * - For decorative icons → use Icon
 * - For buttons with text and icon → use Button with startIcon/endIcon
 *
 * @example
 * ```tsx
 * import { IconButton } from '@/components/ui/icon-button';
 *
 * // Basic variants
 * <IconButton icon="Settings" onClick={handleClick} />
 * <IconButton icon="Close" variant="filled" tooltip="Close" />
 * <IconButton icon="Add" variant="outlined" size="small" />
 * <IconButton icon="Delete" variant="error" tooltip="Delete" />
 * <IconButton icon="Edit" variant="tonal" />
 *
 * // Shapes and sizes
 * <IconButton icon="Add" size="extra-small" />
 * <IconButton icon="Menu" size="large" isSquare />
 *
 * // States
 * <IconButton icon="Save" isLoading />
 * <IconButton icon="Lock" disabled />
 *
 * // With badge
 * <IconButton icon="Notifications" badgeLabel="5" badgeColor="Danger" />
 *
 * // Accessibility
 * <IconButton icon="Menu" ariaLabel="Open navigation menu" />
 *
 * // Testing
 * <IconButton icon="Search" dataQa="search-button" />
 * ```
 */
import * as React from "react";
import {
  IconButtonV2,
  IconsEnum,
  ButtonVariantEnum,
  BadgeColorEnum,
} from "@adsmurai/design-system-react";

/**
 * Valid IconButton variant values.
 *
 * @example
 * ```tsx
 * <IconButton icon="Settings" variant="standard" />
 * <IconButton icon="Close" variant="filled" />
 * <IconButton icon="Delete" variant="error" />
 * ```
 */
export const ICON_BUTTON_VARIANTS = {
  /** Default variant - minimal style */
  standard: 'standard',
  /** Filled background - primary emphasis */
  filled: 'filled',
  /** Outlined border - secondary emphasis */
  outlined: 'outlined',
  /** Tonal - subtle background */
  tonal: 'tonal',
  /** Error/destructive - for delete actions */
  error: 'error',
} as const;

/**
 * Valid IconButton size values.
 *
 * @example
 * ```tsx
 * <IconButton icon="Add" size="extra-small" />
 * <IconButton icon="Menu" size="large" />
 * ```
 */
export const ICON_BUTTON_SIZES = {
  /** Extra small - 24px */
  'extra-small': 'extra-small',
  /** Small - 32px (default) */
  small: 'small',
  /** Medium - 40px */
  medium: 'medium',
  /** Large - 48px */
  large: 'large',
} as const;

export type IconButtonVariant = keyof typeof ICON_BUTTON_VARIANTS;
export type IconButtonSize = keyof typeof ICON_BUTTON_SIZES;

export interface IconButtonProps {
  /** Material Design icon name (IconsEnum key) */
  icon: keyof typeof IconsEnum;
  /** Button visual variant */
  variant?: IconButtonVariant;
  /** Button size */
  size?: IconButtonSize;
  /** Whether it is disabled */
  disabled?: boolean;
  /** Whether it has square shape (default is true) */
  isSquare?: boolean;
  /** Whether it is in loading state */
  isLoading?: boolean;
  /** Tooltip text on hover */
  tooltip?: string;
  /** Tooltip position relative to the button */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Badge label */
  badgeLabel?: string;
  /** Badge color */
  badgeColor?: keyof typeof BadgeColorEnum;
  /** aria-label attribute for accessibility */
  ariaLabel?: string;
  /** data-qa attribute for testing */
  dataQa?: string;
}

const variantMap: Record<IconButtonVariant, ButtonVariantEnum> = {
  standard: ButtonVariantEnum.Standard,
  filled: ButtonVariantEnum.Filled,
  outlined: ButtonVariantEnum.Outlined,
  tonal: ButtonVariantEnum.Tonal,
  error: ButtonVariantEnum.Error,
};

/**
 * IconButton component that internally uses DSR IconButtonV2.
 * Provides a more intuitive API with `icon` prop.
 */
// TooltipPosition is a type alias, not an enum - use string literals
type TooltipPosition = "top" | "bottom" | "left" | "right";

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = "standard",
  size = "small",
  disabled = false,
  isSquare = true,
  isLoading = false,
  tooltip,
  tooltipPosition,
  onClick,
  badgeLabel,
  badgeColor,
  ariaLabel,
  dataQa,
}) => {
  return (
    <IconButtonV2
      variant={variantMap[variant]}
      size={size}
      disabled={disabled}
      isSquare={isSquare}
      isLoading={isLoading}
      tooltip={tooltip}
      tooltipPosition={tooltipPosition}
      onClick={onClick}
      badgeLabel={badgeLabel}
      badgeColor={badgeColor ? BadgeColorEnum[badgeColor] : undefined}
      aria-label={ariaLabel}
      dataQa={dataQa}
    >
      {IconsEnum[icon]}
    </IconButtonV2>
  );
};

IconButton.displayName = "IconButton";

// Re-export enums for convenience
export { IconsEnum, BadgeColorEnum, ButtonVariantEnum };
