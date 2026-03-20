/**
 * @fileoverview Centralized type exports for adsmurai-dsr-react
 *
 * @description
 * All component prop types exported from a single location.
 * Use this for TypeScript type imports without importing components.
 *
 * @example
 * ```tsx
 * import type { ButtonProps, InputProps, SelectProps } from 'adsmurai-dsr-react/types';
 *
 * const MyButton: React.FC<ButtonProps> = (props) => {
 *   return <Button {...props} />;
 * };
 * ```
 *
 * @since 0.1.2-snapshot.1
 */

// ============================================
// Forms & Inputs
// ============================================
export type { ButtonProps } from '../components/ui/button';
export type { CheckboxProps } from '../components/ui/checkbox';
export type { SwitchProps } from '../components/ui/switch';
export type { InputProps } from '../components/ui/input';
export type { TextareaProps } from '../components/ui/textarea';
export type { InputSearchProps } from '../components/ui/input-search';
export type { InputCurrencyProps, InputCurrencySize } from '../components/ui/input-currency';
export type { SelectProps, SelectWithSearchProps, SelectOption } from '../components/ui/select';
export type { RadioGroupProps, RadioGroupItemProps } from '../components/ui/radio-group';
export type { SliderProps } from '../components/ui/slider';
export type { MultiTextFieldProps } from '../components/ui/multi-text-field';
export type { RichTextEditorProps } from '../components/ui/rich-text-editor';
export type { DatePickerProps } from '../components/ui/date-picker';
export type { DateRangePickerProps } from '../components/ui/date-range-picker';
export type { FileBoxProps } from '../components/ui/file-box';

// ============================================
// Display
// ============================================
export type { BadgeProps } from '../components/ui/badge';
export type { ChipProps, TagProps, StatusTagProps, RatingProps } from '../components/ui/chip';
export type { IconProps } from '../components/ui/icon';
export type { IconButtonProps } from '../components/ui/icon-button';
export type { TypographyProps } from '../components/ui/typography';
export type { AlertProps } from '../components/ui/alert';
export type { ProgressProps } from '../components/ui/progress';
export type { SkeletonProps } from '../components/ui/skeleton';
export type { ImageProps, ImageFitMode, ImageLoadingMode } from '../components/ui/image';
export type { LogoProps, LogoType } from '../components/ui/logo';
export type { SocialIconProps, SocialNetwork, SocialIconColor, SocialIconSize } from '../components/ui/social-icon';
export type { ProcessingIconProps, SpinnerDensity } from '../components/ui/processing-icon';

// ============================================
// Navigation
// ============================================
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from '../components/ui/tabs';
export type { PaginationProps, PaginationContentProps, PaginationItemProps } from '../components/ui/pagination';
export type { StepperProps, StepperStep } from '../components/ui/stepper';
export type { BreadcrumbsProps, BreadcrumbStep } from '../components/ui/breadcrumbs';

// ============================================
// Containers & Overlays
// ============================================
export type { CardProps } from '../components/ui/card';
export type { ModalProps } from '../components/ui/modal';
export type { DialogButtonProps, DialogButtonMaxWidth } from '../components/ui/dialog-button';
export type { DrawerProps } from '../components/ui/drawer';
export type {
  TooltipProps,
  TooltipProviderProps,
  TooltipTriggerProps,
  TooltipContentProps,
} from '../components/ui/tooltip';
export type { CollapsableProps } from '../components/ui/collapsable';

// ============================================
// Data Display
// ============================================
export type { DataTableProps, DataTableRef, DataTableVariant, DataTableRowHeight } from '../components/ui/data-table';
export type { BarChartProps, BarChartSeriesData } from '../components/ui/bar-chart';
export type { LineChartProps, LineChartDataItem } from '../components/ui/line-chart';
export type { DonutChartProps, DonutChartDataItem } from '../components/ui/donut-chart';
export type { ProgressPieChartProps } from '../components/ui/progress-pie-chart';
export type { ChartLegendProps, ChartLegendItem, LegendIconType, ChartLegendVariant } from '../components/ui/chart-legend';
export type { CurveProps } from '../components/ui/curve';
export type { EventListProps, EventListItem, EventListSelectionPosition } from '../components/ui/event-list';

// ============================================
// Interactive
// ============================================
export type { ActionMenuProps, ActionMenuItem, ActionMenuSize, ActionMenuPlacement, ActionMenuTooltipPosition } from '../components/ui/action-menu';
export type { BulkActionProps, BulkActionItem } from '../components/ui/bulk-action';
export type { ToggleButtonProps } from '../components/ui/toggle-button';
export type { ToggleButtonGroupProps } from '../components/ui/toggle-button-group';
export type { ContentTogglerProps } from '../components/ui/content-toggler';
export type {
  SelectionCardProps,
  SelectionCardType,
  SelectionCardStyle,
  SelectionCardPosition,
} from '../components/ui/selection-card';
export type { TreeViewProps, TreeViewItem } from '../components/ui/tree-view';
export type {
  AdvancedSearchBarProps,
  AdvancedSearchConfig,
  SearchField,
  SearchOperator,
  SearchFilterCondition,
  AdvancedSearchBarSize,
} from '../components/ui/advanced-search-bar';

// ============================================
// Feedback
// ============================================
export type { BaseMessageProps, BaseMessageStatus, BaseMessageSize } from '../components/ui/base-message';
export type { DescriptionProps, DescriptionSize } from '../components/ui/description';
export type { TipItemProps, TipItemIntensity } from '../components/ui/tip-item';
export type { ToastProps, ToastActionElement, ToastVariant } from '../components/ui/toast';

// ============================================
// Charts
// ============================================
export type { ChartConfig } from '../components/ui/chart';

// ============================================
// Layout
// ============================================
export type { SeparatorProps } from '../components/ui/separator';
export type { PageHeaderProps, PageHeaderBreadcrumb } from '../components/ui/page-header';
export type {
  SidebarSide,
  SidebarVariant,
  SidebarCollapsibleMode,
  SidebarMenuButtonVariant,
  SidebarMenuButtonSize,
} from '../components/ui/sidebar';

// ============================================
// Empty States
// ============================================
export type { EmptyProps } from '../components/ui/empty';
export type { NoResultsProps } from '../components/ui/no-results';

// ============================================
// Navigation / HeaderMenu
// ============================================
export type {
  HeaderMenuTemplateV2Props,
  HeaderMenuV2SidebarNavOption,
  HeaderMenuV2LinkVariant,
  LinksSection,
  Link,
  IsSelectedFn,
} from '../components/ui/header-menu';
export type {
  HeaderMenuLink,
  HeaderMenuSection,
  SidebarNavOption,
  HeaderMenuPattern,
} from '../components/ui/header-menu-types';

// ============================================
// Pre-configured Layouts
// ============================================
export type { SimpleLayoutProps } from '../components/ui/layouts/simple-layout';
export type { DashboardLayoutProps } from '../components/ui/layouts/dashboard-layout';
export type { MultiSectionLayoutProps } from '../components/ui/layouts/multi-section-layout';
export type { CustomLayoutProps, SidebarType } from '../components/ui/layouts/custom-layout';
export type { LayoutUser } from '../components/ui/layouts/layout-defaults';

// ============================================
// Other
// ============================================
export type { LinkTextProps } from '../components/ui/link-text';

// ============================================
// Re-export DataTable related types from DSR
// ============================================
export type {
  ExtendedGridColDef,
  GridRowId,
  GridSortModel,
  GridFilterModel,
  GridRowParams,
  GridPinnedColumnFields,
  GridRowModel,
  DataTableBulkAction,
  DataTableActionResponse,
} from '../components/ui/data-table';
