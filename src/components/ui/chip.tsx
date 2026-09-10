/**
 * @fileoverview Chip, StatusTag, Rating wrappers for DSR components
 *
 * @description
 * Wrappers that adapt DSR components to more standard React APIs.
 *
 * ## When to use each one
 *
 * | Component | Interactive | Purpose | Example |
 * |-----------|-------------|---------|---------|
 * | **Chip** | Depends on `variant` | Filters, selection, classification | Active filters with x |
 * | **StatusTag** | No | Predefined state | "Active", "Error" |
 * | **Badge** | No | Counters/dot indicators | "3", "NEW" |
 *
 * @ai-note BREAKING (v2.0.0): DSR 15 removed `Tag`. Use `Chip` with
 * `variant="status"` for coloured classification, or `variant="colorful"`
 * for the decorative presets. See the migration table in CHANGELOG.md.
 *
 * @example
 * ```tsx
 * // Interactive filter with close button
 * <Chip variant="filter" label="React" selected onRemove={() => {}} />
 *
 * // Non-interactive classification (replaces the old Tag)
 * <Chip variant="status" status="success" label="Approved" />
 *
 * // StatusTag - predefined state, no custom text
 * <StatusTag status="active" />
 * ```
 */
import * as React from "react";
import {
  ChipV2 as DSRChip,
  StatusTag as DSRStatusTag,
  Rating as DSRRating,
  Icon,
  IconsEnum,
  type ChipV2SizeType,
  type ChipV2ColorfulPresetType,
} from "@adsmurai/design-system-react";
import { cn } from "@/lib/utils";

// ============= CONSTANTS =============

/**
 * Valid Chip variant values. Each variant unlocks a different set of props.
 *
 * - `assist` (default): non-selectable action chip
 * - `suggestion`: suggested action
 * - `input`: user-entered value, removable
 * - `filter`: selectable filter, removable
 * - `status`: non-interactive, coloured by semantic status
 * - `colorful`: non-interactive, coloured by decorative preset
 *
 * @example
 * ```tsx
 * <Chip variant="filter" label="Active" selected />
 * <Chip variant="status" status="error" label="Failed" />
 * ```
 */
export const CHIP_VARIANTS = [
  'assist',
  'status',
  'filter',
  'suggestion',
  'input',
  'colorful',
] as const;

/** Valid Chip size values. */
export const CHIP_SIZES = ['extra-small', 'small', 'medium', 'large'] as const;

/**
 * Valid Chip status values (`variant="status"` only).
 *
 * @example
 * ```tsx
 * <Chip variant="status" status="success" label="Approved" />
 * ```
 */
export const CHIP_STATUSES = ['default', 'success', 'info', 'warning', 'error'] as const;

/**
 * Valid Chip colorful presets (`variant="colorful"` only).
 *
 * @example
 * ```tsx
 * <Chip variant="colorful" color="blue-light" label="Marketing" />
 * ```
 */
export const CHIP_COLORFUL_PRESETS = [
  'default',
  'blue-light',
  'red-light',
  'emerald-light',
  'purple-light',
  'orange-light',
  'cyan-light',
  'yellow-light',
  'granate-light',
  'green-light',
] as const;

/** Type for Chip variant values */
export type ChipVariant = (typeof CHIP_VARIANTS)[number];

/** Type for Chip size values */
export type ChipSize = (typeof CHIP_SIZES)[number];

/** Type for Chip status values */
export type ChipStatus = (typeof CHIP_STATUSES)[number];

/** Type for Chip colorful preset values */
export type ChipColorfulPreset = (typeof CHIP_COLORFUL_PRESETS)[number];

/**
 * Valid StatusTag status values.
 *
 * @example
 * ```tsx
 * <StatusTag status="active" />
 * <StatusTag status="error" />
 * ```
 */
export const STATUS_TAG_STATUSES = {
  /** Active - green */
  active: 'active',
  /** Inactive - gray */
  inactive: 'inactive',
  /** Pending - yellow */
  pending: 'pending',
  /** Completed - green */
  completed: 'completed',
  /** Error - red */
  error: 'error',
  /** Success - green */
  success: 'success',
  /** Warning - yellow */
  warning: 'warning',
  /** Info - blue */
  info: 'info',
  /** Default - gray */
  default: 'default',
} as const;

/**
 * Valid Rating max values.
 */
export const RATING_MAX_VALUES = {
  1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10,
} as const;

// ============= CHIP (DSR ChipV2) =============
/**
 * @description Chip for filters, selection and classification.
 *
 * @ai-note IMPORTANT: Chip uses the `label` prop for text, NOT children.
 * This is different from most other components. Do not try to use children.
 *
 * @ai-note The available props depend on `variant`. Only `filter` and `input`
 * accept `onRemove`; only `filter` accepts `selected`; `status` and `colorful`
 * are NOT interactive (no `onClick`, no `disabled`).
 *
 * @example
 * ```tsx
 * // CORRECT - use label prop
 * <Chip label="Assist chip" />
 * <Chip variant="filter" label="Selected" selected onRemove={handleRemove} />
 * <Chip variant="input" label="you@example.com" onRemove={handleRemove} />
 * <Chip variant="status" status="success" label="Approved" />
 * <Chip variant="colorful" color="purple-light" label="UX" />
 * <Chip label="With icon" icon="Star" />
 *
 * // WRONG - Chip does not use children
 * <Chip>Tag name</Chip>  // DON'T DO THIS
 *
 * // WRONG - status chips are not interactive
 * <Chip variant="status" status="error" label="Failed" onClick={fn} />
 * ```
 */
interface ChipBaseProps {
  /** Chip text */
  label: string;
  /** Chip size */
  size?: ChipSize;
  /** Optional leading icon (IconsEnum name) */
  icon?: keyof typeof IconsEnum;
  /** Leading icon as React element (priority over `icon`) */
  leadingIcon?: React.ReactElement;
  /** data-qa attribute for testing */
  dataQa?: string;
  /** Additional CSS classes for the container */
  className?: string;
}

interface ChipInteractiveProps extends ChipBaseProps {
  /** Whether it is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/** Default variant - non-selectable action chip */
export interface AssistChipProps extends ChipInteractiveProps {
  variant?: 'assist';
}

/** Suggested action chip */
export interface SuggestionChipProps extends ChipInteractiveProps {
  variant: 'suggestion';
}

/** User-entered value, removable */
export interface InputChipProps extends ChipInteractiveProps {
  variant: 'input';
  /** Handler to close/remove - shows close icon */
  onRemove?: (event: React.MouseEvent | React.KeyboardEvent) => void;
}

/** Selectable filter, removable */
export interface FilterChipProps extends ChipInteractiveProps {
  variant: 'filter';
  /** Whether it is selected */
  selected?: boolean;
  /** Handler to close/remove - shows close icon */
  onRemove?: (event: React.MouseEvent | React.KeyboardEvent) => void;
}

/** Non-interactive, coloured by semantic status */
export interface StatusChipProps extends ChipBaseProps {
  variant: 'status';
  /** Semantic status */
  status?: ChipStatus;
}

/** Non-interactive, coloured by decorative preset */
export interface ColorfulChipProps extends ChipBaseProps {
  variant: 'colorful';
  /** Decorative colour preset */
  color?: ChipColorfulPreset;
}

export type ChipProps =
  | AssistChipProps
  | SuggestionChipProps
  | InputChipProps
  | FilterChipProps
  | StatusChipProps
  | ColorfulChipProps;

export const Chip: React.FC<ChipProps> = (props) => {
  const { label, size, icon, leadingIcon, dataQa, className } = props;

  // Icons: priority to React element prop, then string (IconsEnum)
  const finalLeadingIcon = (leadingIcon ??
    (icon ? <Icon>{IconsEnum[icon]}</Icon> : undefined)) as React.ReactElement | undefined;

  const shared = {
    label,
    size: size as ChipV2SizeType | undefined,
    leadingIcon: finalLeadingIcon,
    dataQa,
  };

  // Built per variant so the DSR discriminated union stays type-safe
  const chip = (() => {
    switch (props.variant) {
      case 'status':
        return <DSRChip {...shared} variant="status" status={props.status} />;
      case 'colorful':
        return (
          <DSRChip
            {...shared}
            variant="colorful"
            color={props.color as ChipV2ColorfulPresetType | undefined}
          />
        );
      case 'filter':
        return (
          <DSRChip
            {...shared}
            variant="filter"
            isSelected={props.selected}
            disabled={props.disabled}
            onClick={props.onClick}
            onClose={props.onRemove}
          />
        );
      case 'input':
        return (
          <DSRChip
            {...shared}
            variant="input"
            disabled={props.disabled}
            onClick={props.onClick}
            onClose={props.onRemove}
          />
        );
      case 'suggestion':
        return (
          <DSRChip
            {...shared}
            variant="suggestion"
            disabled={props.disabled}
            onClick={props.onClick}
          />
        );
      default:
        return (
          <DSRChip
            {...shared}
            variant="assist"
            disabled={props.disabled}
            onClick={props.onClick}
          />
        );
    }
  })();

  return <span className={cn("inline-flex", className)}>{chip}</span>;
};
Chip.displayName = "Chip";

// ============= STATUS TAG (DSR StatusTag) =============
/**
 * @description Status tag with predefined colors and texts.
 * DSR StatusTag does NOT accept children or custom text.
 * Only shows predefined text based on the status.
 *
 * @example
 * ```tsx
 * <StatusTag status="active" />
 * <StatusTag status="error" />
 * <StatusTag status="pending" />
 * ```
 */
export interface StatusTagProps {
  /** Status (determines color and text) */
  status?: "active" | "inactive" | "pending" | "completed" | "error" | "success" | "warning" | "info" | "default";
  /** data-qa attribute for testing */
  dataQa?: string;
  /** Additional CSS classes for the container */
  className?: string;
}

/** Mapping of local status to DSR status */
const statusMap: Record<string, "success" | "info" | "error" | "warning" | "default"> = {
  active: "success",
  inactive: "default",
  pending: "warning",
  completed: "success",
  error: "error",
  success: "success",
  warning: "warning",
  info: "info",
  default: "default",
};

export const StatusTag: React.FC<StatusTagProps> = ({ 
  status = "default", 
  dataQa,
  className 
}) => (
  <span className={cn("inline-flex", className)}>
    <DSRStatusTag 
      status={statusMap[status] || "default"} 
      dataQa={dataQa}
    />
  </span>
);
StatusTag.displayName = "StatusTag";

// ============= RATING (DSR Rating) =============
/**
 * @description Rating component with stars.
 * DSR Rating uses `initialValue` which does NOT update after mount.
 * This wrapper makes it controlled via key remount.
 *
 * @example
 * ```tsx
 * <Rating value={3} onChange={setRating} max={5} />
 * <Rating value={4.5} readOnly />
 * ```
 */
export interface RatingProps {
  /** Current value (controlled) */
  value?: number;
  /** Callback when value changes */
  onChange?: (value: number) => void;
  /** Whether it is read only */
  readOnly?: boolean;
  /** Maximum number of stars (1-10) */
  max?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  /** data-qa attribute for testing */
  dataQa?: string;
  /** Additional CSS classes */
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value = 0,
  onChange,
  readOnly = false,
  max = 5,
  dataQa,
  className,
}) => {
  // DSR Rating is not controlled, uses initialValue only on mount
  // We use key to force remount when value changes externally
  const [internalKey, setInternalKey] = React.useState(0);
  const lastValueRef = React.useRef(value);
  
  // Sync with external value (only if changes from outside)
  React.useEffect(() => {
    if (value !== lastValueRef.current) {
      lastValueRef.current = value;
      setInternalKey(k => k + 1);
    }
  }, [value]);

  const handleChange = (newValue: number) => {
    if (!readOnly) {
      lastValueRef.current = newValue;
      onChange?.(newValue);
    }
  };

  return (
    <span className={cn("inline-flex", className)}>
      <DSRRating
        key={internalKey}
        initialValue={value}
        onChange={handleChange}
        ratingCount={max}
        dataQa={dataQa}
      />
    </span>
  );
};
Rating.displayName = "Rating";

// Re-export enums for convenience
export { IconsEnum };
