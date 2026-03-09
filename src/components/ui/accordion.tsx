/**
 * @fileoverview Accordion component wrapper for DSR Collapsable
 *
 * @description
 * Wrapper that adapts DSR Collapsable to a standard compositional API.
 * DSR Collapsable uses 'label' for the title and children for content.
 *
 * @when_to_use
 * - Collapsible content sections
 * - FAQs and expandable lists
 * - Configuration panels
 *
 * @when_not_to_use
 * - For dropdown menus -> use ActionMenu
 * - For tabs -> use Tabs
 *
 * @example
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Title</AccordionTrigger>
 *     <AccordionContent>Content</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
import * as React from "react";
import { Collapsable } from "@adsmurai/design-system-react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Valid Accordion type values.
 *
 * @example
 * ```tsx
 * <Accordion type="single" collapsible>...</Accordion>
 * <Accordion type="multiple">...</Accordion>
 * ```
 */
export const ACCORDION_TYPES = {
  /** Single - only one item can be expanded at a time */
  single: 'single',
  /** Multiple - multiple items can be expanded simultaneously */
  multiple: 'multiple',
} as const;

// ============================================
// Context
// ============================================

interface AccordionContextValue {
  type: 'single' | 'multiple';
  expandedItems: string[];
  toggleItem: (value: string) => void;
  collapsible?: boolean;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

const useAccordionContext = () => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
};

interface AccordionItemContextValue {
  value: string;
  isExpanded: boolean;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

const useAccordionItemContext = () => {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionTrigger/Content must be used within an AccordionItem');
  }
  return context;
};

// ============================================
// Accordion Root
// ============================================

interface AccordionSingleProps {
  type: 'single';
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface AccordionMultipleProps {
  type: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  children: React.ReactNode;
  className?: string;
}

type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const { type, children, className } = props;
    
    const [expandedItems, setExpandedItems] = React.useState<string[]>(() => {
      if (type === 'single') {
        const singleProps = props as AccordionSingleProps;
        return singleProps.defaultValue ? [singleProps.defaultValue] : [];
      } else {
        const multipleProps = props as AccordionMultipleProps;
        return multipleProps.defaultValue || [];
      }
    });

    // Handle controlled state
    React.useEffect(() => {
      if (type === 'single') {
        const singleProps = props as AccordionSingleProps;
        if (singleProps.value !== undefined) {
          setExpandedItems(singleProps.value ? [singleProps.value] : []);
        }
      } else {
        const multipleProps = props as AccordionMultipleProps;
        if (multipleProps.value !== undefined) {
          setExpandedItems(multipleProps.value);
        }
      }
    }, [type, props]);

    const toggleItem = React.useCallback((value: string) => {
      if (type === 'single') {
        const singleProps = props as AccordionSingleProps;
        const isCurrentlyExpanded = expandedItems.includes(value);
        
        if (isCurrentlyExpanded && singleProps.collapsible) {
          setExpandedItems([]);
          singleProps.onValueChange?.('');
        } else if (!isCurrentlyExpanded) {
          setExpandedItems([value]);
          singleProps.onValueChange?.(value);
        }
      } else {
        const multipleProps = props as AccordionMultipleProps;
        const isCurrentlyExpanded = expandedItems.includes(value);
        const newItems = isCurrentlyExpanded
          ? expandedItems.filter(item => item !== value)
          : [...expandedItems, value];
        
        setExpandedItems(newItems);
        multipleProps.onValueChange?.(newItems);
      }
    }, [type, props, expandedItems]);

    const collapsible = type === 'single' ? (props as AccordionSingleProps).collapsible : true;

    return (
      <AccordionContext.Provider value={{ type, expandedItems, toggleItem, collapsible }}>
        <div ref={ref} className={cn("w-full", className)}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

// ============================================
// AccordionItem
// ============================================

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, children, className, disabled }, ref) => {
    const { expandedItems } = useAccordionContext();
    const isExpanded = expandedItems.includes(value);

    return (
      <AccordionItemContext.Provider value={{ value, isExpanded }}>
        <div ref={ref} className={cn("border-b", className)} data-state={isExpanded ? 'open' : 'closed'}>
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

// ============================================
// AccordionTrigger
// ============================================

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { toggleItem } = useAccordionContext();
    const { value, isExpanded } = useAccordionItemContext();

    return (
      <h3 className="flex">
        <button
          ref={ref}
          type="button"
          onClick={() => toggleItem(value)}
          className={cn(
            "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
            className
          )}
          data-state={isExpanded ? 'open' : 'closed'}
          {...props}
        >
          {children}
          <ChevronDown 
            className={cn(
              "h-4 w-4 shrink-0 transition-transform duration-200",
              isExpanded && "rotate-180"
            )} 
          />
        </button>
      </h3>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

// ============================================
// AccordionContent
// ============================================

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { isExpanded } = useAccordionItemContext();

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden text-sm transition-all",
          isExpanded ? "animate-accordion-down" : "animate-accordion-up hidden"
        )}
        data-state={isExpanded ? 'open' : 'closed'}
        {...props}
      >
        <div className={cn("pb-4 pt-0", className)}>{children}</div>
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
