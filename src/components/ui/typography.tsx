/**
 * @fileoverview Typography wrapper for DSR Typography
 *
 * @description
 * Wrapper that adapts DSR Typography providing consistent text styles.
 * DSR Typography does NOT accept className, so this wrapper wraps it in a div.
 *
 * ## DSR Typographic Scale (Official)
 *
 * | Variant   | HTML Tag | Size (px) | Typical use |
 * |-----------|----------|-----------|-------------|
 * | h1        | h1       | 24px      | Main page title |
 * | h2        | h2       | 20px      | Main sections |
 * | h3        | h3       | 18px      | Sub-sections |
 * | h4        | h4       | 16px      | Internal blocks |
 * | h5        | h5       | 14px      | Small titles |
 * | h6        | h6       | 12px      | Labels or captions |
 * | subtitle1 | p        | 16px      | Highlighted subtitles |
 * | subtitle2 | p        | 14px      | Secondary subtitles |
 * | body1     | p        | 16px      | Main text |
 * | body2     | p        | 14px      | Secondary text |
 * | caption   | span     | 12px      | Auxiliary text |
 * | overline  | span     | 10px      | Upper labels |
 * | button    | span     | 14px      | Button text |
 *
 * @when_to_use
 * - For any text that needs to follow the design system
 * - ALWAYS use Typography, never raw HTML tags with Tailwind classes
 *
 * @example
 * ```tsx
 * // Headings
 * <Typography variant="h1">Main title</Typography>
 * <Typography variant="h4" weight="bold">Page title</Typography>
 *
 * // Body text
 * <Typography variant="body1">Main text</Typography>
 * <Typography variant="body2" intensity="medium">Secondary text</Typography>
 *
 * // With additional styles
 * <Typography variant="body1" weight="semibold" color="success">Success</Typography>
 * <Typography variant="caption" intensity="low">Metadata</Typography>
 *
 * // Truncated
 * <Typography variant="body1" noWrap>Long text that will be truncated...</Typography>
 *
 * // Different tag
 * <Typography variant="body1" tag="label">Form label</Typography>
 * ```
 */
import * as React from 'react';
import { Typography as DSRTypography, TypographyColorEnum } from '@adsmurai/design-system-react';

/**
 * Valid Typography variant values.
 *
 * @example
 * ```tsx
 * <Typography variant="h1">Main Title</Typography>
 * <Typography variant="body1">Paragraph text</Typography>
 * <Typography variant="caption">Small text</Typography>
 * ```
 */
export const TYPOGRAPHY_VARIANTS = {
  /** H1 - 24px, main page title */
  h1: 'h1',
  /** H2 - 20px, main sections */
  h2: 'h2',
  /** H3 - 18px, sub-sections */
  h3: 'h3',
  /** H4 - 16px, internal blocks */
  h4: 'h4',
  /** H5 - 14px, small titles */
  h5: 'h5',
  /** H6 - 12px, labels or captions */
  h6: 'h6',
  /** Body1 - 16px, main text */
  body1: 'body1',
  /** Body2 - 14px, secondary text */
  body2: 'body2',
  /** Subtitle1 - 16px, highlighted subtitles */
  subtitle1: 'subtitle1',
  /** Subtitle2 - 14px, secondary subtitles */
  subtitle2: 'subtitle2',
  /** Caption - 12px, auxiliary text */
  caption: 'caption',
  /** Overline - 10px, upper labels */
  overline: 'overline',
  /** Button - 14px, button text */
  button: 'button',
} as const;

/**
 * Valid Typography weight values.
 *
 * @example
 * ```tsx
 * <Typography weight="bold">Bold text</Typography>
 * <Typography weight="light">Light text</Typography>
 * ```
 */
export const TYPOGRAPHY_WEIGHTS = {
  /** Light - 300 */
  light: 'light',
  /** Regular - 400 (default) */
  regular: 'regular',
  /** Semibold - 600 */
  semibold: 'semibold',
  /** Bold - 700 */
  bold: 'bold',
} as const;

/**
 * Valid Typography intensity values (opacity).
 *
 * @example
 * ```tsx
 * <Typography intensity="medium">Muted text</Typography>
 * <Typography intensity="low">Very subtle text</Typography>
 * ```
 */
export const TYPOGRAPHY_INTENSITIES = {
  /** Full - 100% opacity */
  full: 'full',
  /** High - ~87% opacity (default) */
  high: 'high',
  /** Medium - ~60% opacity */
  medium: 'medium',
  /** Low - ~38% opacity */
  low: 'low',
} as const;

/**
 * Valid Typography color values.
 *
 * @example
 * ```tsx
 * <Typography color="success">Success message</Typography>
 * <Typography color="error">Error message</Typography>
 * ```
 */
export const TYPOGRAPHY_COLORS = {
  /** Default text color */
  default: 'default',
  /** Error/destructive color */
  error: 'error',
  /** Warning color */
  warning: 'warning',
  /** Success color */
  success: 'success',
  /** Info color */
  info: 'info',
} as const;

export type TypographyVariant = keyof typeof TYPOGRAPHY_VARIANTS;
export type TypographyWeight = keyof typeof TYPOGRAPHY_WEIGHTS;

/** Mapping of semantic weights to DSR values */
const weightMap: Record<TypographyWeight, '300' | '400' | '600' | '700'> = {
  light: '300',
  regular: '400',
  semibold: '600',
  bold: '700',
};

export type TypographyIntensity = keyof typeof TYPOGRAPHY_INTENSITIES;

/**
 * Valid Typography text alignment values.
 */
export const TYPOGRAPHY_ALIGNMENTS = {
  left: 'left',
  center: 'center',
  right: 'right',
  justify: 'justify',
  initial: 'initial',
  inherit: 'inherit',
} as const;

export type TypographyTextAlignment = keyof typeof TYPOGRAPHY_ALIGNMENTS;

export type TypographyColor = keyof typeof TYPOGRAPHY_COLORS;

/** Mapping of string colors to DSR enum */
const colorMap: Record<TypographyColor, TypographyColorEnum> = {
  default: TypographyColorEnum.Default,
  error: TypographyColorEnum.Error,
  warning: TypographyColorEnum.Warning,
  success: TypographyColorEnum.Success,
  info: TypographyColorEnum.Info,
};

/**
 * Available HTML tags
 */
export type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';

export interface TypographyProps {
  /** Text content */
  children: React.ReactNode;

  /**
   * Typographic variant - determines size
   * @default 'body1'
   */
  variant?: TypographyVariant;

  /**
   * Font weight
   * - light: 300
   * - regular: 400
   * - semibold: 600
   * - bold: 700
   */
  weight?: TypographyWeight;

  /**
   * Color intensity (affects opacity)
   * - full: 100%
   * - high: ~87%
   * - medium: ~60%
   * - low: ~38%
   * @default 'high'
   */
  intensity?: TypographyIntensity;

  /**
   * Text alignment
   * @default 'left'
   */
  textAlignment?: TypographyTextAlignment;

  /**
   * Semantic color
   */
  color?: TypographyColor;

  /**
   * HTML tag (override of the variant default)
   */
  tag?: TypographyTag;

  /**
   * className for the wrapper div
   */
  className?: string;
}

/**
 * Typography component - wrapper for DSR Typography
 */
export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body1',
  weight,
  intensity,
  textAlignment,
  color,
  tag,
  className,
}) => {
  const typographyElement = (
    <DSRTypography 
      variant={variant}
      weight={weight ? weightMap[weight] : undefined}
      intensity={intensity}
      textAlignment={textAlignment}
      color={color ? colorMap[color] : undefined}
      tag={tag}
    >
      {children}
    </DSRTypography>
  );

  if (className) {
    return (
      <div className={className}>
        {typographyElement}
      </div>
    );
  }
  
  return typographyElement;
};

Typography.displayName = 'Typography';

export default Typography;
