/**
 * @fileoverview Textarea component wrapper for DSR InputField
 *
 * @description
 * Wrapper that adapts DSR InputField type="textArea" to a standard React API.
 * DSR InputField supports textArea as a special type.
 *
 * @when_to_use
 * - Multiline text inputs
 * - Description or comment fields
 * - Extended text areas
 *
 * @when_not_to_use
 * - For single-line inputs -> use Input
 * - For rich text -> use RichTextEditor
 *
 * @example
 * ```tsx
 * // Basic
 * <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write here..." />
 *
 * // With character counter
 * <Textarea label="Description" withCounter maxCounter={500} />
 *
 * // With error state
 * <Textarea label="Comment" error helper="This field is required" />
 * ```
 */
import * as React from "react";
import { InputField } from "@adsmurai/design-system-react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  /** Field label */
  label?: string;
  /**
   * Helper text displayed below the field
   * @deprecated Use `helperText` instead for consistency with Input component
   */
  helper?: string;
  /** Helper text displayed below the field (preferred over `helper`) */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Error message displayed when error is true (takes precedence over helperText) */
  errorMessage?: string;
  /** Callback when value changes */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Show character counter */
  withCounter?: boolean;
  /** Maximum characters for the counter */
  maxCounter?: number;
  /** data-qa attribute for testing */
  dataQa?: string;
  /** Number of visible text rows (controls height) */
  rows?: number;
  /** Minimum height of the textarea (e.g., 100, "100px", "6rem") */
  minHeight?: number | string;
}

/**
 * Textarea component that internally uses DSR InputField type="textArea".
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    value,
    onChange,
    placeholder,
    disabled,
    label,
    helper,
    helperText,
    error,
    errorMessage,
    withCounter,
    maxCounter,
    dataQa,
    rows,
    minHeight,
    ...props
  }, ref) => {
    // We adapt the DSR onChange to the React standard
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(e as React.ChangeEvent<HTMLTextAreaElement>);
      }
    };

    // Determine the helper text to display:
    // 1. errorMessage takes precedence when error is true
    // 2. helperText is the preferred prop
    // 3. helper is deprecated but still supported for backward compatibility
    const displayHelper = error && errorMessage ? errorMessage : (helperText ?? helper);

    // Calculate height style from rows or minHeight
    const heightStyle: React.CSSProperties = {};
    if (rows) {
      // Approximate line height: 1.5rem per row + padding
      heightStyle['--textarea-min-height' as string] = `${rows * 1.5 + 1}rem`;
    }
    if (minHeight) {
      heightStyle['--textarea-min-height' as string] = typeof minHeight === 'number' ? `${minHeight}px` : minHeight;
    }

    return (
      <div
        className={cn("w-full [&_textarea]:min-h-[var(--textarea-min-height)]", className)}
        style={heightStyle}
      >
        <InputField
          type="textArea"
          value={value as string}
          onChange={handleChange}
          label={label}
          helper={displayHelper}
          error={error}
          disabled={disabled}
          withCounter={withCounter}
          maxCounter={maxCounter}
          dataQa={dataQa}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
