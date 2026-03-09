/**
 * @fileoverview DateRangePicker wrapper for DSR DateRangePicker component
 *
 * @description
 * Wrapper that adapts DSR DateRangePicker for date range selection.
 * Supports shortcuts, multi-input layout, and various orientations.
 *
 * @example
 * // Basic range picker
 * <DateRangePicker
 *   value={[startDate, endDate]}
 *   onChange={setDateRange}
 *   label="Select range"
 * />
 *
 * @example
 * // With shortcuts
 * <DateRangePicker
 *   value={dateRange}
 *   onChange={setDateRange}
 *   showShortcuts
 *   label="Date range"
 * />
 *
 * @example
 * // Multi-input with vertical orientation
 * <DateRangePicker
 *   value={dateRange}
 *   onChange={setDateRange}
 *   isMultiInput
 *   orientation="vertical"
 *   label={['Start', 'End']}
 * />
 *
 * @example
 * // Legacy API (backwards compatible)
 * <DateRangePicker
 *   startDate={startDate}
 *   endDate={endDate}
 *   onStartDateChange={setStartDate}
 *   onEndDateChange={setEndDate}
 * />
 */
import * as React from 'react';
import { DateRangePicker as DSRDateRangePicker } from '@adsmurai/design-system-react';
import { cn } from '@/lib/utils';
import type { Locale } from 'date-fns';

/** Available shortcut types */
export const DATE_RANGE_SHORTCUTS = [
  'lastWeek',
  'lastSevenDays',
  'currentMonth',
  'lastMonth',
  'lastThirtyDays',
  'currentQuarter',
  'lastQuarter',
  'lastSixMonths',
  'currentYear',
  'yearToDate',
  'lastYear',
  'reset',
] as const;
export type DateRangeShortcut = typeof DATE_RANGE_SHORTCUTS[number];

/** Available orientations */
export const DATE_RANGE_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type DateRangeOrientation = typeof DATE_RANGE_ORIENTATIONS[number];

/** Available sizes */
export const DATE_RANGE_SIZES = ['small', 'medium', 'large'] as const;
export type DateRangeSize = typeof DATE_RANGE_SIZES[number];

type DateRange = [Date | null, Date | null];

interface DateRangePickerNewProps {
  /** Date range value [start, end] */
  value?: DateRange;
  /** Change handler for the range */
  onChange?: (range: DateRange) => void;

  /** Label(s) - string for single, tuple for multi-input */
  label?: string | [string, string];
  /** Helper text - string for single, tuple for multi-input */
  helper?: string | [string, string];
  /** Show error state */
  hasError?: boolean;
  /** Size variant */
  size?: DateRangeSize;

  /** Layout orientation */
  orientation?: DateRangeOrientation;
  /** Use two separate inputs */
  isMultiInput?: boolean;
  /** Number of calendar months to show */
  calendarsNumber?: 1 | 2;

  /** Show preset shortcuts panel */
  showShortcuts?: boolean;
  /** Specific shortcuts to display */
  shortcuts?: DateRangeShortcut[];

  /** Disabled state */
  disabled?: boolean;
  /** Open picker on input click */
  openOnInputClick?: boolean;

  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Disable past dates */
  disablePast?: boolean;
  /** Disable future dates */
  disableFuture?: boolean;

  /** Custom date format string */
  format?: string;
  /** Locale for date formatting */
  locale?: Locale;

  /** Optional className */
  className?: string;
}

// Legacy props for backwards compatibility
interface DateRangePickerLegacyProps {
  /** @deprecated Use value instead */
  startDate?: Date | null;
  /** @deprecated Use value instead */
  endDate?: Date | null;
  /** @deprecated Use onChange instead */
  onStartDateChange?: (date: Date | null) => void;
  /** @deprecated Use onChange instead */
  onEndDateChange?: (date: Date | null) => void;
  /** @deprecated Use label (tuple) instead */
  startLabel?: string;
  /** @deprecated Use label (tuple) instead */
  endLabel?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export type DateRangePickerProps = DateRangePickerNewProps | DateRangePickerLegacyProps;

// Type guard for legacy props
function isLegacyProps(props: DateRangePickerProps): props is DateRangePickerLegacyProps {
  return 'startDate' in props || 'endDate' in props || 'onStartDateChange' in props || 'onEndDateChange' in props;
}

/**
 * DateRangePicker component - DSR wrapper
 *
 * Provides date range selection with full DSR integration.
 * Supports both new unified API and legacy separate date props.
 */
export const DateRangePicker: React.FC<DateRangePickerProps> = (props) => {
  // Handle legacy API
  if (isLegacyProps(props)) {
    const {
      startDate,
      endDate,
      onStartDateChange,
      onEndDateChange,
      startLabel = 'Start date',
      endLabel = 'End date',
      disabled = false,
      minDate,
      maxDate,
      className,
    } = props;

    const value: DateRange = [startDate ?? null, endDate ?? null];

    const handleChange = (range: DateRange) => {
      if (range[0] !== startDate) {
        onStartDateChange?.(range[0]);
      }
      if (range[1] !== endDate) {
        onEndDateChange?.(range[1]);
      }
    };

    return (
      <DateRangePickerInner
        value={value}
        onChange={handleChange}
        label={[startLabel, endLabel]}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        isMultiInput
        className={className}
      />
    );
  }

  // New API
  return <DateRangePickerInner {...props} />;
};

// Internal component with normalized props
const DateRangePickerInner: React.FC<DateRangePickerNewProps> = ({
  value = [null, null],
  onChange,
  label,
  helper,
  hasError = false,
  size = 'medium',
  orientation = 'horizontal',
  isMultiInput = false,
  calendarsNumber = 2,
  showShortcuts = false,
  shortcuts,
  disabled = false,
  openOnInputClick = true,
  minDate,
  maxDate,
  disablePast = false,
  disableFuture = false,
  format,
  locale,
  className,
}) => {
  // Build DSR props
  const dsrProps: any = {
    value,
    onChange: (newValue: DateRange) => onChange?.(newValue),
    isDisabled: disabled,
    openOnInputClick,
    hasError,
    calendars: calendarsNumber,
  };

  // Label handling
  if (label) {
    if (Array.isArray(label)) {
      dsrProps.startLabel = label[0];
      dsrProps.endLabel = label[1];
    } else {
      dsrProps.label = label;
    }
  }

  // Helper handling
  if (helper) {
    if (Array.isArray(helper)) {
      dsrProps.startHelperText = helper[0];
      dsrProps.endHelperText = helper[1];
    } else {
      dsrProps.helperText = helper;
    }
  }

  // Size
  dsrProps.size = size;

  // Layout
  dsrProps.orientation = orientation;
  if (isMultiInput) {
    dsrProps.isMultiInput = true;
  }

  // Shortcuts
  if (showShortcuts) {
    dsrProps.showShortcuts = true;
    if (shortcuts && shortcuts.length > 0) {
      dsrProps.shortcuts = shortcuts;
    }
  }

  // Date restrictions
  if (minDate) dsrProps.minDate = minDate;
  if (maxDate) dsrProps.maxDate = maxDate;
  if (disablePast) dsrProps.disablePast = true;
  if (disableFuture) dsrProps.disableFuture = true;

  // Format and locale
  if (format) dsrProps.format = format;
  if (locale) dsrProps.locale = locale;

  return (
    <div className={cn('w-full', className)}>
      <DSRDateRangePicker {...dsrProps} />
    </div>
  );
};

DateRangePicker.displayName = 'DateRangePicker';

export default DateRangePicker;
