/**
 * @fileoverview LinkText wrapper for DSR
 *
 * @description
 * Styled link component with variants and sizes.
 *
 * @when_to_use
 * - Inline links in text
 * - Styled navigation actions
 * - Links with icons
 *
 * @example
 * ```tsx
 * <LinkText label="See more" href="/details" />
 * <LinkText label="Delete" variant="error" onClick={handleDelete} />
 * ```
 */
import * as React from 'react';
import { LinkText as DSRLinkText } from '@adsmurai/design-system-react';

/**
 * Valid LinkText variant values.
 *
 * @example
 * ```tsx
 * <LinkText label="Link" variant="primary" href="/page" />
 * <LinkText label="Delete" variant="error" onClick={handleDelete} />
 * ```
 */
export const LINK_TEXT_VARIANTS = {
  /** Primary link (default) */
  primary: 'primary',
  /** Secondary/muted link */
  secondary: 'secondary',
  /** Error/destructive link */
  error: 'error',
} as const;

/**
 * Valid LinkText size values.
 *
 * @example
 * ```tsx
 * <LinkText label="Small link" size="small" href="/page" />
 * ```
 */
export const LINK_TEXT_SIZES = {
  /** Small size */
  small: 'small',
  /** Medium size (default) */
  medium: 'medium',
  /** Large size */
  large: 'large',
} as const;

export interface LinkTextProps {
  /** Text or content of the link */
  label: string | React.ReactElement;
  /** Destination URL */
  href?: string;
  /** Variant: 'primary' | 'secondary' | 'error' */
  variant?: 'primary' | 'secondary' | 'error';
  /** Whether disabled */
  disabled?: boolean;
  /** Open in new tab */
  openInNewTab?: boolean;
  /** Display inline */
  inline?: boolean;
  /** Click handler */
  onClick?: React.MouseEventHandler | (() => void);
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Leading icon */
  leadingIcon?: React.ReactElement;
  /** Trailing icon */
  trailingIcon?: React.ReactElement;
}

/**
 * LinkText component - DSR wrapper
 */
export const LinkText: React.FC<LinkTextProps> = ({
  label,
  href,
  variant = 'primary',
  disabled = false,
  openInNewTab = false,
  inline = true,
  onClick,
  size = 'medium',
  leadingIcon,
  trailingIcon,
}) => {
  return (
    <DSRLinkText
      label={label}
      href={href}
      variant={variant}
      isDisabled={disabled}
      targetBlank={openInNewTab}
      isDisplayInline={inline}
      handleOnClick={onClick}
      size={size}
      leadingIcon={leadingIcon}
      trailingIcon={trailingIcon}
    />
  );
};

LinkText.displayName = 'LinkText';

export default LinkText;
