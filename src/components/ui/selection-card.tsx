/**
 * @fileoverview SelectionCard wrapper for DSR SelectionCard
 *
 * @description
 * Card component with integrated checkbox/radio selection using DSR SelectionCard.
 *
 * @when_to_use
 * - Selectable option cards
 * - Multi-select or single-select card lists
 * - Visual selection interfaces
 *
 * @when_not_to_use
 * - Simple checkboxes → use Checkbox
 * - Radio buttons without card → use RadioGroup
 *
 * @example
 * ```tsx
 * // Checkbox selection
 * <SelectionCard
 *   title="Option 1"
 *   description="This is option 1"
 *   value="option1"
 *   selected={isSelected}
 *   onChange={(value, checked) => setSelected(checked)}
 * />
 *
 * // Radio selection
 * <SelectionCard
 *   title="Plan A"
 *   description="Basic plan"
 *   value="plan-a"
 *   selectionType="radio"
 *   selected={selectedPlan === 'plan-a'}
 *   onChange={(value) => setSelectedPlan(value)}
 * />
 *
 * // With image
 * <SelectionCard
 *   title="Premium"
 *   image="/images/premium.png"
 *   value="premium"
 *   selected={selected}
 *   onChange={handleChange}
 * />
 * ```
 */
import * as React from "react";
import {
  SelectionCard as DSRSelectionCard,
  SelectionCardStyleEnum,
  SelectionCardPositionEnum,
  SelectionTypeEnum,
} from "@adsmurai/design-system-react";
import { cn } from "@/lib/utils";

/**
 * Available selection types for SelectionCard.
 * - `checkbox`: Multiple items can be selected
 * - `radio`: Only one item can be selected at a time
 */
export const SELECTION_CARD_TYPES = ['checkbox', 'radio'] as const;

/**
 * Available style variants for SelectionCard.
 * - `outlined`: Card with border outline
 * - `elevated`: Card with shadow elevation
 */
export const SELECTION_CARD_STYLES = ['outlined', 'elevated'] as const;

/**
 * Available layout positions for SelectionCard.
 * - `row`: Horizontal layout (checkbox/radio on the side)
 * - `column`: Vertical layout (checkbox/radio on top)
 */
export const SELECTION_CARD_POSITIONS = ['row', 'column'] as const;

/** Type for selection card type values */
export type SelectionCardType = (typeof SELECTION_CARD_TYPES)[number];

/** Type for selection card style values */
export type SelectionCardStyle = (typeof SELECTION_CARD_STYLES)[number];

/** Type for selection card position values */
export type SelectionCardPosition = (typeof SELECTION_CARD_POSITIONS)[number];

/** @internal Style mapping */
const styleMap: Record<SelectionCardStyle, SelectionCardStyleEnum> = {
  outlined: SelectionCardStyleEnum.Outlined,
  elevated: SelectionCardStyleEnum.Elevated,
};

/** @internal Position mapping */
const positionMap: Record<SelectionCardPosition, SelectionCardPositionEnum> = {
  row: SelectionCardPositionEnum.Row,
  column: SelectionCardPositionEnum.Column,
};

/** @internal Selection type mapping */
const selectionTypeMap: Record<SelectionCardType, SelectionTypeEnum> = {
  checkbox: SelectionTypeEnum.Checkbox,
  radio: SelectionTypeEnum.Radio,
};

export interface SelectionCardProps {
  /** Card title */
  title: string;
  /** Card description/subtitle */
  description?: string;
  /** Unique value identifier (required) */
  value: string;
  /** Whether the card is selected */
  selected?: boolean;
  /** Change handler - receives value and checked state */
  onChange?: (value: string, checked?: boolean) => void;
  /** Selection type */
  selectionType?: SelectionCardType;
  /** Disabled state */
  disabled?: boolean;
  /** Image URL */
  image?: string;
  /** Card style variant */
  style?: SelectionCardStyle;
  /** Layout position */
  position?: SelectionCardPosition;
  /** Custom width */
  width?: React.CSSProperties["width"];
  /** Additional content */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
  /** data-qa attribute for testing */
  dataQa?: string;
}

/**
 * SelectionCard component - wrapper for DSR SelectionCard.
 */
export const SelectionCard: React.FC<SelectionCardProps> = ({
  title,
  description,
  value,
  selected = false,
  onChange,
  selectionType = "checkbox",
  disabled = false,
  image,
  style = "outlined",
  position = "row",
  width,
  children,
  className,
  dataQa,
}) => {
  const handleChange = (val: string, checked?: boolean) => {
    onChange?.(val, checked);
  };

  return (
    <div className={cn("w-full", className)}>
      <DSRSelectionCard
        title={title}
        subtitle={description}
        value={value}
        selected={selected}
        onChange={handleChange}
        selectionType={selectionTypeMap[selectionType]}
        disabled={disabled}
        image={image}
        style={styleMap[style]}
        position={positionMap[position]}
        width={width}
        dataQa={dataQa}
      >
        {children}
      </DSRSelectionCard>
    </div>
  );
};

SelectionCard.displayName = "SelectionCard";

export default SelectionCard;
