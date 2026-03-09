/**
 * @fileoverview EventList wrapper for DSR EventList component
 *
 * @description
 * Wrapper that adapts DSR EventList for selectable/draggable item lists.
 * Ideal for event lists, tasks, or sortable items.
 *
 * @example
 * // Basic list
 * const items = [{ id: '1', title: 'Item 1' }, { id: '2', title: 'Item 2' }];
 * <EventList
 *   items={items}
 *   renderItem={(item) => <span>{item.title}</span>}
 * />
 *
 * @example
 * // Draggable and selectable list
 * <EventList
 *   items={items}
 *   renderItem={(item) => <span>{item.title}</span>}
 *   draggable
 *   selectable
 *   onReorder={(newItems) => setItems(newItems)}
 *   onSelect={(item, index) => console.log('Selected:', item)}
 * />
 */
import * as React from "react";
import {
  EventList as DSREventList,
  EventListPositionSelectedEnum
} from "@adsmurai/design-system-react";
import { cn } from "@/lib/utils";

/**
 * Available selection indicator positions for EventList.
 * - `start`: Selection indicator at the beginning
 * - `end`: Selection indicator at the end
 */
export const EVENT_LIST_SELECTION_POSITIONS = ['start', 'end'] as const;

/** Type for event list selection position values */
export type EventListSelectionPosition = (typeof EVENT_LIST_SELECTION_POSITIONS)[number];

export interface EventListItem {
  id: string;
  [key: string]: unknown;
}

export interface EventListProps<T extends EventListItem> {
  /** Items to display */
  items: T[];
  /** Function to render each item */
  renderItem: (item: T) => React.ReactNode;
  /** Whether items are draggable */
  draggable?: boolean;
  /** Whether items are selectable */
  selectable?: boolean;
  /** Selection indicator position */
  selectionPosition?: EventListSelectionPosition;
  /** Externally selected item index */
  selectedIndex?: number;
  /** Callback when reordering */
  onReorder?: (items: T[], sourceIndex: number, destIndex: number) => void;
  /** Callback when an item is selected */
  onSelect?: (item: T, index: number) => void;
  /** Hide drag icon */
  hideDragIcon?: boolean;
  /** Disable background color on hover */
  noHoverBackground?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function EventList<T extends EventListItem>({
  items,
  renderItem,
  draggable = false,
  selectable = false,
  selectionPosition = "start",
  selectedIndex,
  onReorder,
  onSelect,
  hideDragIcon = false,
  noHoverBackground = false,
  className,
}: EventListProps<T>): React.ReactElement {
  // Map items for DSR (requires id)
  const itemsValues = items.map((item) => ({
    ...item,
    id: item.id,
  }));

  // Component that renders each item
  const itemComponent = (props: T) => {
    return <>{renderItem(props)}</>;
  };

  return (
    <div className={cn("w-full", className)}>
      <DSREventList
        itemsValues={itemsValues}
        itemComponent={itemComponent}
        isDraggable={draggable}
        isSelectable={selectable}
        defaultPositionSelected={
          selectionPosition === "start" 
            ? EventListPositionSelectedEnum.START 
            : EventListPositionSelectedEnum.END
        }
        externalSelection={selectedIndex}
        onResponseDragEnd={onReorder}
        onResponseClickItem={onSelect}
        shouldHideDragIcon={hideDragIcon}
        hasBackgroundColorOnHoverDisabled={noHoverBackground}
      />
    </div>
  );
}
EventList.displayName = "EventList";

// Re-export enum for convenience
export { EventListPositionSelectedEnum };
