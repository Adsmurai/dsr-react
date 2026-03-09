/**
 * @fileoverview Modal wrapper for DSR Modal component
 *
 * @description
 * Wrapper that adapts DSR Modal to a more standard React API.
 * This is a simpler modal component compared to Dialog.
 *
 * @ai-note IMPORTANT: Modal uses the `actions` prop for buttons (not children).
 * The `children` prop is for the modal body content.
 * For compositional dialogs (trigger + content), use the Dialog component instead.
 *
 * @when_to_use
 * - Simple confirmation modals
 * - Alert/info modals with actions
 * - Status modals (success, error, warning)
 *
 * @when_not_to_use
 * - For compositional dialogs with trigger → use Dialog
 * - For complex multi-step modals → use Dialog
 *
 * @example
 * ```tsx
 * // Basic confirmation
 * <Modal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 * >
 *   <p>Are you sure you want to proceed?</p>
 * </Modal>
 *
 * // With actions (footer buttons)
 * <Modal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Delete Item"
 *   status="error"
 *   actions={
 *     <>
 *       <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
 *       <Button variant="destructive" onClick={handleDelete}>Delete</Button>
 *     </>
 *   }
 * >
 *   <p>This action cannot be undone.</p>
 * </Modal>
 *
 * // With status styling
 * <Modal open={isOpen} onClose={onClose} title="Success" status="success">
 *   <p>Operation completed successfully!</p>
 * </Modal>
 * ```
 */
import * as React from "react";
import { Modal as DSRModal } from "@adsmurai/design-system-react";

/**
 * Valid Modal status values (affects colors/icons).
 *
 * @example
 * ```tsx
 * <Modal open={isOpen} onClose={onClose} status="success" title="Done!">
 *   Operation completed.
 * </Modal>
 * ```
 */
export const MODAL_STATUSES = {
  /** Success - green */
  success: 'success',
  /** Error - red */
  error: 'error',
  /** Warning - yellow/orange */
  warning: 'warning',
  /** Info - blue */
  info: 'info',
} as const;

export interface ModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when the modal is closed */
  onClose?: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children?: React.ReactNode;
  /** Action buttons (footer) */
  actions?: React.ReactNode;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Visual status (affects colors) */
  status?: "success" | "error" | "warning" | "info";
  /** Whether it closes when clicking outside */
  closeOnOutsideClick?: boolean;
  /** Whether it takes the full available width */
  fullWidth?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  icon,
  status,
  closeOnOutsideClick = true,
  fullWidth = false,
}) => {
  // DSR Modal uses `message` prop with specific structure
  // The message prop requires string or ReactElement, not generic ReactNode
  const messageContent = typeof children === 'string' 
    ? children 
    : React.isValidElement(children) 
      ? children 
      : <>{children}</>;

  const message = {
    title,
    message: messageContent as React.ReactElement,
    renderIcon: icon as React.ReactElement | undefined,
    renderButtons: actions as React.ReactElement | undefined,
    status,
    onCloseIconClick: onClose,
  };

  return (
    <DSRModal
      open={open}
      onClose={onClose}
      message={message}
      closeOnOutsideClick={closeOnOutsideClick}
      isFullWidth={fullWidth}
    />
  );
};
Modal.displayName = "Modal";
