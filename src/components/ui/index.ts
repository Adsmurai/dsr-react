/**
 * @fileoverview Barrel file for all UI components
 * 
 * @description
 * Central export point for all UI components. Allows cleaner imports:
 * 
 * @example
 * ```tsx
 * // Before (multiple imports)
 * import { Button } from '@/components/ui/button';
 * import { Card } from '@/components/ui/card';
 * import { Typography } from '@/components/ui/typography';
 * 
 * // After (single import)
 * import { Button, Card, Typography } from '@/components/ui';
 * ```
 */

// Forms & Inputs
export { Button, buttonVariants, BUTTON_VARIANTS, BUTTON_SIZES } from './button';
export { Checkbox } from './checkbox';
export { Switch } from './switch';
export { Input, INPUT_SIZES } from './input';
export { Textarea } from './textarea';
export { InputSearch } from './input-search';
export { InputCurrency, INPUT_CURRENCY_SIZES } from './input-currency';
export { Select, SelectWithSearch, SELECT_SIZES } from './select';
export { RadioGroup, RadioGroupItem } from './radio-group';
export { Slider } from './slider';
export { Label } from './label';
export { MultiTextField, MULTI_TEXT_FIELD_SIZES } from './multi-text-field';
export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from './form';

// Display
export { Badge, BADGE_VARIANTS, BADGE_SIZES } from './badge';
export { Chip, Tag, StatusTag } from './chip';
export { Icon } from './icon';
export { Typography } from './typography';
export { Alert, ALERT_VARIANTS } from './alert';
export { Progress } from './progress';
export { Skeleton } from './skeleton';
export { Avatar, AvatarImage, AvatarFallback } from './avatar';
export { Image, IMAGE_FIT_MODES, IMAGE_LOADING_MODES } from './image';
export { Logo, LOGO_TYPES } from './logo';
export { SocialIcon, SOCIAL_NETWORKS, SOCIAL_ICON_COLORS, SOCIAL_ICON_SIZES } from './social-icon';
export { ProcessingIcon, PROCESSING_ICON_DENSITIES } from './processing-icon';

// Navigation
export { Tabs, TabsList, TabsTrigger, TabsContent, TAB_VARIANTS, TAB_SIZES } from './tabs';
export { Pagination, PaginationContent, PaginationItem } from './pagination';
export { Stepper, STEPPER_DIRECTIONS, STEPPER_STATES } from './stepper';
export { Breadcrumbs } from './breadcrumbs';
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from './navigation-menu';

// Containers
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CARD_VARIANTS,
} from './card';
export { Modal } from './modal';
export { Drawer } from './drawer';
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './tooltip';
export { Popover, PopoverTrigger, PopoverContent } from './popover';
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './dialog';
export { DialogButton, DIALOG_BUTTON_MAX_WIDTHS } from './dialog-button';
export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './alert-dialog';
export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from './sheet';
export { Collapsable } from './collapsable';
export { HoverCard, HoverCardTrigger, HoverCardContent } from './hover-card';
export { AspectRatio } from './aspect-ratio';
export { ScrollArea, ScrollBar } from './scroll-area';
export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from './resizable';

// Data Display
export { DataTable, DATA_TABLE_VARIANTS, DATA_TABLE_ROW_HEIGHTS } from './data-table';
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './table';
export { LineChart } from './line-chart';
export { BarChart } from './bar-chart';
export { DonutChart } from './donut-chart';
export { ProgressPieChart } from './progress-pie-chart';
export { ChartLegend, CHART_LEGEND_ICON_TYPES, CHART_LEGEND_VARIANTS } from './chart-legend';
export { Curve } from './curve';
export { EventList, EVENT_LIST_SELECTION_POSITIONS } from './event-list';

// Interactive
export { IconButton } from './icon-button';
export { ActionMenu, ACTION_MENU_SIZES, ACTION_MENU_PLACEMENTS, ACTION_MENU_TOOLTIP_POSITIONS } from './action-menu';
export { BulkAction } from './bulk-action';
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './dropdown-menu';
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from './context-menu';
export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
} from './menubar';
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './command';
export { ToggleButton } from './toggle-button';
export { ToggleButtonGroup } from './toggle-button-group';

// Feedback
export { Toaster } from './toaster';
export { useToast, toast } from './use-toast';
export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  TOAST_VARIANTS,
} from './toast';
export { BaseMessage, BASE_MESSAGE_STATUSES, BASE_MESSAGE_SIZES } from './base-message';
export { Description, DESCRIPTION_SIZES } from './description';
export { TipItem, TIP_ITEM_INTENSITIES } from './tip-item';

// Layout
export { Separator } from './separator';
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
  SIDEBAR_SIDES,
  SIDEBAR_VARIANTS,
  SIDEBAR_COLLAPSIBLE_MODES,
  SIDEBAR_MENU_BUTTON_VARIANTS,
  SIDEBAR_MENU_BUTTON_SIZES,
} from './sidebar';

// Uploads & Files
export { FileBox } from './file-box';
export { Uploader, IMAGE_TYPES, FILE_TYPES, UPLOADER_ACCEPT_PRESETS } from './uploader';

// Pickers
export { Calendar } from './calendar';
export { DatePicker, DATE_PICKER_TYPES, DATE_PICKER_SIZES, DATE_FORMATS } from './date-picker';
export { DateRangePicker, DATE_RANGE_SHORTCUTS, DATE_RANGE_ORIENTATIONS, DATE_RANGE_SIZES } from './date-range-picker';

// Carousel
export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from './carousel';

// Input OTP
export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from './input-otp';

// Advanced
export { AdvancedSearchBar, ADVANCED_SEARCH_BAR_SIZES } from './advanced-search-bar';
export { ContentToggler } from './content-toggler';
export { SelectionCard, SELECTION_CARD_TYPES, SELECTION_CARD_STYLES, SELECTION_CARD_POSITIONS } from './selection-card';
export { RichTextEditor } from './rich-text-editor';
export { TreeView } from './tree-view';
export { LinkText } from './link-text';

// Empty States
export { Empty } from './empty';
export { NoResults } from './no-results';

// Charts (re-export for convenience)
export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend as ChartLegendBase,
  ChartLegendContent,
  ChartStyle,
} from './chart';

// Accordion
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './accordion';

// Sonner (alternative toast)
export { Toaster as Sonner } from './sonner';

// HeaderMenu (DSR HeaderMenuTemplateV2)
// Note: Import enums from '@adsmurai/dsr-react/enums', types from '@adsmurai/dsr-react/types'
export { HeaderMenu, HeaderMenuTemplateV2 } from './header-menu';
export {
  createLink,
  createSection,
  createHomeLinks,
  createSidebarOption,
  createUserMenu,
  patternGuide,
} from './header-menu-types';

// Page Layout
export { PageHeader } from './page-header';

// Pre-configured Layouts
export {
  SimpleLayout,
  DashboardLayout,
  MultiSectionLayout,
  CustomLayout,
  defaultHomeLinks,
  defaultUserMenuSections,
  defaultUser,
  defaultIsSelected,
  resolveUser,
} from './layouts';
