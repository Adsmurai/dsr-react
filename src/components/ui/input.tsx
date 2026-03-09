/**
 * @fileoverview Input component wrapper for DSR InputField
 *
 * @description
 * Wrapper that adapts DSR InputField to a standard React API.
 * Exposes all available properties from DSR InputField.
 *
 * @when_to_use
 * - Text fields in forms
 * - Email, password, number inputs
 * - Any single-line text input
 *
 * @when_not_to_use
 * - For search -> use InputSearch
 * - For multiline text -> use Textarea
 * - For selection -> use Select
 *
 * @example
 * ```tsx
 * // Basic
 * <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
 *
 * // With icons
 * <Input label="Email" leadingIcon="Email" type="email" />
 * <Input label="Search" trailingIcon="Search" onTrailingIconClick={() => search()} />
 *
 * // With prefix/suffix
 * <Input label="Price" prefixText="$" suffixText="USD" type="number" />
 * <Input label="URL" prefixText="https://" />
 *
 * // With character counter
 * <Input label="Bio" withCounter maxCounter={150} />
 *
 * // States
 * <Input label="Field" error helperText="This field is required" />
 * <Input label="Read only" readOnly value="Not editable" />
 * <Input label="Disabled" disabled />
 *
 * // Sizes
 * <Input label="Small" size="sm" />
 * <Input label="Medium" size="md" />
 * <Input label="Large" size="lg" />
 * ```
 */
import * as React from "react";
import { InputField, IconsEnum } from "@adsmurai/design-system-react";

import { cn } from "@/lib/utils";

/**
 * Valid input size values.
 *
 * @example
 * ```tsx
 * <Input size="sm" label="Small" />
 * <Input size="lg" label="Large" />
 * ```
 */
export const INPUT_SIZES = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const;

/** @internal Size mapping from local to DSR */
const sizeMap: Record<string, "small" | "medium" | "large"> = {
  sm: "small",
  md: "medium",
  lg: "large",
  small: "small",
  medium: "medium",
  large: "large",
};

export interface InputProps extends Omit<React.ComponentProps<"input">, "onChange" | "size"> {
  /** Field label (displayed above the input) */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message displayed when error is true (takes precedence over helperText) */
  errorMessage?: string;
  /** If has error - shows error state */
  error?: boolean;
  /** Change handler - receives the complete event */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Handler when Enter is pressed */
  onPressEnter?: () => void;
  /** Input size */
  size?: "sm" | "md" | "lg" | "small" | "medium" | "large";
  /** Icon at the start of the input (IconsEnum name) */
  leadingIcon?: keyof typeof IconsEnum;
  /** Icon at the end of the input (IconsEnum name) */
  trailingIcon?: keyof typeof IconsEnum;
  /** Click handler for leading icon */
  onLeadingIconClick?: () => void;
  /** Click handler for trailing icon */
  onTrailingIconClick?: () => void;
  /** Prefix text (e.g.: "$", "https://") */
  prefixText?: string;
  /** Suffix text (e.g.: "USD", ".com") */
  suffixText?: string;
  /** Show character counter */
  withCounter?: boolean;
  /** Maximum characters for the counter */
  maxCounter?: number;
  /** Read-only field */
  readOnly?: boolean;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Dark mode */
  dark?: boolean;
  /** Custom validation function - returns true if valid */
  validate?: (value: string | undefined) => boolean;
  /** Autocomplete suggestions */
  autocompleteOptions?: string[];
  /** Minimum value for number inputs */
  min?: string | number;
  /** Maximum value for number inputs */
  max?: string | number;
  /** Step for number inputs */
  step?: number;
  /** Text alignment */
  textAlign?: "left" | "right";
  /** data-qa attribute for testing */
  dataQa?: string;
}

/**
 * Input component that internally uses DSR InputField.
 * Maintains standard React API (value, onChange with event, placeholder)
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type = "text",
    label,
    placeholder,
    helperText,
    errorMessage,
    error,
    value,
    onChange,
    onBlur,
    onFocus,
    onPressEnter,
    disabled,
    size = "md",
    leadingIcon,
    trailingIcon,
    onLeadingIconClick,
    onTrailingIconClick,
    prefixText,
    suffixText,
    withCounter,
    maxCounter,
    readOnly,
    autoFocus,
    dark,
    validate,
    autocompleteOptions,
    min,
    max,
    step,
    textAlign,
    dataQa,
    name,
    ...props
  }, ref) => {
    // DSR InputField onChange receives ChangeEvent
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(e as React.ChangeEvent<HTMLInputElement>);
      }
    };

    // Adapt onBlur: react-hook-form passes event, DSR expects string
    const handleBlur = (val: string) => {
      if (onBlur) {
        // Create synthetic event for react-hook-form compatibility
        const syntheticEvent = {
          target: { value: val, name },
          type: 'blur',
        } as React.FocusEvent<HTMLInputElement>;
        onBlur(syntheticEvent);
      }
    };

    // Adapt onFocus: create synthetic event
    const handleFocus = (val: string) => {
      if (onFocus) {
        const syntheticEvent = {
          target: { value: val, name },
          type: 'focus',
        } as React.FocusEvent<HTMLInputElement>;
        onFocus(syntheticEvent);
      }
    };

    const dsrSize = sizeMap[size] || "medium";

    // errorMessage takes precedence over helperText when error is true
    const displayHelper = error && errorMessage ? errorMessage : helperText;

    return (
      <div className={cn("w-full", className)}>
        <InputField
          value={value as string || ""}
          onChange={handleChange}
          label={label || placeholder || ""}
          type={type as "text" | "password" | "number" | "date" | "time" | "url"}
          disabled={disabled}
          error={error}
          helper={displayHelper}
          size={dsrSize}
          leadingIcon={leadingIcon ? IconsEnum[leadingIcon] : undefined}
          trailingIcon={trailingIcon ? IconsEnum[trailingIcon] : undefined}
          leadingIconClick={onLeadingIconClick}
          trailingIconClick={onTrailingIconClick}
          prefixText={prefixText}
          suffixText={suffixText}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onPressEnter={onPressEnter}
          withCounter={withCounter}
          maxCounter={maxCounter}
          readOnly={readOnly}
          autoFocus={autoFocus}
          dark={dark}
          validate={validate}
          autocompleteOptions={autocompleteOptions}
          min={min !== undefined ? String(min) : undefined}
          max={max !== undefined ? String(max) : undefined}
          step={step}
          textAlign={textAlign}
          dataQa={dataQa}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
