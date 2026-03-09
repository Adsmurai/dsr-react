/**
 * @fileoverview Skeleton component wrapper for DSR Skeleton
 *
 * @description
 * Wrapper that adapts DSR Skeleton to a standard React API.
 * DSR Skeleton provides loading states with animation.
 *
 * @when_to_use
 * - Loading states while fetching data
 * - Placeholders for content that is loading
 * - Improve UX during fetching
 *
 * @when_not_to_use
 * - For action spinners -> use Button with isLoading
 * - For determinate progress -> use Progress
 *
 * @example
 * ```tsx
 * // Text
 * <Skeleton variant="text" width={250} height={16} />
 *
 * // Circular avatar
 * <Skeleton variant="circular" width={48} height={48} />
 *
 * // Rectangular card
 * <Skeleton variant="rectangular" width="100%" height={120} />
 *
 * // Rounded (default)
 * <Skeleton variant="rounded" width={200} height={40} />
 *
 * // Full table
 * <Skeleton variant="table" numberOfHeaders={5} numberOfRows={10} />
 *
 * // Card grid
 * <Skeleton variant="grid" />
 *
 * // Grid with fixed columns and items
 * <Skeleton variant="grid" columnCount={3} numberOfItems={6} />
 *
 * // With controlled animation
 * <Skeleton variant="rounded" animation="pulse" />
 * <Skeleton variant="rounded" animation="wave" />
 * <Skeleton variant="rounded" animation={false} />
 * ```
 */
import * as React from "react";
import { Skeleton as DSRSkeleton } from "@adsmurai/design-system-react";

import { cn } from "@/lib/utils";

/**
 * Valid Skeleton variant values.
 *
 * @example
 * ```tsx
 * <Skeleton variant="text" width={250} />
 * <Skeleton variant="circular" width={48} height={48} />
 * <Skeleton variant="rectangular" width="100%" height={120} />
 * ```
 */
export const SKELETON_VARIANTS = {
  /** Text - for text lines */
  text: 'text',
  /** Circular - for avatars */
  circular: 'circular',
  /** Rectangular - for images/cards */
  rectangular: 'rectangular',
  /** Rounded - with rounded corners (default) */
  rounded: 'rounded',
  /** Table - full table skeleton */
  table: 'table',
  /** Grid - card grid skeleton */
  grid: 'grid',
} as const;

/**
 * Valid Skeleton animation values.
 *
 * @example
 * ```tsx
 * <Skeleton variant="rounded" animation="pulse" />
 * <Skeleton variant="rounded" animation="wave" />
 * <Skeleton variant="rounded" animation={false} />
 * ```
 */
export const SKELETON_ANIMATIONS = {
  /** Pulse animation - default */
  pulse: 'pulse',
  /** Wave animation */
  wave: 'wave',
  /** No animation */
  false: false,
} as const;

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Skeleton variant */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded' | 'table' | 'grid';
  /** Skeleton width (px or string like "100%") */
  width?: number | string;
  /** Skeleton height (px or string) */
  height?: number | string;
  /** Number of headers (for variant='table') */
  numberOfHeaders?: number;
  /** Number of rows (for variant='table') */
  numberOfRows?: number;
  /** Number of columns (for variant='grid') - fixed column layout */
  columnCount?: number;
  /** Number of skeleton items to display (for variant='grid') */
  numberOfItems?: number;
  /** data-qa attribute for testing */
  dataQa?: string;
}

/**
 * Skeleton component that internally uses DSR Skeleton.
 */
function Skeleton({
  className,
  variant = 'rounded',
  width,
  height,
  numberOfHeaders = 5,
  numberOfRows = 5,
  columnCount,
  numberOfItems,
  dataQa,
  ...props
}: SkeletonProps) {
  // For table/grid variants we use DSR directly
  if (variant === 'table') {
    return (
      <div className={cn("w-full", className)} {...props}>
        <DSRSkeleton 
          variant="table"
          numberOfHeaders={numberOfHeaders}
          numberOfRows={numberOfRows}
        />
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className={cn("w-full", className)} {...props}>
        <DSRSkeleton
          variant="grid"
          columnCount={columnCount}
          numberOfItems={numberOfItems}
        />
      </div>
    );
  }

  // For other variants
  return (
    <div className={cn("w-full", className)} {...props}>
      <DSRSkeleton 
        variant={variant}
        width={width}
        height={height}
      />
    </div>
  );
}

export { Skeleton };
