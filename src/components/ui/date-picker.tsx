/**
 * @fileoverview DatePicker wrapper for DSR DatePicker component
 *
 * @description
 * Wrapper that adapts DSR DatePicker for date/time selection.
 * Supports date, time, dateTime, and yearMonth modes.
 *
 * @example
 * // Basic date picker
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   label="Select date"
 * />
 *
 * @example
 * // DateTime picker
 * <DatePicker
 *   value={dateTime}
 *   onChange={setDateTime}
 *   dateType="dateTime"
 *   is24Hours
 *   label="Select date and time"
 * />
 *
 * @example
 * // Time only
 * <DatePicker
 *   value={time}
 *   onChange={setTime}
 *   dateType="time"
 *   timeSteps={{ hours: 1, minutes: 15 }}
 * />
 *
 * @example
 * // Year/Month picker
 * <DatePicker
 *   value={yearMonth}
 *   onChange={setYearMonth}
 *   dateType="yearMonth"
 *   label="Select month"
 * />
 */
import * as React from 'react';
import { DatePicker as DSRDatePicker } from '@adsmurai/design-system-react';
import { cn } from '@/lib/utils';
import type { Locale } from 'date-fns';

/** Available date picker types */
export const DATE_PICKER_TYPES = ['date', 'time', 'dateTime', 'yearMonth'] as const;
export type DatePickerType = typeof DATE_PICKER_TYPES[number];

/** Available sizes */
export const DATE_PICKER_SIZES = ['small', 'medium', 'large'] as const;
export type DatePickerSize = typeof DATE_PICKER_SIZES[number];

/** Common date formats */
export const DATE_FORMATS = {
  date: 'yyyy/MM/dd',
  time: 'HH:mm',
  dateTime: 'yyyy/MM/dd HH:mm',
  yearMonth: 'MM/yyyy',
} as const;

export interface DatePickerProps {
  /** Current date value */
  value?: Date | null;
  /** Change handler */
  onChange?: (date: Date | null) => void;

  /** Type of date picker: date, time, dateTime, or yearMonth */
  dateType?: DatePickerType;

  /** Label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text below the input */
  helper?: string;
  /** Show error state */
  hasError?: boolean;
  /** Size variant */
  size?: DatePickerSize;

  /** Disabled state */
  disabled?: boolean;
  /** Show clear button */
  isClearable?: boolean;
  /** Open picker on input click */
  openOnInputClick?: boolean;

  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Disable future dates */
  areFutureDatesDisabled?: boolean;
  /** Disable past dates */
  arePastDatesDisabled?: boolean;

  /** Use 24-hour format (for time/dateTime) */
  is24Hours?: boolean;
  /** Time step intervals */
  timeSteps?: { hours?: number; minutes?: number };

  /** Custom date format string (date-fns format) */
  format?: string;
  /** Locale for date formatting */
  locale?: Locale;

  /** Optional className */
  className?: string;
}

/**
 * DatePicker component - DSR wrapper
 *
 * Provides date/time selection with full DSR integration.
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  dateType = 'date',
  label,
  placeholder,
  helper,
  hasError = false,
  size = 'medium',
  disabled = false,
  isClearable = true,
  openOnInputClick = true,
  minDate,
  maxDate,
  areFutureDatesDisabled = false,
  arePastDatesDisabled = false,
  is24Hours = false,
  timeSteps,
  format,
  locale,
  className,
}) => {
  // Map dateType to DSR enum value
  const getDateTypeValue = () => {
    switch (dateType) {
      case 'time':
        return 'time';
      case 'dateTime':
        return 'dateTime';
      case 'yearMonth':
        return 'yearMonth';
      default:
        return 'date';
    }
  };

  // Build DSR props
  const dsrProps: any = {
    value: value ?? null,
    onChange: (newValue: Date | null) => onChange?.(newValue),
    dateType: getDateTypeValue(),
    isDisabled: disabled,
    isClearable,
    openOnInputClick,
    hasError,
  };

  // Label and text props
  if (label) dsrProps.label = label;
  if (placeholder) dsrProps.placeholder = placeholder;
  if (helper) dsrProps.helperText = helper;

  // Size mapping
  const sizeMap: Record<DatePickerSize, string> = {
    small: 'small',
    medium: 'medium',
    large: 'large',
  };
  dsrProps.size = sizeMap[size];

  // Date restrictions
  if (minDate) dsrProps.minDate = minDate;
  if (maxDate) dsrProps.maxDate = maxDate;
  if (areFutureDatesDisabled) dsrProps.areFutureDatesDisabled = true;
  if (arePastDatesDisabled) dsrProps.arePastDatesDisabled = true;

  // Time options (for time and dateTime modes)
  if (dateType === 'time' || dateType === 'dateTime') {
    dsrProps.is24Hours = is24Hours;
    if (timeSteps) {
      dsrProps.timeSteps = timeSteps;
    }
  }

  // Format and locale
  if (format) dsrProps.format = format;
  if (locale) dsrProps.locale = locale;

  return (
    <div className={cn('w-full', className)}>
      <DSRDatePicker {...dsrProps} />
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
