/**
 * @fileoverview ActionMenu wrapper for DSR ActionMenu
 *
 * @description
 * Dropdown action menu that internally uses DSR ActionMenu.
 * Supports dropdown actions, external actions, modal confirmations and feedback.
 *
 * @when_to_use
 * - Contextual menus with multiple actions
 * - "More options" buttons (three dots)
 * - Actions in table rows
 * - When you need modal confirmation for destructive actions
 *
 * @when_not_to_use
 * - For a single action button → use `Button` or `IconButton`
 * - For navigation → use links or tabs
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ActionMenu
 *   actions={[
 *     { id: 'edit', label: 'Edit', onClick: handleEdit, icon: 'Edit' },
 *     { id: 'delete', label: 'Delete', onClick: handleDelete, variant: 'destructive' }
 *   ]}
 * />
 *
 * // With modal confirmation
 * <ActionMenu
 *   actions={[
 *     {
 *       id: 'delete',
 *       label: 'Delete',
 *       variant: 'destructive',
 *       needsConfirm: true,
 *       confirmTitle: 'Delete item',
 *       confirmMessage: 'Are you sure?',
 *       onClick: handleDelete
 *     }
 *   ]}
 * />
 *
 * // With external actions (buttons visible outside the dropdown)
 * <ActionMenu
 *   actions={[{ id: 'archive', label: 'Archive', onClick: handleArchive }]}
 *   externalActions={[
 *     { id: 'edit', label: 'Edit', icon: 'Edit', onClick: handleEdit },
 *     { id: 'preview', label: 'View', icon: 'Visibility', href: '/preview/123' }
 *   ]}
 * />
 * ```
 */
import * as React from "react";
import {
  ActionMenu as DSRActionMenu,
  IconsEnum
} from "@adsmurai/design-system-react";
import type { ActionResponse } from "@adsmurai/design-system-react";

/**
 * Available sizes for ActionMenu trigger button.
 * - `small`: 32px
 * - `medium`: 40px
 * - `large`: 48px
 */
export const ACTION_MENU_SIZES = ['small', 'medium', 'large'] as const;

/**
 * Available placement options for ActionMenu dropdown.
 */
export const ACTION_MENU_PLACEMENTS = [
  'top', 'top-start', 'top-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end',
  'right', 'right-start', 'right-end'
] as const;

/**
 * Available tooltip positions for external actions.
 */
export const ACTION_MENU_TOOLTIP_POSITIONS = ['top', 'bottom', 'left', 'right'] as const;

/** Type for action menu size values */
export type ActionMenuSize = (typeof ACTION_MENU_SIZES)[number];

/** Type for action menu placement values */
export type ActionMenuPlacement = (typeof ACTION_MENU_PLACEMENTS)[number];

/** Type for action menu tooltip position values */
export type ActionMenuTooltipPosition = (typeof ACTION_MENU_TOOLTIP_POSITIONS)[number];

/** Type for valid icon names */
type IconName = keyof typeof IconsEnum;

export interface ActionMenuItem {
  /** Unique action ID */
  id: string;
  /** Action text */
  label: string;
  /** Click handler (converted to async internally) */
  onClick?: () => void | Promise<void>;
  /** Whether the action is disabled */
  disabled?: boolean;
  /** Optional icon (IconsEnum name: 'Edit', 'Delete', 'Visibility', etc.) */
  icon?: IconName;
  /** Visual variant (destructive for dangerous actions) */
  variant?: "default" | "destructive";
  /** Whether it requires modal confirmation */
  needsConfirm?: boolean;
  /** Confirmation modal title */
  confirmTitle?: string;
  /** Confirmation modal message */
  confirmMessage?: string | React.ReactElement;
  /** Accept button text in the modal */
  acceptTitle?: string;
  /** Alternative URL (for actions that are links) */
  href?: string;
  /** Open in new tab */
  targetBlank?: boolean;
  /** For external actions: render as button instead of icon button */
  isButton?: boolean;
}

export interface ActionMenuProps {
  /** Array of actions for the dropdown menu */
  actions: ActionMenuItem[];
  /** Array of external actions (visible outside the dropdown) */
  externalActions?: ActionMenuItem[];
  /** Trigger button icon (default: MoreVert) */
  iconName?: IconName;
  /** Menu size: small (32px), medium (40px), large (48px) */
  size?: ActionMenuSize;
  /** Dropdown menu position */
  placement?: ActionMenuPlacement;
  /** External actions tooltip position */
  tooltipPosition?: ActionMenuTooltipPosition;
  /** Open menu on hover instead of click */
  useHoverEvents?: boolean;
  /** Callback when an action returns a response */
  onResponseAction?: (id: string, response: ActionResponse) => void;
  /** Callback when an action starts executing */
  onRunAction?: (id: string) => void;
}

/**
 * Internal type for DSR actions
 */
interface DSRAction {
  id: string;
  label: string;
  action: () => Promise<ActionResponse>;
  isDisabled?: boolean;
  icon?: IconsEnum;
  level?: "error" | "info" | "success" | "warning";
  needsConfirm?: boolean;
  confirmTitle?: string;
  confirmMessage?: string | React.ReactElement;
  acceptTitle?: string;
  alternativeHref?: string;
  targetBlank?: boolean;
  isButton?: boolean;
}

/**
 * Converts our simplified API to DSR ActionMenu API
 */
const convertToDSRAction = (action: ActionMenuItem): DSRAction => {
  // Base async action required by DSR
  const baseAction = async (): Promise<ActionResponse> => {
    try {
      await action.onClick?.();
      return { type: "success", message: "" };
    } catch (error) {
      return { 
        type: "error", 
        message: error instanceof Error ? error.message : "Error" 
      };
    }
  };

  const dsrAction: DSRAction = {
    id: action.id,
    label: action.label,
    action: baseAction,
    isDisabled: action.disabled,
  };

  // Convert icon string to IconsEnum
  if (action.icon && action.icon in IconsEnum) {
    dsrAction.icon = IconsEnum[action.icon];
  }

  // Convert variant to level
  if (action.variant === "destructive") {
    dsrAction.level = "error";
  }

  // Confirmation properties
  if (action.needsConfirm) {
    dsrAction.needsConfirm = true;
    dsrAction.confirmTitle = action.confirmTitle;
    dsrAction.confirmMessage = action.confirmMessage;
    dsrAction.acceptTitle = action.acceptTitle;
  }

  // For links
  if (action.href) {
    dsrAction.alternativeHref = action.href;
    dsrAction.targetBlank = action.targetBlank;
  }

  // For external actions as button
  if (action.isButton) {
    dsrAction.isButton = true;
  }

  return dsrAction;
};

/**
 * ActionMenu component - DSR wrapper.
 *
 * Flexible action menu that combines a floating dropdown with external action buttons.
 * Supports modal confirmations, notifications and various interaction patterns.
 */
const ActionMenu: React.FC<ActionMenuProps> = ({ 
  actions, 
  externalActions,
  iconName = "MoreVert",
  size = "small",
  placement = "bottom-end",
  tooltipPosition = "bottom",
  useHoverEvents = false,
  onResponseAction,
  onRunAction,
}) => {
  // Convert actions to DSR format
  const dsrActions = actions.map(convertToDSRAction);
  const dsrExternalActions = externalActions?.map(convertToDSRAction);

  // Convert iconName to IconsEnum
  const triggerIcon = iconName && iconName in IconsEnum 
    ? IconsEnum[iconName] 
    : IconsEnum.MoreVert;

  return (
    <DSRActionMenu 
      iconId={triggerIcon}
      actions={dsrActions}
      externalActions={dsrExternalActions}
      size={size}
      placement={placement}
      tooltipPosition={tooltipPosition}
      useHoverEvents={useHoverEvents}
      onResponseAction={onResponseAction}
      onRunAction={onRunAction}
    />
  );
};

export { ActionMenu };
