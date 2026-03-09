/**
 * Dialog/Modal Wrapper
 *
 * DSR Modal has a very different API (message object, not children).
 * This wrapper provides a standard compositional API using HTML.
 * 
 * @example
 * <Dialog open={isOpen} onOpenChange={setIsOpen}>
 *   <DialogTrigger asChild>
 *     <Button>Open Dialog</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Title</DialogTitle>
 *       <DialogDescription>Description</DialogDescription>
 *     </DialogHeader>
 *     <div>Content</div>
 *     <DialogFooter>
 *       <Button>Close</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * 
 * @example
 * // Para uso simple con DSR Modal, usar Modal directamente
 * import { Modal as DSRModal } from '@adsmurai/design-system-react';
 */
import * as React from "react";
import { cn } from "@/lib/utils";
import { Typography } from "./typography";

// ============================================
// Context
// ============================================

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

const useDialogContext = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog');
  }
  return context;
};

// ============================================
// Dialog Root
// ============================================

interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ 
  open: controlledOpen, 
  defaultOpen = false,
  onOpenChange, 
  children 
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  
  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    setInternalOpen(newOpen);
    onOpenChange?.(newOpen);
  }, [onOpenChange]);

  return (
    <DialogContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

// ============================================
// DialogTrigger
// ============================================

interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const DialogTrigger: React.FC<DialogTriggerProps> = ({ children, asChild }) => {
  const { onOpenChange } = useDialogContext();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpenChange(true);
  };
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: React.MouseEventHandler }>, {
      onClick: handleClick
    });
  }
  
  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
};

// ============================================
// DialogContent
// ============================================

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className, ...props }, ref) => {
    const { open, onOpenChange } = useDialogContext();
    
    // Handle escape key
    React.useEffect(() => {
      if (!open) return;
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onOpenChange(false);
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, onOpenChange]);
    
    if (!open) return null;
    
    return (
      <div className="fixed inset-0 z-50">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/80 animate-in fade-in-0" 
          onClick={() => onOpenChange(false)}
        />
        {/* Content */}
        <div
          ref={ref}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]",
            "sm:rounded-lg",
            className
          )}
          {...props}
        >
          {children}
          {/* Close button */}
          <button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={() => onOpenChange(false)}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
    );
  }
);
DialogContent.displayName = "DialogContent";

// ============================================
// DialogClose
// ============================================

export const DialogClose: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ 
  children, 
  asChild 
}) => {
  const { onOpenChange } = useDialogContext();
  
  const handleClick = () => onOpenChange(false);
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: handleClick
    });
  }
  
  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
};

// ============================================
// Sub-components
// ============================================

export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className, 
  ...props 
}) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

export const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className, 
  ...props 
}) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

export const DialogTitle = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    <Typography variant="h5" weight="semibold">
      {children}
    </Typography>
  </div>
));
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    <Typography variant="body2" intensity="medium">
      {children}
    </Typography>
  </div>
));
DialogDescription.displayName = "DialogDescription";

// Portal exports for compatibility
export const DialogPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
export const DialogOverlay: React.FC<{ children?: React.ReactNode }> = () => null;
