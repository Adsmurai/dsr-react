/**
 * @fileoverview InputCurrency wrapper for DSR
 *
 * @description
 * Specialized input for monetary values with automatic formatting.
 *
 * @when_to_use
 * - Price fields
 * - Budget inputs
 * - Monetary values
 *
 * @example
 * ```tsx
 * <InputCurrency
 *   value={1234.56}
 *   onChange={(val) => console.log(val)}
 *   label="Price"
 *   prefix="€"
 * />
 * ```
 */
import * as React from 'react';
import { InputCurrency as DSRInputCurrency } from '@adsmurai/design-system-react';

/**
 * Available sizes for InputCurrency.
 * - `small`: Compact size
 * - `medium`: Default size
 * - `large`: Larger size
 */
export const INPUT_CURRENCY_SIZES = ['small', 'medium', 'large'] as const;

/** Type for input currency size values */
export type InputCurrencySize = (typeof INPUT_CURRENCY_SIZES)[number];

export interface InputCurrencyProps {
  /** Current value (string or number) */
  value: string | number;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Input label */
  label?: string;
  /** Helper text */
  helper?: string;
  /** Prefix (e.g.: €, $) */
  prefix?: string;
  /** If valid */
  isValid?: boolean;
  /** If disabled */
  disabled?: boolean;
  /** If read-only */
  readOnly?: boolean;
  /** Autofocus */
  autoFocus?: boolean;
  /** Callback on blur */
  onBlur?: (value: string) => void;
  /** Callback on focus */
  onFocus?: (value: string) => void;
  /** Size of the input */
  size?: InputCurrencySize;
}

/**
 * InputCurrency component - DSR wrapper
 */
export const InputCurrency: React.FC<InputCurrencyProps> = ({
  value,
  onChange,
  label,
  helper,
  prefix,
  isValid,
  disabled = false,
  readOnly = false,
  autoFocus = false,
  onBlur,
  onFocus,
  size = 'medium',
}) => {
  return (
    <DSRInputCurrency
      value={value}
      onChange={onChange}
      label={label}
      helper={helper}
      prefixText={prefix}
      isValid={isValid}
      disabled={disabled}
      readOnly={readOnly}
      autoFocus={autoFocus}
      onBlur={onBlur}
      onFocus={onFocus}
      size={size}
    />
  );
};

InputCurrency.displayName = 'InputCurrency';

export default InputCurrency;
