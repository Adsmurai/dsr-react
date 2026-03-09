/**
 * @fileoverview TipItem wrapper for DSR TipItem component
 *
 * @description
 * Wrapper that adapts DSR TipItem to display tips, hints or advice.
 * Ideal for user guides, onboarding, extended tooltips.
 *
 * @example
 * // Basic tip
 * <TipItem>This is a useful tip for the user.</TipItem>
 *
 * @example
 * // With title and close
 * <TipItem
 *   title="Pro Tip"
 *   onClose={() => setShowTip(false)}
 * >
 *   You can use keyboard shortcuts to be more productive.
 * </TipItem>
 */
import * as React from "react";
import { TipItem as DSRTipItem } from "@adsmurai/design-system-react";
import { cn } from "@/lib/utils";

/**
 * Available text intensities for TipItem content.
 * - `full`: Full opacity
 * - `high`: High contrast
 * - `medium`: Medium contrast
 * - `low`: Low contrast
 */
export const TIP_ITEM_INTENSITIES = ['full', 'high', 'medium', 'low'] as const;

/** Type for tip item intensity values */
export type TipItemIntensity = (typeof TIP_ITEM_INTENSITIES)[number];

export interface TipItemProps {
  /** Tip content */
  children: string | React.ReactElement;
  /** Optional tip title */
  title?: string | React.ReactElement;
  /** Content text intensity */
  intensity?: TipItemIntensity;
  /** Callback when the tip is closed */
  onClose?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export function TipItem({
  children,
  title,
  intensity,
  onClose,
  className,
}: TipItemProps): React.ReactElement {
  return (
    <div className={cn("w-full", className)}>
      <DSRTipItem
        title={title}
        contentIntensity={intensity}
        handleOnClose={onClose}
      >
        {children}
      </DSRTipItem>
    </div>
  );
}

TipItem.displayName = "TipItem";
