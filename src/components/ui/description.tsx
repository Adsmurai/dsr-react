/**
 * @fileoverview Description wrapper for DSR
 *
 * @description
 * Component to display descriptive text with label/descriptor.
 * Useful for label-value pairs.
 *
 * @when_to_use
 * - Display element details
 * - Key-value pairs
 * - Summary information
 *
 * @example
 * ```tsx
 * <Description descriptor="Email">user@example.com</Description>
 * <Description descriptor="Status" size="large">Active</Description>
 * ```
 */
import * as React from 'react';
import { Description as DSRDescription } from '@adsmurai/design-system-react';

/**
 * Available sizes for Description component.
 * - `small`: Compact size
 * - `medium`: Default size
 * - `large`: Larger size
 */
export const DESCRIPTION_SIZES = ['small', 'medium', 'large'] as const;

/** Type for description size values */
export type DescriptionSize = (typeof DESCRIPTION_SIZES)[number];

export interface DescriptionProps {
  /** Label/descriptor */
  descriptor?: string;
  /** Content/value */
  children?: React.ReactNode;
  /** Size of the description */
  size?: DescriptionSize;
}

/**
 * Description component - DSR wrapper
 */
export const Description: React.FC<DescriptionProps> = ({
  descriptor,
  children,
  size = 'medium',
}) => {
  return (
    <DSRDescription
      descriptor={descriptor}
      size={size}
    >
      {children}
    </DSRDescription>
  );
};

Description.displayName = 'Description';

export default Description;
