/**
 * @fileoverview Tooltip component wrapper for DSR Tooltip
 *
 * @description
 * Wrapper that adapts DSR Tooltip to a standard React API.
 * DSR Tooltip uses `title` (not `content`) and `position` (not `placement`).
 *
 * @when_to_use
 * - Additional information on hover
 * - Explanations for icons or truncated elements
 * - Contextual help
 *
 * @when_not_to_use
 * - For menus -> use Popover or DropdownMenu
 * - For persistent information -> use Alert or Card
 *
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>Hover me</TooltipTrigger>
 *     <TooltipContent>Additional information</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
import * as React from "react";
import { Tooltip as DSRTooltip } from "@adsmurai/design-system-react";

import { cn } from "@/lib/utils";

/**
 * Valid Tooltip position values.
 *
 * @example
 * ```tsx
 * <TooltipContent side="top">Tooltip text</TooltipContent>
 * <TooltipContent side="bottom">Tooltip text</TooltipContent>
 * ```
 */
export const TOOLTIP_POSITIONS = {
  /** Top of the trigger */
  top: 'top',
  /** Right of the trigger */
  right: 'right',
  /** Bottom of the trigger */
  bottom: 'bottom',
  /** Left of the trigger */
  left: 'left',
} as const;

export interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
}

/** Provider context for tooltips */
const TooltipProvider: React.FC<TooltipProviderProps> = ({ children }) => {
  return <>{children}</>;
};

interface TooltipContextValue {
  content: string;
  setContent: (content: string) => void;
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

export interface TooltipProps {
  children: React.ReactNode;
}

/**
 * Tooltip container que coordina trigger y content.
 */
const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  const [content, setContent] = React.useState("");
  
  return (
    <TooltipContext.Provider value={{ content, setContent }}>
      {children}
    </TooltipContext.Provider>
  );
};

export interface TooltipTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

/**
 * TooltipTrigger envuelve el elemento que activa el tooltip.
 */
const TooltipTrigger = React.forwardRef<HTMLDivElement, TooltipTriggerProps>(
  ({ children, asChild }, ref) => {
    const context = React.useContext(TooltipContext);
    
    if (!context) {
      return <>{children}</>;
    }

    return (
      <DSRTooltip title={context.content} position="top">
        <span ref={ref}>{children}</span>
      </DSRTooltip>
    );
  }
);
TooltipTrigger.displayName = "TooltipTrigger";

export interface TooltipContentProps {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  className?: string;
  align?: "start" | "center" | "end";
  hidden?: boolean;
}

/**
 * TooltipContent defines the tooltip content.
 * In DSR, content is passed as a prop, so this component
 * only registers the content in context.
 */
const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ children, className, side = "top" }, ref) => {
    const context = React.useContext(TooltipContext);
    
    React.useEffect(() => {
      if (context && typeof children === "string") {
        context.setContent(children);
      }
    }, [children, context]);

    // El contenido real se renderiza por DSRTooltip en TooltipTrigger
    return null;
  }
);
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
