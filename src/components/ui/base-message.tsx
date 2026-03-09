/**
 * @fileoverview BaseMessage wrapper for DSR BaseMessage component
 *
 * @description
 * Wrapper that adapts DSR BaseMessage for messages with visual state.
 * Ideal for operation feedback, contextual notifications, alerts.
 *
 * @example
 * // Success message
 * <BaseMessage
 *   title="Operation successful"
 *   message="Changes have been saved correctly."
 *   status="success"
 * />
 *
 * @example
 * // With icon and buttons
 * <BaseMessage
 *   title="Confirm action"
 *   message="Are you sure you want to continue?"
 *   status="warning"
 *   icon={<Icon>{IconsEnum.Warning}</Icon>}
 *   actions={<Button label="Confirm" />}
 * />
 */
import * as React from "react";
import { BaseMessage as DSRBaseMessage } from "@adsmurai/design-system-react";
import { cn } from "@/lib/utils";

/**
 * Available status types for BaseMessage.
 * - `success`: Positive feedback (green)
 * - `warning`: Caution message (yellow/orange)
 * - `info`: Informational message (blue)
 * - `error`: Error/failure message (red)
 */
export const BASE_MESSAGE_STATUSES = ['success', 'warning', 'info', 'error'] as const;

/**
 * Available sizes for BaseMessage.
 * - `small`: Compact message
 * - `medium`: Default size
 */
export const BASE_MESSAGE_SIZES = ['small', 'medium'] as const;

/** Type for base message status values */
export type BaseMessageStatus = (typeof BASE_MESSAGE_STATUSES)[number];

/** Type for base message size values */
export type BaseMessageSize = (typeof BASE_MESSAGE_SIZES)[number];

export interface BaseMessageProps {
  /** Message title */
  title?: string;
  /** Message content */
  message?: string | React.ReactElement;
  /** Message visual status */
  status?: BaseMessageStatus;
  /** Message size */
  size?: BaseMessageSize;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Action buttons */
  actions?: React.ReactNode;
  /** Show status tag */
  showStatusTag?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Callback on close */
  onClose?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export function BaseMessage({
  title,
  message,
  status,
  size = "medium",
  icon,
  actions,
  showStatusTag = false,
  fullWidth = false,
  onClose,
  className,
}: BaseMessageProps): React.ReactElement {
  return (
    <div className={cn("w-full", className)}>
      <DSRBaseMessage
        title={title}
        message={message}
        status={status}
        size={size}
        renderIcon={icon}
        renderButtons={actions}
        withStatusTag={showStatusTag}
        isFullWidth={fullWidth}
        onClose={onClose}
      />
    </div>
  );
}

BaseMessage.displayName = "BaseMessage";
