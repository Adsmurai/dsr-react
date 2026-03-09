/**
 * @fileoverview Separator component wrapper for DSR Divider
 *
 * @description
 * Wrapper that adapts DSR Divider to a standard React API.
 * DSR Divider is a simple visual separator.
 *
 * @when_to_use
 * - Separating content sections
 * - Visual division between list elements
 * - Separators in menus
 *
 * @when_not_to_use
 * - For spacing -> use Tailwind margin/padding
 *
 * @example
 * ```tsx
 * <Separator />
 * <Separator orientation="vertical" className="h-6" />
 * ```
 */
import * as React from "react";
import { Divider } from "@adsmurai/design-system-react";

import { cn } from "@/lib/utils";

/**
 * Valid Separator orientation values.
 *
 * @example
 * ```tsx
 * <Separator orientation="horizontal" />
 * <Separator orientation="vertical" className="h-6" />
 * ```
 */
export const SEPARATOR_ORIENTATIONS = {
  /** Horizontal - full width line */
  horizontal: 'horizontal',
  /** Vertical - full height line */
  vertical: 'vertical',
} as const;

export interface SeparatorProps {
  /** Separator orientation */
  orientation?: "horizontal" | "vertical";
  /** Whether it is decorative (for accessibility) */
  decorative?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Separator component that internally uses DSR Divider.
 */
const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role={decorative ? "none" : "separator"}
        aria-orientation={orientation}
        className={cn(
          "shrink-0",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className
        )}
        {...props}
      >
        <Divider />
      </div>
    );
  },
);
Separator.displayName = "Separator";

export { Separator };
