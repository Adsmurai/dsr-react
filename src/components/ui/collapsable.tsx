/**
 * @fileoverview Collapsable wrapper for DSR Collapsable
 *
 * @description
 * Expandable/collapsible content section using DSR Collapsable.
 *
 * @when_to_use
 * - Expandable content sections
 * - FAQs with questions/answers
 * - Configuration panels
 *
 * @when_not_to_use
 * - For grouped accordions -> use Accordion
 * - For dropdown menus -> use ActionMenu
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Collapsable title="See more details">
 *   <p>Expandable content here</p>
 * </Collapsable>
 *
 * // Controlled state
 * const [isOpen, setIsOpen] = useState(false);
 * <Collapsable
 *   title="Settings"
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 * >
 *   <p>Settings content</p>
 * </Collapsable>
 *
 * // With size variant
 * <Collapsable title="Small section" size="small">
 *   <p>Content</p>
 * </Collapsable>
 * ```
 */
import * as React from "react";
import {
  Collapsable as DSRCollapsable,
  CollapsableSizeEnum,
} from "@adsmurai/design-system-react";
import { cn } from "@/lib/utils";

/**
 * Valid Collapsable size values.
 *
 * @example
 * ```tsx
 * <Collapsable title="Section" size="small">Content</Collapsable>
 * ```
 */
export const COLLAPSABLE_SIZES = {
  /** Default size */
  default: 'default',
  /** Small/compact size */
  small: 'small',
} as const;

/** @internal Size mapping */
const sizeMap: Record<string, CollapsableSizeEnum> = {
  default: CollapsableSizeEnum.Default,
  small: CollapsableSizeEnum.Small,
};

export interface CollapsableProps {
  /** Title/header of the trigger */
  title: string | React.ReactNode;
  /** Expandable content */
  children: React.ReactNode;
  /** If open by default */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback when state changes */
  onOpenChange?: (open: boolean) => void;
  /** Size variant */
  size?: "default" | "small";
  /** Disabled state */
  disabled?: boolean;
  /** Additional className for wrapper */
  className?: string;
  /** data-qa attribute for testing */
  dataQa?: string;
}

/**
 * Collapsable component - wrapper for DSR Collapsable.
 */
const Collapsable: React.FC<CollapsableProps> = ({
  title,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  size = "default",
  disabled,
  className,
  dataQa,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const handleStateChange = React.useCallback(
    (newState: boolean) => {
      if (!isControlled) {
        setInternalOpen(newState);
      }
      onOpenChange?.(newState);
    },
    [isControlled, onOpenChange]
  );

  // DSR Collapsable uses collapsableState as [boolean, setState] tuple
  const collapsableState: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = [
    isOpen,
    (value) => {
      const newValue = typeof value === "function" ? value(isOpen) : value;
      handleStateChange(newValue);
    },
  ];

  return (
    <div className={cn("w-full", className)}>
      <DSRCollapsable
        name={title}
        size={sizeMap[size]}
        disabled={disabled}
        collapsableState={collapsableState}
        dataQa={dataQa}
      >
        {children}
      </DSRCollapsable>
    </div>
  );
};

Collapsable.displayName = "Collapsable";

export { Collapsable };
