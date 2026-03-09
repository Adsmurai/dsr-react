/**
 * @fileoverview Badge component wrapper for DSR Badge
 *
 * @description
 * Wrapper that adapts DSR Badge to a standard React API.
 * DSR Badge uses BadgeColorEnum for colors and children must be string.
 *
 * @ai-note CRITICAL: Badge children must be plain text (string or number), NOT JSX.
 * Passing JSX elements will result in "[object Object]" being displayed.
 * For content with icons, use Chip component instead.
 *
 * ## When to use Badge vs Chip vs Tag
 *
 * | Question | Component |
 * |----------|-----------|
 * | Is it a number or status? | **Badge** |
 * | Does it describe the content? | **Tag** |
 * | Can the user change it? | **Chip** |
 *
 * @when_to_use
 * - Status indicators (active, pending, error)
 * - Numeric counters and notifications
 * - Short one-word labels
 *
 * @when_not_to_use
 * - For removable/interactive tags → use Chip
 * - For content classification → use Tag
 * - NEVER combine Icon + text → causes [object Object] error
 *
 * @example
 * ```tsx
 * // CORRECT - string/number children
 * <Badge>Default</Badge>
 * <Badge variant="success">Active</Badge>
 * <Badge variant="destructive">3</Badge>
 *
 * // WRONG - JSX children will break
 * <Badge><Icon />5</Badge>  // DON'T DO THIS
 *
 * // Sizes
 * <Badge size="xs">XS</Badge>
 * <Badge size="lg">NEW</Badge>
 *
 * // Numeric counter
 * <Badge variant="destructive">{count}</Badge>
 * <Badge variant="info">+99</Badge>
 * ```
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Badge as DSRBadge, BadgeColorEnum } from "@adsmurai/design-system-react";

import { cn } from "@/lib/utils";

const badgeVariants = cva("", {
  variants: {
    variant: {
      default: "",
      secondary: "",
      destructive: "",
      outline: "",
      success: "",
      warning: "",
      info: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Valid badge variant values.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="destructive">Error</Badge>
 * ```
 */
export const BADGE_VARIANTS = {
  /** Neutral/default badge */
  default: 'default',
  /** Secondary badge */
  secondary: 'secondary',
  /** Error/danger badge */
  destructive: 'destructive',
  /** Outlined badge */
  outline: 'outline',
  /** Success badge */
  success: 'success',
  /** Warning badge */
  warning: 'warning',
  /** Info badge */
  info: 'info',
} as const;

/**
 * Valid badge size values.
 *
 * @example
 * ```tsx
 * <Badge size="xs">3</Badge>
 * <Badge size="lg">NEW</Badge>
 * ```
 */
export const BADGE_SIZES = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const;

/** @internal Mapping of local variants to DSR BadgeColorEnum */
const variantMap: Record<string, BadgeColorEnum> = {
  default: BadgeColorEnum.Neutral,
  secondary: BadgeColorEnum.Neutral,
  destructive: BadgeColorEnum.Danger, // NOTA: BadgeColorEnum.Error NO existe
  outline: BadgeColorEnum.Neutral,
  success: BadgeColorEnum.Success,
  warning: BadgeColorEnum.Warning,
  info: BadgeColorEnum.Info,
};

/** @internal Mapping of local sizes to DSR */
const sizeMap: Record<string, "extra-small" | "small" | "medium" | "large"> = {
  xs: "extra-small",
  sm: "small",
  md: "medium",
  lg: "large",
  "extra-small": "extra-small",
  small: "small",
  medium: "medium",
  large: "large",
};

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof badgeVariants> {
  /**
   * Badge content - MUST be plain text (string) or number.
   * @ai-note DO NOT pass JSX elements - they will render as "[object Object]".
   * For badges with icons, use Chip component instead.
   */
  children: string | number;
  /** Badge size */
  size?: "xs" | "sm" | "md" | "lg" | "extra-small" | "small" | "medium" | "large";
  /** data-qa attribute for testing */
  dataQa?: string;
}

/**
 * Badge component that internally uses DSR Badge.
 * Maintains standard React API (children, variant, className)
 *
 * IMPORTANT: Do not pass complex JSX as children, only text.
 */
function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  dataQa,
  ...props
}: BadgeProps) {
  const dsrColor = variantMap[variant || "default"];
  const dsrSize = sizeMap[size] || "medium";

  const content = String(children);

  return (
    <div className={cn("inline-flex", className)} {...props}>
      <DSRBadge 
        color={dsrColor}
        size={dsrSize}
        dataQa={dataQa}
      >
        {content}
      </DSRBadge>
    </div>
  );
}

Badge.displayName = "Badge";

export { Badge, badgeVariants, BadgeColorEnum };
