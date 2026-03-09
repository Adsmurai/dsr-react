/**
 * @fileoverview Select components wrapper for DSR SelectV2 and SelectWithSearch
 *
 * @description
 * Wrappers that adapt DSR SelectV2 and SelectWithSearch to more standard React APIs.
 *
 * - **Select**: Uses DSR SelectV2 for short lists without search
 * - **SelectWithSearch**: Uses DSR SelectWithSearch for long lists with integrated search
 *
 * Radix composition components are also exported for advanced cases.
 *
 * @ai-note IMPORTANT: Select uses `options` array, NOT children.
 * Each option must be an object with `label` and `value` properties.
 * The `onValueChange` callback receives the value string, not the full option object.
 *
 * @when_to_use
 * - Select: Simple dropdowns with few options (<20)
 * - SelectWithSearch: Long lists, server-side search, autocomplete
 *
 * @when_not_to_use
 * - For very complex composition -> use the exported Radix components
 *
 * @example
 * ```tsx
 * // CORRECT - options array with label/value objects
 * <Select
 *   value={value}
 *   onValueChange={setValue}
 *   options={[
 *     { label: "Option 1", value: "opt1" },
 *     { label: "Option 2", value: "opt2" }
 *   ]}
 *   label="Select an option"
 * />
 *
 * // WRONG - children-based composition (use Radix components for this)
 * <Select>
 *   <SelectItem value="opt1">Option 1</SelectItem>  // DON'T DO THIS
 * </Select>
 *
 * // Select with search
 * <SelectWithSearch
 *   value={value}
 *   onValueChange={setValue}
 *   options={options}
 *   label="Search..."
 *   onSearch={(search) => fetchOptions(search)}
 * />
 *
 * // Multi-select
 * <Select
 *   isMulti
 *   value={selectedValues}
 *   onMultiValueChange={setSelectedValues}
 *   options={options}
 * />
 * ```
 */
import * as React from "react";
import { 
  SelectV2 as DSRSelectV2, 
  SelectWithSearch as DSRSelectWithSearch,
  type OptionDataType 
} from "@adsmurai/design-system-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Icon, IconsEnum } from "@adsmurai/design-system-react";

import { cn } from "@/lib/utils";

/**
 * Valid select size values.
 *
 * @example
 * ```tsx
 * <Select size="small" options={options} />
 * <Select size="large" options={options} />
 * ```
 */
export const SELECT_SIZES = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

// ============= OPTION TYPE =============
export interface SelectOption {
  label: string;
  value: string;
}

// Internal type for DSR
type DSROptionType = OptionDataType<string>;

// ============= SIMPLE SELECT (DSR SelectV2) =============
export interface SelectProps {
  /** Current value (string for single, string[] for multi) */
  value?: string | string[];
  /** Callback when value changes - receives string for single */
  onValueChange?: (value: string) => void;
  /** Alternative callback for multi-select - receives string[] */
  onMultiValueChange?: (values: string[]) => void;
  /** Array of options */
  options: SelectOption[];
  /** Field label */
  label?: string;
  /** Placeholder when nothing is selected (used as label if no label) */
  placeholder?: string;
  /** Helper text */
  helperText?: string;
  /** Whether it has error */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Whether it is disabled */
  disabled?: boolean;
  /** Whether selection can be cleared */
  clearable?: boolean;
  /** Whether it is loading */
  loading?: boolean;
  /** Select size: small (32px), medium (40px), large (48px) */
  size?: "small" | "medium" | "large";
  /** Enable multiple selection */
  isMulti?: boolean;
  /** Show checkboxes for multi-select options */
  checkBox?: boolean;
  /** Use rounded checkboxes */
  roundedCheckBox?: boolean;
  /** Show "Select All" option for multi-select */
  selectAllOptions?: boolean;
  /** Callback when "Select All" is clicked */
  onSelectAll?: () => void;
  /** Menu placement relative to trigger */
  menuPlacement?: "top" | "bottom" | "center";
  /** Maximum height of the dropdown list in pixels */
  maxListHeight?: number;
  /** Field name for forms */
  name?: string;
  /** Whether field is required */
  required?: boolean;
  /** data-qa attribute for testing */
  dataQa?: string;
  /** Additional CSS classes for the container */
  className?: string;
}

/**
 * Select component that internally uses DSR SelectV2.
 * For short lists without search needs.
 *
 * ## Sizes
 * | Size | Height | Font | Use |
 * |------|--------|------|-----|
 * | small (default) | 32px | 14px | Tables, dense lists |
 * | medium | 40px | 16px | Standard forms |
 * | large | 48px | 16px | Prominent forms |
 *
 * @example
 * ```tsx
 * // Simple
 * <Select value={value} onValueChange={setValue} options={options} label="Country" />
 *
 * // Multi-selection
 * <Select isMulti value={values} onValueChange={setValues} options={options} />
 *
 * // With search
 * <Select isSearchable options={options} label="Search country" />
 *
 * // With icon
 * <Select icon="Flag" options={countries} label="Country" />
 * ```
 */
const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  onMultiValueChange,
  options,
  label,
  placeholder,
  helperText,
  error,
  errorMessage,
  disabled,
  clearable,
  loading,
  size = "small",
  isMulti = false,
  checkBox,
  roundedCheckBox,
  selectAllOptions,
  onSelectAll,
  menuPlacement,
  maxListHeight,
  name,
  required,
  dataQa,
  className,
}) => {
  // Development validation
  if (process.env.NODE_ENV === 'development') {
    if (!options || options.length === 0) {
      console.warn(
        '[Select] Empty options array provided. ' +
        'Ensure options are loaded before rendering.'
      );
    }
  }

  // Convert options to DSR format
  const dsrOptions: DSROptionType[] = options.map(opt => ({
    label: opt.label,
    value: opt.value,
  }));

  // Convert value to DSR format
  const getSelectedOption = (): DSROptionType | DSROptionType[] | null => {
    if (!value) return null;
    
    if (isMulti && Array.isArray(value)) {
      return dsrOptions.filter(opt => value.includes(opt.value));
    }
    
    return dsrOptions.find(opt => opt.value === (Array.isArray(value) ? value[0] : value)) || null;
  };
  
  // Handler that converts from DSR format to string/string[]
  const handleChange = (newValue: DSROptionType | DSROptionType[] | '' | null | undefined) => {
    if (newValue === null || newValue === undefined || newValue === '') {
      if (isMulti && onMultiValueChange) {
        onMultiValueChange([]);
      } else if (onValueChange) {
        onValueChange('');
      }
      return;
    }
    
    if (Array.isArray(newValue)) {
      const values = newValue.map(v => v.value);
      if (onMultiValueChange) {
        onMultiValueChange(values);
      } else if (onValueChange) {
        onValueChange(values[0] || '');
      }
    } else {
      if (onValueChange) {
        onValueChange(newValue.value || '');
      }
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <DSRSelectV2
        options={dsrOptions}
        value={getSelectedOption()}
        onChange={handleChange}
        label={label || placeholder}
        helper={helperText}
        error={error}
        errorMsg={errorMessage}
        isDisabled={disabled}
        isClearable={clearable}
        isLoading={loading}
        size={size}
        isMulti={isMulti}
        checkBox={checkBox}
        roundedCheckBox={roundedCheckBox}
        selectAllOptions={selectAllOptions}
        onSelectAll={onSelectAll}
        menuPlacement={menuPlacement}
        maxListHeight={maxListHeight}
        name={name}
        required={required}
        dataQa={dataQa}
      />
    </div>
  );
};
Select.displayName = "Select";

// ============= SELECT WITH SEARCH (DSR SelectWithSearch) =============
export interface SelectWithSearchProps {
  /** Current value */
  value?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Array of options */
  options: SelectOption[];
  /** Field label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Whether it has error */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Whether it is disabled */
  disabled?: boolean;
  /** Whether selection can be cleared */
  clearable?: boolean;
  /** Callback when user searches */
  onSearch?: (search: string) => void;
  /** Whether more pages are available (for pagination) */
  hasMorePages?: boolean;
  /** Whether new options can be created (shows "Create X" option) */
  isCreatable?: boolean;
  /** Callback when a new value is created (requires isCreatable=true) */
  onCreateValue?: (value: string) => void;
  /** Enable virtualization for large lists (improves performance) */
  isVirtualized?: boolean;
  /** Results limit per page */
  limit?: number;
  /** Search field label */
  searchLabel?: string;
  /** Select size */
  size?: "small" | "medium" | "large";
  /** data-qa attribute for testing */
  dataQa?: string;
  /** Additional CSS classes for the container */
  className?: string;
}

/**
 * SelectWithSearch component that internally uses DSR SelectWithSearch.
 * For long lists with integrated search.
 */
const SelectWithSearch: React.FC<SelectWithSearchProps> = ({
  value,
  onValueChange,
  options,
  label,
  helperText,
  error,
  errorMessage,
  disabled,
  clearable,
  onSearch,
  hasMorePages = false,
  isCreatable = false,
  onCreateValue,
  isVirtualized,
  limit = 20,
  searchLabel,
  size = "small",
  dataQa,
  className,
}) => {
  // Convert options to DSR format
  const dsrOptions: DSROptionType[] = options.map(opt => ({
    label: opt.label,
    value: opt.value,
  }));

  // Convert value string to DSR format (object with label/value)
  const selectedOption = dsrOptions.find(opt => opt.value === value) || null;
  
  // Handler that converts from DSR format to string
  const handleChange = (newValue: DSROptionType | DSROptionType[] | '' | null | undefined) => {
    if (!onValueChange) return;
    if (newValue === null || newValue === undefined || newValue === '') {
      onValueChange('');
      return;
    }
    if (Array.isArray(newValue)) {
      onValueChange(newValue[0]?.value || '');
    } else {
      onValueChange(newValue.value || '');
    }
  };

  // Simplified search handler
  const handleSearch = (search: string, _limit: number, _page: number) => {
    if (onSearch) {
      onSearch(search);
    }
  };

  // Handler for creating new values
  const handleCreateValue = (option: DSROptionType) => {
    if (onCreateValue) {
      onCreateValue(option.value || option.label);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <DSRSelectWithSearch
        options={dsrOptions}
        value={selectedOption}
        onChange={handleChange}
        label={label}
        helper={helperText}
        error={error}
        errorMsg={errorMessage}
        isDisabled={disabled}
        isClearable={clearable}
        onSearch={handleSearch}
        hasMorePages={hasMorePages}
        isCreatable={isCreatable}
        onCreateValue={onCreateValue ? handleCreateValue : undefined}
        isVirtualized={isVirtualized}
        limit={limit}
        searchLabel={searchLabel}
        size={size}
        dataQa={dataQa}
      />
    </div>
  );
};
SelectWithSearch.displayName = "SelectWithSearch";

// ============= COMPOSITION COMPONENTS (RADIX) =============
// For cases where more control over trigger and content is needed

const SelectComposed = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <Icon>{IconsEnum.ExpandMore}</Icon>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <Icon>{IconsEnum.ExpandLess}</Icon>
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <Icon>{IconsEnum.ExpandMore}</Icon>
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Icon>{IconsEnum.Check}</Icon>
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  // DSR Selects (main)
  Select,
  SelectWithSearch,
  // Radix components for advanced composition
  SelectComposed,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
