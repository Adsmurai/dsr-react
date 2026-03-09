/**
 * @fileoverview Card component wrapper for DSR Card
 *
 * @description
 * Wrapper that adapts DSR Card to a standard React compositional API.
 * DSR Card uses `variant` prop for styling: "primary" | "secondary" | "tertiary".
 * This component provides sub-components (CardHeader, CardTitle, etc.) for
 * flexible content composition.
 *
 * ## Variant Reference
 * | Variant | Use Case |
 * |---------|----------|
 * | `primary` | Main content cards, elevated style |
 * | `secondary` | Secondary content, subtle background (default) |
 * | `tertiary` | Minimal style, border only |
 *
 * @when_to_use
 * - Container for related content sections
 * - Dashboard widgets and panels
 * - Form sections or grouped inputs
 * - List items with complex content
 *
 * @when_not_to_use
 * - For simple containers → use div with className
 * - For modals/dialogs → use Dialog
 * - For notifications → use Alert
 *
 * @example
 * ```tsx
 * // Basic card
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description text</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     Main content goes here
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 *
 * // Card variants
 * <Card variant="primary">Primary style</Card>
 * <Card variant="secondary">Secondary (default)</Card>
 * <Card variant="tertiary">Tertiary style</Card>
 *
 * // Simple card without header
 * <Card>
 *   <CardContent>Simple content</CardContent>
 * </Card>
 * ```
 */
import * as React from 'react';
import { Card as DSRCard } from '@adsmurai/design-system-react';
import { cn } from '@/lib/utils';
import { Typography } from './typography';

/**
 * Valid card variant values.
 *
 * @example
 * ```tsx
 * <Card variant="primary">Primary card</Card>
 * <Card variant="secondary">Secondary card</Card>
 * ```
 */
export const CARD_VARIANTS = {
  /** Primary card - main elevated style */
  primary: 'primary',
  /** Secondary card - subtle background */
  secondary: 'secondary',
  /** Tertiary card - minimal, border only */
  tertiary: 'tertiary',
} as const;

type CardVariant = keyof typeof CARD_VARIANTS;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card visual variant */
  variant?: CardVariant;
  /** Card content */
  children: React.ReactNode;
  /** data-qa attribute for testing */
  dataQa?: string;
}

/**
 * Card component - wrapper for DSR Card
 *
 * Provides a container with consistent styling for grouping related content.
 * Uses Typography component internally for CardTitle and CardDescription.
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'secondary', children, dataQa, ...props }, ref) => {
    return (
      <div ref={ref} className={className} data-qa={dataQa} {...props}>
        <DSRCard variant={variant}>
          {children}
        </DSRCard>
      </div>
    );
  }
);
Card.displayName = 'Card';

// ============= CardHeader =============

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** data-qa attribute for testing */
  dataQa?: string;
}

/**
 * CardHeader - container for card header content (title, description)
 */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, dataQa, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      data-qa={dataQa}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

// ============= CardTitle =============

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** data-qa attribute for testing */
  dataQa?: string;
}

/**
 * CardTitle - main title within a card
 * Uses Typography h5 for proper hierarchy (cards are nested in pages)
 */
const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, children, dataQa, ...props }, ref) => (
    <div ref={ref} className={className} data-qa={dataQa} {...props}>
      <Typography variant="h5" weight="semibold">
        {children}
      </Typography>
    </div>
  )
);
CardTitle.displayName = 'CardTitle';

// ============= CardDescription =============

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** data-qa attribute for testing */
  dataQa?: string;
}

/**
 * CardDescription - subtitle/description within a card
 * Uses Typography for consistent styling
 */
const CardDescription = React.forwardRef<HTMLDivElement, CardDescriptionProps>(
  ({ className, children, dataQa, ...props }, ref) => (
    <div ref={ref} className={className} data-qa={dataQa} {...props}>
      <Typography variant="body2" intensity="medium">
        {children}
      </Typography>
    </div>
  )
);
CardDescription.displayName = 'CardDescription';

// ============= CardContent =============

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** data-qa attribute for testing */
  dataQa?: string;
}

/**
 * CardContent - main content area of a card
 */
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, dataQa, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pt-0', className)}
      data-qa={dataQa}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

// ============= CardFooter =============

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** data-qa attribute for testing */
  dataQa?: string;
}

/**
 * CardFooter - footer area for actions
 */
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, dataQa, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      data-qa={dataQa}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
