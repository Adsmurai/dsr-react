/**
 * @fileoverview Pagination wrapper component for DSR Pagination
 *
 * @description
 * DSR Pagination requires a 'state' object with specific structure
 * and uses 'onChangePage' handler. This wrapper simplifies the API.
 *
 * @when_to_use
 * - Navigation between data pages
 * - Paginated lists
 * - Tables with many records
 *
 * @when_not_to_use
 * - For navigation between sections → use Tabs
 * - For process steps → use Stepper
 *
 * @example
 * ```tsx
 * // Basic
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={(page) => setPage(page)}
 * />
 *
 * // With page size selector
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   pageSize={20}
 *   totalItems={200}
 *   onPageChange={setPage}
 *   onPageSizeChange={setPageSize}
 *   pageSizeOptions={[10, 20, 50, 100]}
 * />
 *
 * // Compact (for reduced spaces)
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={setPage}
 *   isCompact
 * />
 *
 * // Without number buttons (only prev/next)
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={setPage}
 *   hideNumberButtons
 * />
 *
 * // Grid mode (for galleries)
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={setPage}
 *   isGrid
 * />
 * ```
 */
import * as React from 'react';
import { Pagination as DSRPagination } from '@adsmurai/design-system-react';
import { cn } from '@/lib/utils';

export interface PaginationProps {
  /** Current page (1-indexed for API compatibility) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Items per page */
  pageSize?: number;
  /** Total number of items */
  totalItems?: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Callback when page size changes - shows selector if provided */
  onPageSizeChange?: (pageSize: number) => void;
  /** Page size options for the selector */
  pageSizeOptions?: number[];
  /** Hide number buttons (only prev/next) */
  hideNumberButtons?: boolean;
  /** Grid mode (for galleries) */
  isGrid?: boolean;
  /** Compact mode */
  isCompact?: boolean;
  /** data-qa attribute for testing */
  dataQa?: string;
  /** Optional className */
  className?: string;
}

/**
 * Pagination component - wrapper for DSR Pagination
 * 
 * DSR Pagination uses 'state' object with:
 * - pageCount: total pages
 * - pageIndex: 0-indexed current page
 * - pageSize: items per page
 * - pageTotal: total items
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize = 10,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions,
  hideNumberButtons,
  isGrid,
  isCompact,
  dataQa,
  className,
}) => {
  // Convert to DSR format (0-indexed)
  const state = {
    pageCount: totalPages,
    pageIndex: currentPage - 1, // DSR uses 0-indexed
    pageSize: pageSize,
    pageTotal: totalItems || totalPages * pageSize,
  };

  const handleChangePage = (pageIndex: number) => {
    // Convert back to 1-indexed for external API
    onPageChange(pageIndex + 1);
  };

  // Items per page config
  const itemsPerPage = pageSizeOptions ? {
    list: pageSizeOptions,
    grid: pageSizeOptions,
  } : undefined;

  return (
    <div className={cn('flex justify-center', className)}>
      <DSRPagination 
        state={state} 
        onChangePage={handleChangePage}
        setPageSize={onPageSizeChange}
        hideNumberButtons={hideNumberButtons}
        isGrid={isGrid}
        isCompact={isCompact}
        itemsPerPage={itemsPerPage}
        dataQa={dataQa}
      />
    </div>
  );
};

Pagination.displayName = 'Pagination';

// ============= Legacy Shadcn-style exports for compatibility =============
// These can be used for custom pagination UIs

export type PaginationContentProps = React.HTMLAttributes<HTMLUListElement>;

const PaginationContent = React.forwardRef<HTMLUListElement, PaginationContentProps>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
  )
);
PaginationContent.displayName = 'PaginationContent';

export type PaginationItemProps = React.HTMLAttributes<HTMLLIElement>;

const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props} />
  )
);
PaginationItem.displayName = 'PaginationItem';

export {
  PaginationContent,
  PaginationItem,
};
