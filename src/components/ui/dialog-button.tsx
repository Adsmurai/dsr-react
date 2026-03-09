/**
 * @fileoverview DialogButton component
 *
 * @description
 * Button that opens a dialog modal when clicked. Wraps DSR DialogButton
 * with a simplified API. Children is a render function that receives
 * an onClose callback for closing the dialog programmatically.
 *
 * @when_to_use
 * - Quick dialog triggers without managing open state
 * - Confirmation dialogs attached to buttons
 * - Modal forms triggered by a single button
 *
 * @when_not_to_use
 * - Complex controlled dialog state → use Dialog or Modal
 * - Multiple triggers for same dialog → use Dialog
 * - Non-button triggers → use Dialog with custom trigger
 *
 * @example Basic usage
 * ```tsx
 * import { DialogButton } from '@adsmurai/dsr-react';
 * import { Button } from '@adsmurai/dsr-react';
 *
 * <DialogButton title="Confirm Action" buttonLabel="Open Dialog">
 *   {(onClose) => (
 *     <div className="space-y-4">
 *       <p>Are you sure you want to proceed?</p>
 *       <div className="flex gap-2 justify-end">
 *         <Button variant="outline" onClick={onClose}>Cancel</Button>
 *         <Button onClick={() => { handleConfirm(); onClose(); }}>Confirm</Button>
 *       </div>
 *     </div>
 *   )}
 * </DialogButton>
 * ```
 *
 * @example With custom trigger element
 * ```tsx
 * <DialogButton
 *   title="Edit Profile"
 *   customElement={<IconButton icon={IconsEnum.Edit} />}
 *   maxWidth="md"
 * >
 *   {(onClose) => (
 *     <ProfileForm onSave={() => { saveProfile(); onClose(); }} />
 *   )}
 * </DialogButton>
 * ```
 *
 * @example Full screen dialog
 * ```tsx
 * <DialogButton
 *   title="Full Editor"
 *   buttonLabel="Open Editor"
 *   fullScreen
 *   closeIcon
 * >
 *   {(onClose) => <FullScreenEditor onClose={onClose} />}
 * </DialogButton>
 * ```
 */
import * as React from 'react';
import { DialogButton as DSRDialogButton, ButtonV2, ButtonVariantEnum } from '@adsmurai/design-system-react';

/**
 * Available max width options for DialogButton.
 * Controls the maximum width of the dialog content.
 */
export const DIALOG_BUTTON_MAX_WIDTHS = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

/** Type for dialog max width values */
export type DialogButtonMaxWidth = (typeof DIALOG_BUTTON_MAX_WIDTHS)[number];

export interface DialogButtonProps {
  /** Dialog title */
  title: string;
  /** Render function that receives onClose callback */
  children: (onClose: () => void) => React.ReactElement;
  /** Button label (if not using customElement) */
  buttonLabel?: string;
  /** Custom trigger element */
  customElement?: React.ReactElement;
  /** Whether dialog is open (controlled) */
  open?: boolean;
  /** Dialog max width */
  maxWidth?: DialogButtonMaxWidth;
  /** Show close icon */
  closeIcon?: boolean;
  /** Full screen mode */
  fullScreen?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Optional className */
  className?: string;
}

/**
 * DialogButton component - wrapper for DSR DialogButton
 *
 * Button that opens a dialog modal when clicked.
 */
export const DialogButton: React.FC<DialogButtonProps> = ({
  title,
  children,
  buttonLabel = 'Open',
  customElement,
  open,
  maxWidth = 'sm',
  closeIcon = true,
  fullScreen = false,
  disabled = false,
  onClose,
  className,
}) => {
  const triggerElement = customElement || (
    <ButtonV2
      label={buttonLabel}
      variant={ButtonVariantEnum.Outlined}
    />
  );

  return (
    <div className={className}>
      <DSRDialogButton
        title={title}
        customElement={triggerElement}
        opened={open}
        maxWidth={maxWidth}
        closeIcon={closeIcon}
        fullScreen={fullScreen}
        isDisabled={disabled}
        handleCustomOnClose={onClose}
      >
        {children}
      </DSRDialogButton>
    </div>
  );
};

DialogButton.displayName = 'DialogButton';

export default DialogButton;
