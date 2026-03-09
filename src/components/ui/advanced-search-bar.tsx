/**
 * @fileoverview AdvancedSearchBar wrapper for DSR
 *
 * @description
 * Advanced search bar with multiple filter fields.
 * Allows creating complex filters with operators.
 *
 * @when_to_use
 * - Advanced filters in tables
 * - Search with multiple criteria
 * - Complex filtering panels
 *
 * @example
 * ```tsx
 * <AdvancedSearchBar
 *   config={{
 *     searchFields: [
 *       { label: 'Name', value: { key: 'name', field: 'name' }, type: 'contains' },
 *       { label: 'Email', value: { key: 'email', field: 'email' }, type: 'contains' }
 *     ],
 *     operators: {
 *       contains: { options: ['contains', 'does not contain'], inputType: 'text' },
 *       is: { options: ['is', 'is not'], inputType: 'text' }
 *     }
 *   }}
 *   onChange={(filters) => setFilters(filters)}
 *   label="Search"
 * />
 * ```
 */
import * as React from 'react';
import { AdvancedSearchBar as DSRAdvancedSearchBar } from '@adsmurai/design-system-react';

/**
 * Available sizes for AdvancedSearchBar.
 * - `small`: Compact size for tight spaces
 * - `medium`: Default balanced size
 * - `large`: Larger size for prominent placement
 */
export const ADVANCED_SEARCH_BAR_SIZES = ['small', 'medium', 'large'] as const;

/** Type for advanced search bar size values */
export type AdvancedSearchBarSize = (typeof ADVANCED_SEARCH_BAR_SIZES)[number];

export interface SearchFilterCondition {
  /** Unique identifier for the filter */
  key: string;
  /** Field to filter */
  field: string;
  /** Operator (e.g.: 'contains', 'is') */
  operator?: string;
  /** Filter value */
  value?: string;
}

export interface SearchField {
  /** Visible label for the field */
  label: string;
  /** Filter condition */
  value: SearchFilterCondition;
  /** Operator type */
  type: 'contains' | 'is' | string;
}

export interface SearchOperator {
  /** Operator options (e.g.: ['contains', 'does not contain']) */
  options: string[];
  /** Input type */
  inputType: 'text' | string;
}

export interface AdvancedSearchConfig {
  /** Available fields for filtering */
  searchFields: SearchField[];
  /** Operators configuration */
  operators: Record<string, SearchOperator>;
}

export interface AdvancedSearchBarProps {
  /** Fields and operators configuration */
  config: AdvancedSearchConfig;
  /** Callback when filters change */
  onChange: (values: SearchField[]) => void;
  /** Default values */
  defaultValues?: SearchField[];
  /** Component label */
  label?: string;
  /** Helper text */
  helper?: string;
  /** Size of the search bar */
  size?: AdvancedSearchBarSize;
}

/**
 * AdvancedSearchBar component - DSR wrapper
 */
export const AdvancedSearchBar: React.FC<AdvancedSearchBarProps> = ({
  config,
  onChange,
  defaultValues,
  label,
  helper,
  size = 'medium',
}) => {
  return (
    <DSRAdvancedSearchBar
      config={config}
      onChangeValue={onChange}
      defaultValues={defaultValues}
      label={label}
      helper={helper}
      size={size}
    />
  );
};

AdvancedSearchBar.displayName = 'AdvancedSearchBar';

export default AdvancedSearchBar;
