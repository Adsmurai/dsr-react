/**
 * @fileoverview MultiTextField wrapper for DSR MultiTextField
 *
 * @description
 * Wrapper that adapts DSR MultiTextField for entering multiple values as chips/tags.
 * Users can type a value and press Enter to add it to the list.
 * Each value is displayed as a removable chip.
 *
 * ## Features
 * - Add values by pressing Enter
 * - Remove values by clicking the X on each chip
 * - Optional regex validation for new entries
 * - Clear all values with clear icon
 *
 * @when_to_use
 * - Multiple email addresses input
 * - Tags or labels selection
 * - Keywords input
 * - Any field requiring multiple string values
 *
 * @when_not_to_use
 * - For single value input → use Input
 * - For predefined options → use Select with isMulti
 * - For rich tag management → use custom Chip components
 *
 * @example
 * ```tsx
 * // Basic usage
 * <MultiTextField
 *   value={tags}
 *   onChange={setTags}
 *   label="Tags"
 * />
 *
 * // With email validation
 * <MultiTextField
 *   value={emails}
 *   onChange={setEmails}
 *   label="Email addresses"
 *   pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
 *   error={hasError}
 *   errorMessage="Please enter valid email addresses"
 * />
 *
 * // With helper text
 * <MultiTextField
 *   value={keywords}
 *   onChange={setKeywords}
 *   label="Keywords"
 *   helper="Press Enter to add each keyword"
 * />
 *
 * // Different sizes
 * <MultiTextField value={tags} onChange={setTags} size="small" />
 * <MultiTextField value={tags} onChange={setTags} size="medium" />
 * <MultiTextField value={tags} onChange={setTags} size="large" />
 *
 * // Without clear icon
 * <MultiTextField
 *   value={tags}
 *   onChange={setTags}
 *   showClearIcon={false}
 * />
 * ```
 */
import * as React from 'react';
import { MultiTextField as DSRMultiTextField, IconsEnum } from '@adsmurai/design-system-react';
import { cn } from '@/lib/utils';

/**
 * Valid MultiTextField size values.
 */
export const MULTI_TEXT_FIELD_SIZES = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export interface MultiTextFieldProps {
  /** Array of current values (displayed as chips) */
  value?: string[];
  /** Callback when values change (add/remove) */
  onChange?: (value: string[]) => void;
  /** Input label */
  label?: string;
  /** Helper text below the input */
  helper?: string;
  /** Error message (displayed when error is true) */
  errorMessage?: string;
  /** Whether the field has an error */
  error?: boolean;
  /** Input size */
  size?: 'small' | 'medium' | 'large';
  /** Regex pattern to validate new entries (e.g., email pattern) */
  pattern?: string;
  /** Leading icon (IconsEnum value) */
  icon?: IconsEnum;
  /** Show clear all icon */
  showClearIcon?: boolean;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Callback on blur */
  onBlur?: () => void;
  /** Callback on input (before Enter is pressed) */
  onInput?: (value: string[]) => void;
  /** data-qa attribute for testing */
  dataQa?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * MultiTextField component - wrapper for DSR MultiTextField
 *
 * Allows entering multiple string values displayed as removable chips.
 * Values are added by pressing Enter after typing.
 */
export const MultiTextField: React.FC<MultiTextFieldProps> = ({
  value = [],
  onChange,
  label,
  helper,
  errorMessage,
  error = false,
  size = 'medium',
  pattern,
  icon,
  showClearIcon = true,
  autoFocus = false,
  onBlur,
  onInput,
  dataQa,
  className,
}) => {
  // Development validation
  if (process.env.NODE_ENV === 'development') {
    if (pattern) {
      try {
        new RegExp(pattern);
      } catch {
        console.warn(
          `[MultiTextField] Invalid regex pattern: "${pattern}". ` +
          'Ensure the pattern is a valid regular expression.'
        );
      }
    }
  }

  return (
    <div className={cn('w-full', className)}>
      <DSRMultiTextField
        value={value}
        onChange={onChange}
        onInput={onInput}
        label={label}
        helper={helper}
        errorMsg={errorMessage}
        error={error}
        selectSize={size}
        regexp={pattern}
        icon={icon}
        withClearIcon={showClearIcon}
        autoFocus={autoFocus}
        onBlur={onBlur}
        dataQa={dataQa}
      />
    </div>
  );
};

MultiTextField.displayName = 'MultiTextField';

export default MultiTextField;
