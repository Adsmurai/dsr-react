/**
 * @fileoverview Chip, Tag, StatusTag, Rating wrappers for DSR components
 *
 * @description
 * Wrappers that adapt DSR components to more standard React APIs.
 *
 * ## When to use each one
 *
 * | Component | Interactive | Purpose | Example |
 * |-----------|-------------|---------|---------|
 * | **Chip** | Yes | Filters, selection | Active filters with x |
 * | **Tag** | Sometimes | Classification | "UX", "Marketing" |
 * | **StatusTag** | No | Predefined state | "Active", "Error" |
 * | **Badge** | No | Counters/states | "3", "NEW" |
 *
 * @example
 * ```tsx
 * // Chip - interactive
 * <Chip label="React" selected onRemove={() => {}} />
 *
 * // Tag - classification
 * <Tag color="success">Approved</Tag>
 *
 * // StatusTag - predefined state
 * <StatusTag status="active" />
 * ```
 */
import * as React from "react";
import {
  Chip as DSRChip,
  Tag as DSRTag,
  StatusTag as DSRStatusTag,
  Rating as DSRRating,
  TagColorsEnum,
  TagVariantsEnum,
  IconsEnum
} from "@adsmurai/design-system-react";
import { cn } from "@/lib/utils";

// ============= CONSTANTS =============

/**
 * Valid Tag color values.
 *
 * @example
 * ```tsx
 * <Tag color="success">Approved</Tag>
 * <Tag color="error">Rejected</Tag>
 * ```
 */
export const TAG_COLORS = {
  /** Success/positive - green */
  success: 'success',
  /** Warning - yellow/orange */
  warning: 'warning',
  /** Error/negative - red */
  error: 'error',
  /** Info - blue */
  info: 'info',
  /** Neutral - gray (default) */
  neutral: 'neutral',
  /** Primary - brand color */
  primary: 'primary',
  /** Processing - animated */
  processing: 'processing',
} as const;

/**
 * Valid Tag variant values.
 *
 * @example
 * ```tsx
 * <Tag variant="primary">Primary style</Tag>
 * <Tag variant="secondary">Secondary style</Tag>
 * ```
 */
export const TAG_VARIANTS = {
  /** Primary - filled style */
  primary: 'primary',
  /** Secondary - lighter style */
  secondary: 'secondary',
} as const;

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

// ============= CHIP (DSR Chip) =============
/**
 * @description Chip for filters and interactive selection.
 *
 * @ai-note IMPORTANT: Chip uses the `label` prop for text, NOT children.
 * This is different from most other components. Do not try to use children.
 *
 * @example
 * ```tsx
 * // CORRECT - use label prop
 * <Chip label="Tag name" />
 * <Chip label="Selected" selected />
 * <Chip label="With icon" icon="Star" />
 * <Chip label="Closable" onRemove={() => handleRemove()} />
 *
 * // WRONG - Chip does not use children
 * <Chip>Tag name</Chip>  // DON'T DO THIS
 * ```
 */
export interface ChipProps {
  /** Chip text */
  label: string;
  /** Whether it is selected */
  selected?: boolean;
  /** Whether it is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Handler to close/remove - shows close icon */
  onRemove?: () => void;
  /** Optional icon (IconsEnum name) */
  icon?: keyof typeof IconsEnum;
  /** data-qa attribute for testing */
  dataQa?: string;
  /** Additional CSS classes for the container */
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({ 
  label, 
  selected, 
  disabled, 
  onClick, 
  onRemove,
  icon,
  dataQa,
  className 
}) => (
  <span className={cn("inline-flex", className)}>
    <DSRChip
      label={label}
      selected={selected}
      disabled={disabled}
      onClick={onClick}
      onClose={onRemove}
      isClosable={!!onRemove}
      icon={icon ? IconsEnum[icon] : undefined}
      dataQa={dataQa}
    />
  </span>
);
Chip.displayName = "Chip";

// ============= TAG (DSR Tag) =============
/**
 * @description Tag for content categorization or classification.
 * DSR Tag uses `children` for text and TagColorsEnum for colors.
 *
 * @example
 * ```tsx
 * <Tag>Default</Tag>
 * <Tag color="success">Success</Tag>
 * <Tag color="error">Error</Tag>
 * <Tag variant="secondary">Secondary</Tag>
 * <Tag onDelete={() => {}}>Removable</Tag>
 * ```
 */
export interface TagProps {
  /** Tag content */
  children: React.ReactNode;
  /** Tag color */
  color?: "success" | "warning" | "error" | "info" | "neutral" | "primary" | "processing";
  /** Visual variant */
  variant?: "primary" | "secondary";
  /** Whether it is disabled */
  disabled?: boolean;
  /** Handler to delete - shows delete icon */
  onDelete?: () => void;
  /** data-qa attribute for testing */
  dataQa?: string;
  /** Additional CSS classes for the container */
  className?: string;
}

/** Mapping of local colors to DSR TagColorsEnum */
const tagColorMap: Record<string, TagColorsEnum> = {
  success: TagColorsEnum.Success,
  warning: TagColorsEnum.Warning,
  error: TagColorsEnum.Error,
  info: TagColorsEnum.Default, // DSR no tiene Info, usar Default
  neutral: TagColorsEnum.Default,
  primary: TagColorsEnum.Default,
  processing: TagColorsEnum.Processing,
};

/** Mapping of local variants to DSR TagVariantsEnum */
const tagVariantMap: Record<string, TagVariantsEnum> = {
  primary: TagVariantsEnum.Primary,
  secondary: TagVariantsEnum.Secondary,
};

export const Tag: React.FC<TagProps> = ({ 
  children, 
  color = "neutral", 
  variant = "primary",
  disabled,
  onDelete,
  dataQa,
  className 
}) => (
  <span className={cn("inline-flex", className)}>
    <DSRTag
      color={tagColorMap[color] || TagColorsEnum.Default}
      variant={tagVariantMap[variant] || TagVariantsEnum.Primary}
      isDisabled={disabled}
      onDelete={onDelete}
      dataQa={dataQa}
    >
      {typeof children === "string" ? children : String(children)}
    </DSRTag>
  </span>
);
Tag.displayName = "Tag";

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
export { TagColorsEnum, TagVariantsEnum, IconsEnum };
