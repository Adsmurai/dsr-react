/**
 * @fileoverview TreeView wrapper for DSR TreeView component
 *
 * @description
 * Wrapper that adapts DSR TreeView for hierarchical structures.
 * Based on MUI x-tree-view.
 *
 * @example
 * // Basic tree
 * const items = [
 *   {
 *     id: '1',
 *     label: 'Folder 1',
 *     children: [
 *       { id: '1-1', label: 'File 1.1' },
 *       { id: '1-2', label: 'File 1.2' },
 *     ]
 *   },
 *   { id: '2', label: 'Folder 2' }
 * ];
 * <TreeView items={items} />
 *
 * @example
 * // With custom icons
 * const items = [
 *   {
 *     id: '1',
 *     label: 'Documents',
 *     icon: <Icon>{IconsEnum.Folder}</Icon>,
 *     iconExpanded: <Icon>{IconsEnum.FolderOpen}</Icon>,
 *     children: [...]
 *   }
 * ];
 * <TreeView items={items} defaultExpanded={['1']} />
 *
 * @example
 * // With selection
 * <TreeView
 *   items={items}
 *   multiSelect
 *   checkboxSelection
 *   selectedItems={selected}
 *   onSelectedItemsChange={(e, ids) => setSelected(ids)}
 * />
 */
import * as React from "react";
import { TreeView as DSRTreeView } from "@adsmurai/design-system-react";
import { cn } from "@/lib/utils";


export interface TreeViewItem {
  /** Unique item ID */
  id: string;
  /** Text to display */
  label?: string;
  /** Icon (when collapsed) */
  icon?: React.ReactNode;
  /** Icon when expanded */
  iconExpanded?: React.ReactNode;
  /** Additional content at the start */
  leadingContent?: React.ReactNode;
  /** Additional content at the end */
  trailingContent?: React.ReactNode;
  /** Child items */
  children?: TreeViewItem[];
}

export interface TreeViewProps {
  /** Tree items */
  items: TreeViewItem[];

  // Expansion props
  /** IDs of items expanded by default (uncontrolled) */
  defaultExpanded?: string[];
  /** IDs of expanded items (controlled) */
  expandedItems?: string[];
  /** Callback when expanded items change */
  onExpandedItemsChange?: (event: React.SyntheticEvent | null, itemIds: string[]) => void;

  // Selection props
  /** IDs of selected items (controlled). String for single, array for multi. */
  selectedItems?: string | string[];
  /** IDs of items selected by default (uncontrolled) */
  defaultSelectedItems?: string | string[];
  /** Callback when selection changes */
  onSelectedItemsChange?: (event: React.SyntheticEvent | null, itemIds: string | string[]) => void;
  /** Allow multiple selection */
  multiSelect?: boolean;
  /** Show checkboxes for selection */
  checkboxSelection?: boolean;
  /** Disable all selection */
  disableSelection?: boolean;

  /** Additional CSS classes */
  className?: string;
}

export const TreeView: React.FC<TreeViewProps> = ({
  items,
  // Expansion
  defaultExpanded,
  expandedItems,
  onExpandedItemsChange,
  // Selection
  selectedItems,
  defaultSelectedItems,
  onSelectedItemsChange,
  multiSelect = false,
  checkboxSelection = false,
  disableSelection = false,
  // Style
  className,
}) => {
  // Map items to DSR format
  const mapItems = (treeItems: TreeViewItem[]): any[] => {
    return treeItems.map((item) => ({
      id: item.id,
      label: item.label,
      icon: item.icon,
      iconExpanded: item.iconExpanded,
      leadingContent: item.leadingContent,
      trailingContent: item.trailingContent,
      children: item.children ? mapItems(item.children) : undefined,
    }));
  };

  // Build props object
  const dsrProps: any = {
    items: mapItems(items),
  };

  // Expansion props
  if (defaultExpanded !== undefined) {
    dsrProps.defaultExpandedItems = defaultExpanded;
  }
  if (expandedItems !== undefined) {
    dsrProps.expandedItems = expandedItems;
  }
  if (onExpandedItemsChange !== undefined) {
    dsrProps.onExpandedItemsChange = onExpandedItemsChange;
  }

  // Selection props
  if (selectedItems !== undefined) {
    dsrProps.selectedItems = selectedItems;
  }
  if (defaultSelectedItems !== undefined) {
    dsrProps.defaultSelectedItems = defaultSelectedItems;
  }
  if (onSelectedItemsChange !== undefined) {
    dsrProps.onSelectedItemsChange = onSelectedItemsChange;
  }
  if (multiSelect) {
    dsrProps.multiSelect = true;
  }
  if (checkboxSelection) {
    dsrProps.checkboxSelection = true;
  }
  if (disableSelection) {
    dsrProps.disableSelection = true;
  }

  return (
    <div className={cn("w-full", className)}>
      <DSRTreeView {...dsrProps} />
    </div>
  );
};
TreeView.displayName = "TreeView";
