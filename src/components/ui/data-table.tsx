/**
 * @fileoverview DataTable wrapper for DSR TableV2
 *
 * @description
 * Complete wrapper that exposes all DSR TableV2 functionalities.
 * TableV2 internally uses MUI DataGrid Pro.
 *
 * @ai-note CRITICAL: Each row object in the `data` array MUST have an `id` field.
 * The `id` is used for selection, sorting, and internal row identification.
 * Column definitions use the MUI DataGrid Pro format.
 *
 * @features
 * - Pagination (client & server side)
 * - Sorting (client & server side)
 * - Filtering (quick filter & column filters)
 * - Selection (checkbox & radio)
 * - Expandable rows
 * - Pinned columns/rows
 * - Bulk actions
 * - CSV Export
 * - Configurable empty state
 * - Top bar with title and actions
 *
 * @when_to_use
 * - Display tabular data with any advanced functionality
 * - Tables with selection, sorting, pagination
 * - Data lists with bulk actions
 * - Tables with expandable rows
 *
 * @when_not_to_use
 * - For simple lists without interaction → use List
 * - For non-tabular data → use Cards
 *
 * @example
 * ```tsx
 * // CORRECT - Each row has an `id` field
 * <DataTable
 *   columns={[
 *     { field: 'id', headerName: 'ID', width: 80 },
 *     { field: 'name', headerName: 'Name', flex: 1 }
 *   ]}
 *   data={[
 *     { id: 1, name: 'Item 1' },
 *     { id: 2, name: 'Item 2' }
 *   ]}
 * />
 *
 * // WRONG - Missing id field will cause errors
 * <DataTable
 *   data={[{ name: 'Item 1' }]}  // DON'T DO THIS - no id!
 * />
 *
 * // With pagination and selection
 * <DataTable
 *   columns={columns}
 *   data={items}
 *   enablePagination
 *   pageSizeOptions={[10, 20, 50]}
 *   enableSelection
 *   onSelectChange={(ids) => setSelected(ids)}
 *   enableSorting
 * />
 *
 * // With bulk actions
 * <DataTable
 *   columns={columns}
 *   data={items}
 *   enableSelection
 *   getBulkActionsFromItems={(selectedItems) => [
 *     {
 *       id: 'delete',
 *       label: 'Delete',
 *       level: 'error',
 *       action: async () => ({ type: 'success', message: 'Deleted!' })
 *     }
 *   ]}
 * />
 * ```
 */
import * as React from "react";
import { 
  TableV2, 
  TableVariantEnum, 
  TableSelectionTypeEnum,
  TableRowSizeEnum,
} from "@adsmurai/design-system-react";
import type { 
  ExtendedGridColDef,
  TableProps as DSRTableProps,
  Action,
  ActionResponse,
  GridRowId,
  GridSortModel,
  GridFilterModel,
  GridRowParams,
  GridPinnedColumnFields,
  GridValidRowModel,
} from "@adsmurai/design-system-react";
import type { 
  GridRowsProp, 
  GridRowSelectionModel,
  GridRowModel,
  GridCsvExportOptions,
} from "@mui/x-data-grid-pro";

// Re-export types for convenience
export type {
  GridRowsProp,
  GridRowSelectionModel,
  GridRowId,
  GridSortModel,
  GridFilterModel,
  GridRowParams,
  GridPinnedColumnFields,
  GridRowModel,
  ExtendedGridColDef,
  Action as DataTableBulkAction,
  ActionResponse as DataTableActionResponse,
};

/**
 * Available visual variants for DataTable.
 * - `primary`: Default style with primary color accents
 * - `secondary`: Alternative style with secondary colors
 * - `grid`: Grid-focused style for data-heavy displays
 */
export const DATA_TABLE_VARIANTS = ['primary', 'secondary', 'grid'] as const;

/**
 * Available row height presets for DataTable.
 * - `small`: Compact rows for dense data
 * - `medium`: Default balanced height
 * - `large`: Spacious rows for better readability
 */
export const DATA_TABLE_ROW_HEIGHTS = ['small', 'medium', 'large'] as const;

/** Type for DataTable variant values */
export type DataTableVariant = (typeof DATA_TABLE_VARIANTS)[number];

/** Type for DataTable row height values */
export type DataTableRowHeight = (typeof DATA_TABLE_ROW_HEIGHTS)[number];

/** Ref methods exposed by DataTable */
export interface DataTableRef {
  /** Export data to CSV */
  exportDataAsCsv: (options?: GridCsvExportOptions) => void;
}

export interface DataTableProps {
  // ============ CORE ============
  /** Column definitions */
  columns: ExtendedGridColDef[];
  /** Row data (each object must have `id` unless getRowId is provided) */
  data: GridRowsProp;
  /** Visual variant */
  variant?: DataTableVariant;
  /** Row height preset */
  rowHeight?: DataTableRowHeight;
  /** Loading state (shows skeleton) */
  loading?: boolean;
  /** Container height */
  height?: number | string;
  /** Container style props */
  containerStyleProps?: React.CSSProperties;

  // ============ PAGINATION ============
  /** Enable pagination */
  enablePagination?: boolean;
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Current page (0-indexed, controlled) */
  currentPage?: number;
  /** Initial page (0-indexed, uncontrolled) */
  initialPage?: number;
  /** Total row count (required for server mode) */
  rowCount?: number;
  /** Page change callback */
  onPageChange?: (page: number) => void;
  /** Page size change callback */
  onPageSizeChange?: (pageSize: number) => void;
  /** Hide footer pagination (use with enableTopBarPagination) */
  hideBottomPagination?: boolean;

  // ============ SELECTION ============
  /** Enable row selection */
  enableSelection?: boolean;
  /** Selection type */
  selectionType?: "checkbox" | "radio";
  /** Controlled selection state */
  rowSelectionModel?: GridRowSelectionModel;
  /** Selection change callback */
  onSelectChange?: (ids: GridRowId[]) => void;
  /** Filter which rows can be selected */
  isRowSelectable?: (params: GridRowParams) => boolean;
  /** Hide "select all" checkbox in header */
  hideSelectAll?: boolean;
  /** Only select visible rows (not all pages) */
  checkboxSelectionVisibleOnly?: boolean;

  // ============ SORTING ============
  /** Enable column sorting */
  enableSorting?: boolean;
  /** Controlled sort model */
  sortModel?: GridSortModel;
  /** Initial sort model (uncontrolled) */
  initialSortModel?: GridSortModel;
  /** Sort model change callback */
  onSortModelChange?: (model: GridSortModel) => void;

  // ============ FILTERING ============
  /** Enable column filters */
  enableColumnFilter?: boolean;
  /** Enable multiple column filtering */
  enableMultipleColumnsFiltering?: boolean;
  /** Controlled filter model */
  filterModel?: GridFilterModel;
  /** Default filter model */
  defaultFilterModel?: GridFilterModel;
  /** Quick filter text (search across columns) */
  filterText?: string;
  /** Filter model change callback */
  onFilterModelChange?: (model: GridFilterModel) => void;
  /** Filter input debounce delay (ms) */
  filterDebounceMs?: number;
  /** Default filter operator */
  defaultFilterOperator?: "contains" | "equals";
  /** Enable quick filter search bar in top bar */
  enableQuickFilter?: boolean;
  /** Placeholder text for quick filter input */
  quickFilterPlaceholder?: string;
  /** Callback when quick filter text changes */
  onQuickFilterChange?: (text: string) => void;

  // ============ EXPANDABLE ROWS ============
  /**
   * Render function for expanded row detail panel.
   *
   * @param params - Row parameters containing:
   *   - `row`: The row data object (your data type)
   *   - `id`: The row ID (GridRowId)
   *   - `columns`: Column definitions
   *   - `getValue`: Function to get cell value by field name
   *
   * @returns ReactNode to render in the expanded panel
   *
   * @example
   * ```tsx
   * <DataTable
   *   columns={columns}
   *   data={users}
   *   getDetailPanelContent={({ row }) => (
   *     <div className="p-4">
   *       <h3>Details for {row.name}</h3>
   *       <p>Email: {row.email}</p>
   *       <p>Created: {row.createdAt}</p>
   *     </div>
   *   )}
   * />
   * ```
   */
  getDetailPanelContent?: (params: GridRowParams) => React.ReactNode;
  /**
   * Height of detail panel.
   * @param params - Same as getDetailPanelContent
   * @returns Number (pixels) or 'auto' for dynamic height
   */
  getDetailPanelHeight?: (params: GridRowParams) => number | 'auto';
  /** Controlled expanded row IDs */
  detailPanelExpandedRowIds?: GridRowId[];
  /** Expansion change callback */
  onDetailPanelExpandedRowIdsChange?: (ids: GridRowId[]) => void;

  // ============ PINNED COLUMNS/ROWS ============
  /** Pinned columns configuration */
  pinnedColumns?: GridPinnedColumnFields;
  /** Initial pinned columns (uncontrolled) */
  initialPinnedColumns?: GridPinnedColumnFields;
  /** Pinned columns change callback */
  onPinnedColumnsChange?: (fields: GridPinnedColumnFields) => void;
  /** Disable column pinning */
  disableColumnPinning?: boolean;
  /** Pinned rows (top/bottom) */
  pinnedRows?: { top?: GridRowsProp; bottom?: GridRowsProp };
  /** Footer row data */
  footer?: GridRowModel;

  // ============ TOP BAR ============
  /** Top bar title */
  title?: string;
  /** Top bar subtitle */
  subtitle?: string;
  /** Show pagination in top bar */
  enableTopBarPagination?: boolean;
  /** Custom left component in top bar */
  leftComponent?: React.ReactNode;
  /** Custom right component in top bar */
  rightComponent?: React.ReactNode;

  // ============ BULK ACTIONS ============
  /**
   * Generate bulk actions based on selected items.
   * Called whenever selection changes to dynamically generate available actions.
   *
   * @param items - Array of selected row data objects
   * @returns Array of Action objects with:
   *   - `id`: Unique action identifier
   *   - `label`: Display text
   *   - `level`: 'default' | 'error' (for destructive actions)
   *   - `action`: Async function that returns ActionResponse
   *
   * @example
   * ```tsx
   * <DataTable
   *   columns={columns}
   *   data={items}
   *   enableSelection
   *   getBulkActionsFromItems={(selectedItems) => [
   *     {
   *       id: 'export',
   *       label: `Export ${selectedItems.length} items`,
   *       level: 'default',
   *       action: async () => {
   *         await exportItems(selectedItems);
   *         return { type: 'success', message: 'Exported!' };
   *       }
   *     },
   *     {
   *       id: 'delete',
   *       label: 'Delete selected',
   *       level: 'error',
   *       action: async () => {
   *         await deleteItems(selectedItems.map(i => i.id));
   *         return { type: 'success', message: 'Deleted!' };
   *       }
   *     }
   *   ]}
   * />
   * ```
   */
  getBulkActionsFromItems?: (items: GridValidRowModel[]) => Action[];
  /**
   * Callback when a bulk action completes.
   * @param id - The action ID that was executed
   * @param response - The ActionResponse returned by the action
   */
  onResponseBulkAction?: (id: string, response?: ActionResponse | ActionResponse[]) => void;
  /** Bulk action bar placement: 'top' or 'bottom' */
  bulkActionPlacement?: 'top' | 'bottom';

  // ============ EXPORT ============
  /** Show export button */
  enableExport?: boolean;

  // ============ EMPTY STATE ============
  /** Empty state title */
  emptyTitle?: string;
  /** Empty state subtitle */
  emptySubtitle?: string;
  /** Empty state CTA button text */
  emptyCtaText?: string;
  /** Empty state CTA callback */
  onEmptyRefresh?: () => void;

  // ============ SERVER MODE ============
  /** Enable server-side data handling */
  enableServerMode?: boolean;

  // ============ COLUMN FEATURES ============
  /** Disable column menu */
  disableColumnMenu?: boolean;
  /** Disable column selector */
  disableColumnSelector?: boolean;
  /** Disable column reorder */
  disableColumnReorder?: boolean;
  /** Column visibility model */
  columnVisibilityModel?: Record<string, boolean>;
  /** Column visibility change callback */
  onColumnVisibilityModelChange?: (model: Record<string, boolean>) => void;
  /** Column order change callback */
  onColumnOrderChange?: (params: any) => void;
  /** Column resize callback */
  onColumnResize?: (params: any) => void;
  /** Hide table header */
  isHeaderHidden?: boolean;
  /** Disable row selection on click (default: true) */
  disableRowSelectionOnClick?: boolean;
  /** Enable row reordering */
  rowReordering?: boolean;

  // ============ REF ============
  /** Ref for accessing table methods (export, etc.) */
  tableRef?: React.Ref<DataTableRef>;
}

/**
 * DataTable component - Full wrapper for DSR TableV2
 * Exposes all TableV2 functionalities with a clean API.
 */
const DataTable = React.forwardRef<DataTableRef, DataTableProps>(({
  // Core
  columns,
  data,
  variant = "primary",
  rowHeight = "medium",
  loading = false,
  height,
  containerStyleProps,

  // Pagination
  enablePagination = false,
  pageSizeOptions = [20],
  currentPage,
  initialPage = 0,
  rowCount,
  onPageChange,
  onPageSizeChange,
  hideBottomPagination = false,

  // Selection
  enableSelection = false,
  selectionType = "checkbox",
  rowSelectionModel,
  onSelectChange,
  isRowSelectable,
  hideSelectAll = false,
  checkboxSelectionVisibleOnly = false,

  // Sorting
  enableSorting = false,
  sortModel,
  initialSortModel,
  onSortModelChange,

  // Filtering
  enableColumnFilter = false,
  enableMultipleColumnsFiltering = false,
  filterModel,
  defaultFilterModel,
  filterText,
  onFilterModelChange,
  filterDebounceMs,
  defaultFilterOperator = "contains",
  enableQuickFilter = false,
  quickFilterPlaceholder,
  onQuickFilterChange,

  // Expandable
  getDetailPanelContent,
  getDetailPanelHeight,
  detailPanelExpandedRowIds,
  onDetailPanelExpandedRowIdsChange,

  // Pinned
  pinnedColumns,
  initialPinnedColumns,
  onPinnedColumnsChange,
  disableColumnPinning = false,
  pinnedRows,
  footer,

  // Top bar
  title,
  subtitle,
  enableTopBarPagination = false,
  leftComponent,
  rightComponent,

  // Bulk actions
  getBulkActionsFromItems,
  onResponseBulkAction,
  bulkActionPlacement = 'top',

  // Export
  enableExport = false,

  // Empty state
  emptyTitle = "No data available",
  emptySubtitle,
  emptyCtaText,
  onEmptyRefresh,

  // Server mode
  enableServerMode = false,

  // Column features
  disableColumnMenu = true,
  disableColumnSelector = true,
  disableColumnReorder = false,
  columnVisibilityModel,
  onColumnVisibilityModelChange,
  onColumnOrderChange,
  onColumnResize,
  isHeaderHidden = false,
  disableRowSelectionOnClick = true,
  rowReordering = false,

  // Ref
  tableRef,
}, ref) => {
  // Internal ref for TableV2
  const internalRef = React.useRef<any>(null);

  // Expose methods via ref
  React.useImperativeHandle(ref, () => ({
    exportDataAsCsv: (options?: GridCsvExportOptions) => {
      internalRef.current?.exportDataAsCsv(options);
    },
  }));

  // Also support tableRef prop
  React.useImperativeHandle(tableRef, () => ({
    exportDataAsCsv: (options?: GridCsvExportOptions) => {
      internalRef.current?.exportDataAsCsv(options);
    },
  }));

  // Map variant to enum
  const variantMap: Record<string, TableVariantEnum> = {
    primary: TableVariantEnum.Primary,
    secondary: TableVariantEnum.Secondary,
    grid: TableVariantEnum.Grid,
  };

  // Map row height to enum
  const rowHeightMap: Record<string, TableRowSizeEnum> = {
    small: TableRowSizeEnum.Small,
    medium: TableRowSizeEnum.Medium,
    large: TableRowSizeEnum.Large,
  };

  // Map selection type to enum
  const selectionTypeMap: Record<string, TableSelectionTypeEnum> = {
    checkbox: TableSelectionTypeEnum.Checkbox,
    radio: TableSelectionTypeEnum.Radio,
  };

  // Note: defaultFilterOperator prop is available but the enum
  // DataGridFilterOperatorEnum is not exported by DSR 9.93.x
  // Filter operators are handled internally by TableV2

  // Build empty state props
  const emptyStateProps = React.useMemo(() => {
    if (!emptyTitle && !emptySubtitle && !emptyCtaText) return undefined;
    return {
      title: emptyTitle,
      subtitle: emptySubtitle,
      ctaText: emptyCtaText,
      refresh: onEmptyRefresh,
    };
  }, [emptyTitle, emptySubtitle, emptyCtaText, onEmptyRefresh]);

  // Build top bar props
  const topBarProps = React.useMemo(() => {
    if (!title && !subtitle && !leftComponent && !rightComponent && !enableTopBarPagination && !enableQuickFilter) {
      return undefined;
    }
    const props: any = {
      title,
      subtitle,
      leftComponent,
      rightComponent,
      enableTopBarPagination,
    };
    if (enableQuickFilter) {
      props.enableQuickFilter = true;
      if (quickFilterPlaceholder) props.quickFilterPlaceholder = quickFilterPlaceholder;
      if (onQuickFilterChange) props.onQuickFilterChange = onQuickFilterChange;
    }
    return props;
  }, [title, subtitle, leftComponent, rightComponent, enableTopBarPagination, enableQuickFilter, quickFilterPlaceholder, onQuickFilterChange]);

  // Container styles
  const containerStyles: React.CSSProperties = {
    width: "100%",
    ...(height ? { height } : {}),
    ...containerStyleProps,
  };

  return (
    <div style={containerStyles}>
      <TableV2
        ref={internalRef}
        // Core
        columns={columns}
        data={data}
        variant={variantMap[variant]}
        rowHeight={rowHeightMap[rowHeight]}
        loading={loading}
        containerStyleProps={containerStyleProps}

        // Pagination
        enablePagination={enablePagination}
        pageSizeOptions={pageSizeOptions}
        currentPage={currentPage}
        initialPage={initialPage}
        rowCount={rowCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        hideBottomPagination={hideBottomPagination}

        // Selection
        enableSelection={enableSelection}
        selectionType={enableSelection ? selectionTypeMap[selectionType] : undefined}
        rowSelectionModel={rowSelectionModel}
        onSelectChange={onSelectChange}
        isRowSelectable={isRowSelectable}
        hideSelectAll={hideSelectAll}
        checkboxSelectionVisibleOnly={checkboxSelectionVisibleOnly}

        // Sorting
        enableSorting={enableSorting}
        sortModel={sortModel}
        initialSortModel={initialSortModel}
        onSortModelChange={onSortModelChange}

        // Filtering
        disableColumnFilter={!enableColumnFilter}
        enableMultipleColumnsFiltering={enableMultipleColumnsFiltering}
        filterModel={filterModel}
        defaultFilterModel={defaultFilterModel}
        filterText={filterText}
        onFilterModelChange={onFilterModelChange}
        filterDebounceMs={filterDebounceMs}

        // Expandable
        getDetailPanelContent={getDetailPanelContent}
        getDetailPanelHeight={getDetailPanelHeight}
        detailPanelExpandedRowIds={detailPanelExpandedRowIds}
        onDetailPanelExpandedRowIdsChange={onDetailPanelExpandedRowIdsChange}

        // Pinned
        pinnedColumns={pinnedColumns}
        initialPinnedColumns={initialPinnedColumns}
        onPinnedColumnsChange={onPinnedColumnsChange}
        disableColumnPinning={disableColumnPinning}
        pinnedRows={pinnedRows}
        footer={footer}

        // Top bar
        topBar={topBarProps}

        // Bulk actions
        getBulkActionsFromItems={getBulkActionsFromItems}
        onResponseBulkAction={onResponseBulkAction}
        bulkActionPlacement={bulkActionPlacement}

        // Export
        enableExport={enableExport}

        // Empty state
        emptyState={emptyStateProps}

        // Server mode
        enableServerMode={enableServerMode}

        // Column features
        disableColumnMenu={disableColumnMenu}
        disableColumnSelector={disableColumnSelector}
        disableColumnReorder={disableColumnReorder}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={onColumnVisibilityModelChange}
        onColumnOrderChange={onColumnOrderChange}
        onColumnResize={onColumnResize}
        isHeaderHidden={isHeaderHidden}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        rowReordering={rowReordering}
      />
    </div>
  );
});

DataTable.displayName = "DataTable";

export { DataTable };
