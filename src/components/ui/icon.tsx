/**
 * @fileoverview Icon component wrapper for DSR Icon
 *
 * @description
 * Wrapper that exposes DSR Icon with a consistent API.
 * DSR Icon uses children to receive the icon name from IconsEnum.
 *
 * @when_to_use
 * - Decorative icons in the UI
 * - Icons inside cards, lists, etc.
 * - Any Material Icons icon
 *
 * @when_not_to_use
 * - For icon-only buttons -> use IconButton
 * - For social network icons -> use SocialIcon
 *
 * @example
 * ```tsx
 * import { Icon } from 'adsmurai-dsr-react';
 * import { IconsEnum } from 'adsmurai-dsr-react/enums';
 *
 * // Basic
 * <Icon name="Add" />
 * <Icon name="Settings" />
 * <Icon name="Delete" />
 *
 * // Sizes
 * <Icon name="Star" size="small" />
 * <Icon name="Star" size="medium" />
 *
 * // Semantic colors
 * <Icon name="CheckCircle" color="Success" />
 * <Icon name="Warning" color="Warning" />
 * <Icon name="Error" color="Error" />
 * <Icon name="Info" color="Info" />
 *
 * // States
 * <Icon name="Sync" loading />
 * <Icon name="Star" secondary />
 *
 * // With badge
 * <Icon name="Notifications" badgeLabel="3" badgeColor="Danger" />
 *
 * // Base type (outlined vs filled)
 * <Icon name="Star" baseType="outlined" />
 * <Icon name="Star" baseType="filled" />
 * ```
 */
import * as React from "react";
import {
  Icon as DSRIcon,
  IconsEnum,
  IconBaseTypeEnum,
  BadgeColorEnum
} from "@adsmurai/design-system-react";

import { cn } from "@/lib/utils";

/**
 * Valid Icon size values.
 *
 * @example
 * ```tsx
 * <Icon name="Star" size="small" />
 * <Icon name="Star" size="medium" />
 * ```
 */
export const ICON_SIZES = {
  /** Small - 20px */
  small: 'small',
  /** Medium - 24px (default) */
  medium: 'medium',
} as const;

/**
 * Valid Icon color values (semantic).
 *
 * @example
 * ```tsx
 * <Icon name="CheckCircle" color="Success" />
 * <Icon name="Error" color="Error" />
 * ```
 */
export const ICON_COLORS = {
  /** Default color */
  Default: 'Default',
  /** Success - green */
  Success: 'Success',
  /** Warning - yellow/orange */
  Warning: 'Warning',
  /** Error - red */
  Error: 'Error',
  /** Info - blue */
  Info: 'Info',
  /** Color - uses CSS color */
  Color: 'Color',
} as const;

/**
 * Valid Icon base type values (style).
 *
 * @example
 * ```tsx
 * <Icon name="Star" baseType="outlined" />
 * <Icon name="Star" baseType="filled" />
 * ```
 */
export const ICON_BASE_TYPES = {
  /** Outlined style */
  outlined: 'outlined',
  /** Filled style */
  filled: 'filled',
  /** Rounded style */
  rounded: 'rounded',
  /** Sharp style */
  sharp: 'sharp',
  /** Two-tone style */
  'two-tone': 'two-tone',
} as const;

export interface IconProps {
  /**
   * Icon name. Accepts IconsEnum keys (with autocomplete) or any Material Icons string.
   * @example "Add", "Settings", "custom_icon"
   */
  name: keyof typeof IconsEnum | (string & {});
  /** Icon size */
  size?: "small" | "medium";
  /** Semantic icon color */
  color?: "Success" | "Warning" | "Error" | "Info" | "Default" | "Color";
  /** Secondary style (lighter) */
  secondary?: boolean;
  /** Base type of the icon (outlined/filled) */
  baseType?: "outlined" | "filled" | "rounded" | "sharp" | "two-tone";
  /** Whether it is loading (shows spinner) */
  loading?: boolean;
  /** Badge text (e.g.: "3", "+99") */
  badgeLabel?: string;
  /** Badge color */
  badgeColor?: "Danger" | "Neutral" | "Success" | "Info" | "Warning";
  /** data-qa attribute for testing */
  dataQa?: string;
  /** Additional CSS classes */
  className?: string;
}

/** Mapping of baseType string to enum */
const baseTypeMap: Record<string, IconBaseTypeEnum> = {
  outlined: IconBaseTypeEnum.Outlined,
  filled: IconBaseTypeEnum.Filled,
  rounded: IconBaseTypeEnum.Round,
  sharp: IconBaseTypeEnum.Sharp,
  "two-tone": IconBaseTypeEnum.TwoTone,
};

/** Mapping of badgeColor string to enum */
const badgeColorMap: Record<string, BadgeColorEnum> = {
  Danger: BadgeColorEnum.Danger,
  Neutral: BadgeColorEnum.Neutral,
  Success: BadgeColorEnum.Success,
  Info: BadgeColorEnum.Info,
  Warning: BadgeColorEnum.Warning,
};

/**
 * Icon component that internally uses DSR Icon.
 * Provides a more intuitive API with the `name` prop.
 */
const Icon: React.FC<IconProps> = ({
  name,
  size = "medium",
  color,
  secondary,
  baseType,
  loading,
  badgeLabel,
  badgeColor,
  dataQa,
  className
}) => {
  // Resolve icon name: use IconsEnum if available, otherwise use raw string
  const isKnownIcon = name in IconsEnum;
  const iconValue = isKnownIcon ? IconsEnum[name as keyof typeof IconsEnum] : name;

  // Development warning for unknown icons
  if (process.env.NODE_ENV === "development" && !isKnownIcon) {
    console.warn(
      `[Icon] Unknown icon name "${name}". ` +
      "If this is a valid Material Icons name, it will render. " +
      "For autocomplete support, import IconsEnum from 'adsmurai-dsr-react/enums'."
    );
  }

  return (
    <DSRIcon
      size={size}
      color={color}
      secondary={secondary}
      baseType={baseType ? baseTypeMap[baseType] : undefined}
      loading={loading}
      badgeLabel={badgeLabel}
      badgeColor={badgeColor ? badgeColorMap[badgeColor] : undefined}
      dataQa={dataQa}
      className={className}
    >
      {iconValue as typeof IconsEnum[keyof typeof IconsEnum]}
    </DSRIcon>
  );
};
Icon.displayName = "Icon";

export { Icon };
