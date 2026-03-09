/**
 * @fileoverview Popover component wrapper for DSR Popover
 *
 * @description
 * Wrapper that provides a compositional API for popovers.
 * DSR Popover uses 'pointedTarget' and 'content' as props.
 * This wrapper maintains the standard React compositional API.
 *
 * @when_to_use
 * - Tooltips with rich content
 * - Contextual menus
 * - Dropdowns with custom content
 *
 * @when_not_to_use
 * - For simple tooltips -> use Tooltip
 * - For modals -> use Modal/Dialog
 * - For action menus -> use ActionMenu
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button>Open</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     Popover content
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * @example
 * // To use DSR Popover directly:
 * import { Popover as DSRPopover } from '@adsmurai/design-system-react';
 * <DSRPopover
 *   pointedTarget={<Button label="Click" />}
 *   content="Content"
 *   isOpenOnClick
 * />
 */
import * as React from "react";
import { Popover as DSRPopover } from "@adsmurai/design-system-react";
import { cn } from "@/lib/utils";

/**
 * Valid Popover side values (position relative to trigger).
 *
 * @example
 * ```tsx
 * <PopoverContent side="bottom">Content</PopoverContent>
 * <PopoverContent side="right">Content</PopoverContent>
 * ```
 */
export const POPOVER_SIDES = {
  /** Above the trigger */
  top: 'top',
  /** Below the trigger (default) */
  bottom: 'bottom',
  /** Left of the trigger */
  left: 'left',
  /** Right of the trigger */
  right: 'right',
} as const;

/**
 * Valid Popover align values (alignment along the side axis).
 *
 * @example
 * ```tsx
 * <PopoverContent align="start">Content</PopoverContent>
 * <PopoverContent align="end">Content</PopoverContent>
 * ```
 */
export const POPOVER_ALIGNS = {
  /** Align to the start */
  start: 'start',
  /** Center aligned (default) */
  center: 'center',
  /** Align to the end */
  end: 'end',
} as const;

// ============================================
// Context
// ============================================

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  triggerElement: React.ReactNode | null;
  setTriggerElement: (element: React.ReactNode) => void;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover components must be used within a Popover');
  }
  return context;
};

// ============================================
// Popover Root
// ============================================

interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const Popover: React.FC<PopoverProps> = ({ 
  open: controlledOpen,
  defaultOpen = false, 
  onOpenChange,
  children 
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const [triggerElement, setTriggerElement] = React.useState<React.ReactNode>(null);
  const open = controlledOpen ?? internalOpen;
  const triggerRef = React.useRef<HTMLDivElement>(null);
  
  const setOpen = React.useCallback((newOpen: boolean) => {
    setInternalOpen(newOpen);
    onOpenChange?.(newOpen);
  }, [onOpenChange]);

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef, triggerElement, setTriggerElement }}>
      <div className="relative inline-block">
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

// ============================================
// PopoverTrigger
// ============================================

interface PopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children, asChild }) => {
  const { open, setOpen, triggerRef, setTriggerElement } = usePopoverContext();
  
  React.useEffect(() => {
    setTriggerElement(children);
  }, [children, setTriggerElement]);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!open);
  };
  
  return (
    <div ref={triggerRef} onClick={handleClick} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
};

// ============================================
// PopoverContent
// ============================================

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className, align = 'center', sideOffset = 4, side = 'bottom', ...props }, ref) => {
    const { open, setOpen, triggerRef } = usePopoverContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    
    // Combine refs
    React.useImperativeHandle(ref, () => contentRef.current!);
    
    // Close on click outside
    React.useEffect(() => {
      if (!open) return;
      
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          triggerRef.current?.contains(target) ||
          contentRef.current?.contains(target)
        ) {
          return;
        }
        setOpen(false);
      };
      
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setOpen(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [open, setOpen, triggerRef]);
    
    if (!open) return null;
    
    // Position styles based on side and align
    const positionStyles: React.CSSProperties = {
      position: 'absolute',
      zIndex: 50,
    };
    
    switch (side) {
      case 'top':
        positionStyles.bottom = `calc(100% + ${sideOffset}px)`;
        positionStyles.left = align === 'start' ? 0 : align === 'end' ? 'auto' : '50%';
        positionStyles.right = align === 'end' ? 0 : 'auto';
        positionStyles.transform = align === 'center' ? 'translateX(-50%)' : undefined;
        break;
      case 'bottom':
        positionStyles.top = `calc(100% + ${sideOffset}px)`;
        positionStyles.left = align === 'start' ? 0 : align === 'end' ? 'auto' : '50%';
        positionStyles.right = align === 'end' ? 0 : 'auto';
        positionStyles.transform = align === 'center' ? 'translateX(-50%)' : undefined;
        break;
      case 'left':
        positionStyles.right = `calc(100% + ${sideOffset}px)`;
        positionStyles.top = '50%';
        positionStyles.transform = 'translateY(-50%)';
        break;
      case 'right':
        positionStyles.left = `calc(100% + ${sideOffset}px)`;
        positionStyles.top = '50%';
        positionStyles.transform = 'translateY(-50%)';
        break;
    }
    
    return (
      <div
        ref={contentRef}
        style={positionStyles}
        className={cn(
          "w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
          "animate-in fade-in-0 zoom-in-95",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
PopoverContent.displayName = "PopoverContent";

// Anchor export for compatibility
export const PopoverAnchor: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

// ============================================
// Re-export DSR Popover for direct usage
// ============================================
export { DSRPopover };
