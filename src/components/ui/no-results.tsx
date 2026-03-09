/**
 * @fileoverview NoResults wrapper for DSR
 *
 * @description
 * Component to display no results state in searches/filters.
 *
 * @when_to_use
 * - Search with no results
 * - Filters with no matches
 * - Empty lists due to search
 *
 * @example
 * ```tsx
 * <NoResults
 *   title="No results"
 *   message="No items found matching your search"
 *   action={<Button label="Clear filters" onClick={clearFilters} />}
 * />
 * ```
 */
import * as React from 'react';
import { NoResults as DSRNoResults } from '@adsmurai/design-system-react';

export interface NoResultsProps {
  /** Title for the empty state */
  title: string;
  /** Descriptive message */
  message: string;
  /** Optional button or action */
  action?: React.ReactNode;
}

/**
 * NoResults component - DSR wrapper
 */
export const NoResults: React.FC<NoResultsProps> = ({
  title,
  message,
  action,
}) => {
  return (
    <DSRNoResults
      title={title}
      renderButton={action}
    >
      {message}
    </DSRNoResults>
  );
};

NoResults.displayName = 'NoResults';

export default NoResults;
