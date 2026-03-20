# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-03-20

### Improved
- **Build**: Source maps removed from published package, dependencies externalized for smaller bundle size (10.5 MB → 3.3 MB)
- **Docs**: Updated all documentation to reflect 1.0 migration

## [1.0.0] - 2026-03-20

### Changed
- **Package name**: Renamed from `@adsmurai/dsr-react` to `adsmurai-dsr-react`
- **Registry**: Migrated from GitLab npm registry to npmjs.org (public)
- **License**: Changed from `UNLICENSED` to `MIT`
- **@adsmurai/design-system-react**: Moved from peer dependency to bundled dependency (consumers no longer need GitLab token)

## [0.1.1-snapshot.18] - 2026-02-26

### Changed
- **Card**: Default variant changed from `primary` to `secondary`

## [0.1.1-snapshot.17] - 2026-02-12

### Added

- **ActionMenu**: Added Storybook stories (Default, Destructive Confirmation, External Actions, Custom Icon, Sizes, Placements, Disabled Actions)
- **Layouts**: Added pre-configured layout components (SimpleLayout, DashboardLayout, MultiSectionLayout, CustomLayout)

### Improved

- **AI-INSTRUCTIONS.md**: Updated ActionMenu documentation with correct props and added minimal example
- **PATTERNS.md**: Added ActionMenu variation to DataTable with Actions pattern

## [0.1.1-snapshot.16] - 2026-02-04

### Changed

- **@adsmurai/design-system-react**: Updated to 9.95.6 (fixed version)

### Added

- **Skeleton**: Added `columnCount` and `numberOfItems` props for grid variant (DSR 9.95.3)

### Improved

- **AI-INSTRUCTIONS.md**: Enhanced component documentation
  - Updated DatePicker with `dateType`, `size`, `format`, `is24Hours`, `isClearable` props
  - Updated DateRangePicker with `orientation`, `showShortcuts`, `size`, `calendarsNumber` props
  - Updated DataTable with `enableQuickFilter` and `quickFilterPlaceholder` props
  - Updated Skeleton with `variant`, `width`, `height`, `columnCount`, `numberOfItems` props
  - Added Uploads section (Uploader, FileBox)
  - Added Advanced section (TreeView, RichTextEditor, AdvancedSearchBar)
  - Added DatePicker and DateRangePicker examples

## [0.1.1-snapshot.14] - 2025-01-30

### Added

- **Storybook 8.5**: Complete Storybook setup with Vite builder
  - 20 story files covering DSR and Custom components
  - Organized in "DSR Components" and "Custom Components" sections
  - Stories for: Button, Badge, Input, Select, Checkbox, RadioGroup, Switch, Tabs, Card, Alert, Modal, Tooltip, Accordion, Chip, DataTable, Stepper, Dialog, Sheet, Carousel
- **ESLint 9 config**: New `eslint.config.js` for ESLint flat config format
- **Stepper stories**: Comprehensive examples including:
  - Basic usage, all states, descriptions, vertical layout
  - Error states, interactive navigation, clickable steps
  - Checkout flow example, form wizard example
  - **Full Interactive Demo**: Complete wizard with form validation, error handling, optional/skippable steps, progress bar, and clickable navigation
- **CLAUDE.md**: Project-specific instructions for Claude
  - Documentation update rules (when to update AI-INSTRUCTIONS.md, PATTERNS.md, CHANGELOG.md)
  - Component update checklist
  - Documentation standards

### Fixed

- **Stepper**: Fixed step numbering display (was showing +1)
  - Removed explicit `order` prop, let DSR generate numbers automatically
- **Stepper**: Fixed click handler returning wrong step index
  - DSR returns 0-based index, wrapper now converts to 1-based `order`
  - `onStepClick` now receives correct 1-indexed `order` (use `order - 1` for state)
- **Empty interfaces**: Converted to type aliases in `command.tsx` and `pagination.tsx`
- **Build config**: Excluded `.stories.tsx` files from production build

### Improved

- **Stepper documentation**: Comprehensive JSDoc with:
  - Key concepts: indexing (0-based vs 1-based), state priority
  - `@ai-note` for click handling with conversion example
  - 6 complete code examples (basic, descriptions, vertical, error, clickable, full wizard)
  - Detailed interface documentation for `StepperStep` and `StepperProps`
- **AI-INSTRUCTIONS.md**: Added Stepper documentation
  - Updated Navigation table with indexing gotcha
  - Added to Special Prop Patterns table
  - Added complete Stepper example in Minimal Examples section

## [0.1.1-snapshot.13] - 2025-01-30

### Added

- **AI-INSTRUCTIONS.md**: New comprehensive documentation file for AI tools (Lovable, Claude, Cursor)
  - Architecture overview and import rules
  - Complete component reference table with restrictions and gotchas
  - Minimal code examples for all major components
- **PATTERNS.md**: Copy-paste ready patterns for common use cases
  - Form with validation (react-hook-form + zod)
  - DataTable with actions and bulk operations
  - Confirmation modal patterns
  - Selection patterns (RadioGroup vs Checkbox)
  - Tab navigation with URL sync
  - Stats cards dashboard
  - Search with filters

### Changed

- **RadioGroupItem**: `children` prop now typed as `string` (was `ReactNode`)
  - Enforces that only plain text is passed (JSX will cause TypeScript error)
- **Checkbox**: `children` prop now typed as `string` (was `ReactNode`)
  - Enforces that only plain text labels are used
- **Badge**: `children` prop now typed as `string | number` (was `ReactNode`)
  - Prevents passing JSX which would render as "[object Object]"

### Improved

- Enhanced JSDoc with `@ai-note` tags for AI tool compatibility
  - Button, Badge, Checkbox, RadioGroup, Select, Modal, DataTable, Drawer, Chip
  - Clear examples of correct and incorrect usage patterns
  - Documentation of string-only children restrictions

## [0.1.1-snapshot.12] - 2025-01-29

### Added

- **ToggleButton**: Exposed `selected` prop from DSR for controlled selection state

## [0.1.1-snapshot.10] - 2025-01-29

### Changed

- **Drawer**: Simplified to only wrap DSR Drawer component (left/right panels)
  - For top/bottom panels, use `Sheet` component instead

### Removed

- **BREAKING**: Removed `DrawerButton` component (HTML fallback) - use `Drawer` with your own trigger button
- **BREAKING**: Removed composable Drawer API (`DrawerTrigger`, `DrawerContent`, etc.) - use `Sheet` for compositional API or `Drawer` for simple side panels

## [0.1.1-snapshot.8] - 2025-01-29

### Changed

- **SelectionCard**: Now uses DSR SelectionCard internally instead of HTML fallback
  - Added new props: `value` (required), `image`, `style`, `position`, `width`, `children`
  - **BREAKING**: `onChange` signature changed from `(selected: boolean)` to `(value: string, checked?: boolean)`

### Removed

- **BREAKING**: Removed `Divider` component - use `Separator` instead (same API)
- **BREAKING**: Removed `FileUpload` component - use `Uploader` instead
  - Migration: `onFileSelect` → `onUpload`, `accept` string → array of MIME types
- **BREAKING**: Removed `Notification` component - use `useToast` hook or `Sonner` instead
  - Migration: See Toast/Sonner documentation for imperative toast API

## [0.1.1-snapshot.6] - 2025-01-29

### Changed

- **PageHeader**: Now uses DSR `Breadcrumbs` component internally instead of custom implementation

## [0.1.1-snapshot.4] - 2025-01-28

### Added

- Vitest test suite infrastructure for component testing

## [0.1.1-snapshot.3] - 2025-01-28

### Added

- JSDoc documentation with `@example` for all 97 components (Lovable compatibility)
- All documentation translated to English
- DSR Wrapper Guide documentation in `claude.md`

- New exported constants for IntelliSense and type safety:
  - `INPUT_SIZES` - Valid input size values
  - `SELECT_SIZES` - Valid select size values
  - `TAB_VARIANTS`, `TAB_SIZES` - Valid tab variant and size values
  - `CARD_VARIANTS` - Valid card variant values
  - `STEPPER_DIRECTIONS`, `STEPPER_STATES` - Valid stepper direction and state values
  - `MULTI_TEXT_FIELD_SIZES` - Valid multi-text-field size values

- New props exposed from DSR:
  - **Select**: `checkBox`, `roundedCheckBox`, `selectAllOptions`, `onSelectAll`, `menuPlacement`, `maxListHeight`, `name`, `required`
  - **SelectWithSearch**: `onCreateValue`, `isVirtualized`, `dataQa`
  - **Input**: `validate`, `autocompleteOptions`, `min`, `max`, `step`, `textAlign`, `errorMessage`
  - **Textarea**: `withCounter`, `maxCounter`, `dataQa`, `rows`, `minHeight`, `helperText`, `errorMessage`
  - **IconButton**: `tooltipPosition`
  - **Card** (all sub-components): `dataQa`
  - **Stepper**: `dataQa`
  - **MultiTextField**: `dataQa`, `onInput`
  - **Icon**: Now accepts arbitrary Material Icons strings in addition to `IconsEnum` keys

- Development validations (`console.warn`) for common mistakes:
  - `Checkbox`: Warning for complex JSX children
  - `Select`: Warning for empty options array
  - `Alert`: Warning to use AlertTitle/AlertDescription for complex content
  - `Stepper`: Warning for empty steps or out-of-bounds activeStep
  - `MultiTextField`: Warning for invalid regex patterns
  - `Icon`: Warning for unknown icon names (when using arbitrary strings)

- New type exports in `adsmurai-dsr-react/types`:
  - `StepperStep` - Step definition for Stepper component
  - `ChartLegendItem` - Legend item for ChartLegend
  - `TreeViewItem` - Node definition for TreeView
  - `DonutChartDataItem` - Data item for DonutChart
  - `LineChartDataItem` - Data item for LineChart
  - `BarChartSeriesData` - Series data for BarChart
  - `AdvancedSearchConfig`, `SearchField`, `SearchOperator`, `SearchFilterCondition` - Config types for AdvancedSearchBar
  - `DataTableRef` - Ref type for DataTable

### Changed

- **BREAKING**: Enums are now only exported from `adsmurai-dsr-react/enums`
  - Removed `IconsEnum`, `ThemesEnum` re-exports from component files
  - Removed `IconsEnum`, `IconBaseTypeEnum`, `BadgeColorEnum` re-exports from `icon.tsx`
  - Migration: `import { IconsEnum } from 'adsmurai-dsr-react/enums'`

- **BREAKING**: Types are now only exported from `adsmurai-dsr-react/types`
  - Removed inline type exports from component barrel (`index.ts`)
  - Migration: `import type { ButtonProps } from 'adsmurai-dsr-react/types'`

- **BREAKING**: Removed composable Breadcrumb components in favor of DSR-based `Breadcrumbs`
  - Removed: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`
  - Migration: Use `<Breadcrumbs steps={[{ title: 'Home', url: '/' }, { title: 'Current' }]} />`

- **BREAKING**: Removed Radix-based toggle components in favor of DSR-based versions
  - Removed: `Toggle`, `toggleVariants`, `ToggleGroup`, `ToggleGroupItem`
  - Migration: Use `ToggleButton` and `ToggleButtonGroup` (now use DSR internally)

- **BREAKING**: Removed Radix-based Collapsible in favor of DSR-based `Collapsable`
  - Removed: `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`
  - Migration: Use `<Collapsable title="Title">Content</Collapsable>`

- **Collapsable**: Now uses DSR Collapsable internally (was HTML fallback)
- **ToggleButton/ToggleButtonGroup**: Now use DSR components internally (were HTML fallback)

### Deprecated

- **Textarea**: `helper` prop is deprecated in favor of `helperText` for consistency with Input

### Fixed

- Added missing `displayName` to `Badge` component (React DevTools)
- **Drawer/Dialog**: Fixed event propagation issue where clicking inside content would close the modal
  - Added `stopPropagation` handlers to prevent overlay click events from triggering close

## [0.1.1-snapshot.1] - 2025-01-28

### Added

- Initial public release of `adsmurai-dsr-react`
- UI components wrapping DSR core components
- Custom hooks: `useIsMobile`, `useCopyToClipboard`
- Utility function `cn()` for class merging
- Exportable enums via `adsmurai-dsr-react/enums`
- Exportable types via `adsmurai-dsr-react/types`
