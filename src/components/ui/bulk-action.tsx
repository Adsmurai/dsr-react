/**
 * @fileoverview BulkAction wrapper - HTML fallback
 *
 * @description
 * Bulk action bar for selected items.
 * Uses HTML/Tailwind as fallback because DSR BulkAction has
 * a complex API with specific return types (ActionResponse).
 *
 * @when_to_use
 * - Bulk actions on tables
 * - Operations on multiple selected items
 * - Bulk delete, export, etc.
 *
 * @example
 * ```tsx
 * <BulkAction
 *   visible={selectedItems.length > 0}
 *   selectedCount={selectedItems.length}
 *   actions={[
 *     { label: 'Delete', onClick: handleDelete, variant: 'destructive' },
 *     { label: 'Export', onClick: handleExport }
 *   ]}
 *   onSelectAll={selectAll}
 *   onDeselectAll={clearSelection}
 * />
 * ```
 */
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Icon as DSRIcon, IconsEnum } from '@adsmurai/design-system-react';

export interface BulkActionItem {
  /** Action label */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Button variant */
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost';
  /** Whether it is disabled */
  disabled?: boolean;
}

export interface BulkActionProps {
  /** Whether the bar is visible */
  visible?: boolean;
  /** Number of selected items */
  selectedCount?: number;
  /** Custom text (overrides the counter) */
  label?: string;
  /** Available actions */
  actions?: BulkActionItem[];
  /** Callback when selecting all */
  onSelectAll?: () => void;
  /** Callback when deselecting all */
  onDeselectAll?: () => void;
  /** Whether all items are selected */
  allSelected?: boolean;
  /** Hide "Select all" button */
  hideSelectAll?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * BulkAction component - HTML fallback
 */
export const BulkAction: React.FC<BulkActionProps> = ({
  visible = false,
  selectedCount = 0,
  label,
  actions = [],
  onSelectAll,
  onDeselectAll,
  allSelected = false,
  hideSelectAll = false,
  className,
}) => {
  if (!visible) return null;

  const displayLabel = label || `${selectedCount} elemento${selectedCount !== 1 ? 's' : ''} seleccionado${selectedCount !== 1 ? 's' : ''}`;

  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
        "bg-background border border-border rounded-lg shadow-lg",
        "flex items-center gap-3 px-4 py-3",
        "animate-in slide-in-from-bottom-4 duration-200",
        className
      )}
    >
      {/* Selection counter */}
      <span className="text-sm font-medium text-foreground whitespace-nowrap">
        {displayLabel}
      </span>

      {/* Separator */}
      <div className="w-px h-6 bg-border" />

      {/* Selection buttons */}
      {!hideSelectAll && (
        <div className="flex items-center gap-2">
          {!allSelected && onSelectAll && (
            <button
              type="button"
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              onClick={onSelectAll}
            >
              Seleccionar todos
            </button>
          )}
          {onDeselectAll && (
            <button
              type="button"
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors flex items-center gap-1"
              onClick={onDeselectAll}
            >
              <DSRIcon size="small">{IconsEnum.Close}</DSRIcon>
              <span>Deseleccionar</span>
            </button>
          )}
        </div>
      )}

      {/* Separator */}
      {!hideSelectAll && actions.length > 0 && (
        <div className="w-px h-6 bg-border" />
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        {actions.map((action, index) => {
          const isDestructive = action.variant === 'destructive';
          return (
            <button
              key={index}
              type="button"
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                isDestructive 
                  ? "text-destructive hover:bg-destructive/10 border border-destructive" 
                  : "text-primary hover:bg-primary/10 border border-primary",
                action.disabled && "opacity-50 cursor-not-allowed"
              )}
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

BulkAction.displayName = 'BulkAction';

export default BulkAction;
