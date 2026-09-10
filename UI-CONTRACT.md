<!--
  GENERATED — do not edit by hand.
  Produced by adsmurai-dsr-react@2.0.0 (scripts/generate-ui-contract.mjs).
  Regenerate after upgrading the library so this file cannot drift from it.
-->

# UI contract: adsmurai-dsr-react@2.0.0

All UI in this project comes from `adsmurai-dsr-react`. It is the public
contract over the internal Adsmurai design system.

## Hard rules

1. **Never** import `@adsmurai/design-system-react`. It is bundled inside
   `adsmurai-dsr-react`; importing it directly bypasses the stable API.
2. **Never** create a local component that duplicates one below. Use the library
   component, even if it needs a wrapper for layout.
3. **Never** import from internal paths
   (`adsmurai-dsr-react/components/ui/button`). Only the four entry points below.
4. Enums come from `/enums` and types from `/types` — never from the root.

## Entry points

| Import from | For |
|---|---|
| `adsmurai-dsr-react` | components, hooks, utilities, constants |
| `adsmurai-dsr-react/enums` | enums (9 available) |
| `adsmurai-dsr-react/types` | prop types |
| `adsmurai-dsr-react/styles` | the stylesheet — **required once at the app entry** |

```tsx
import 'adsmurai-dsr-react/styles';                       // required
import { Button, Card } from 'adsmurai-dsr-react';
import { IconsEnum } from 'adsmurai-dsr-react/enums';
import type { ButtonProps } from 'adsmurai-dsr-react/types';
```

No Tailwind config is needed for the library to render correctly.

## Gotchas that cause silent breakage

- `Chip` takes `label`, **not** children, and its props depend on `variant`
  (`assist` | `suggestion` | `input` | `filter` | `status` | `colorful`).
  `selected` is `filter`-only; `onRemove` is `filter`/`input`-only;
  `status` and `colorful` are not interactive.
- `Button`, `Badge`, `Checkbox` and `RadioGroupItem` take **string** children.
  Passing JSX renders empty or `[object Object]`.
- Two toast systems, not interchangeable: `useToast()` + `<Toaster />` is the
  default; `sonnerToast` + `<Sonner />` is the promise-based alternative. The
  root `toast` is the useToast one, so `toast.success()` throws.
- `DataTable`: every row needs an `id`. `Select`: `options` array, primitive
  `value`s. `Stepper`: `activeStep` is 0-indexed but `onStepClick` gives a
  1-indexed `order`.
- `Icon`: omit `baseType`; the design system default is correct.
- `buttonVariants` is deprecated and produces no colour — do not use it.
- Providers: `Tooltip` needs `TooltipProvider`, `useToast` needs `<Toaster />`,
  `Sidebar` needs `SidebarProvider`.
- `DataTable` / `DateRangePicker` need a MUI X Pro licence key or they show a
  watermark.

## Breakpoints

The design system's scale, **not** Tailwind's defaults: xs 576px · sm 768px · md 992px · lg 1200px · xl 1440px.
Only `md: 768px` overlaps, and it is shifted — DS `sm` equals Tailwind's
default `md`.

## Components (265)

Accordion, AccordionContent, AccordionItem, AccordionTrigger, ActionMenu, AdvancedSearchBar, Alert, AlertDescription, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, AlertTitle, AspectRatio, Avatar, AvatarFallback, AvatarImage, Badge, BarChart, BaseMessage, Breadcrumbs, BulkAction, Button, Calendar, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, ChartContainer, ChartLegend, ChartLegendBase, ChartLegendContent, ChartStyle, ChartTooltip, ChartTooltipContent, Checkbox, Chip, Collapsable, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, ContentToggler, ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger, Curve, CustomLayout, DashboardLayout, DataTable, DatePicker, DateRangePicker, Description, Dialog, DialogButton, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DonutChart, Drawer, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, Empty, EventList, FileBox, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, HeaderMenu, HeaderMenuTemplateV2, HoverCard, HoverCardContent, HoverCardTrigger, Icon, IconButton, Image, Input, InputCurrency, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, InputSearch, Label, LineChart, LinkText, Logo, Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarPortal, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger, Modal, MultiSectionLayout, MultiTextField, NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, NoResults, PageHeader, Pagination, PaginationContent, PaginationItem, Popover, PopoverAnchor, PopoverContent, PopoverTrigger, ProcessingIcon, Progress, ProgressPieChart, RadioGroup, RadioGroupItem, Rating, ResizableHandle, ResizablePanel, ResizablePanelGroup, RichTextEditor, ScrollArea, ScrollBar, Select, SelectWithSearch, SelectionCard, Separator, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger, Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, SimpleLayout, Skeleton, Slider, SocialIcon, Sonner, StatusTag, Stepper, Switch, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, TipItem, Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, Toaster, ToggleButton, ToggleButtonGroup, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, TreeView, Typography, Uploader

## Hooks and utilities

buttonVariants, cn, createHomeLinks, createLink, createSection, createSidebarOption, createUserMenu, defaultHomeLinks, defaultIsSelected, defaultUser, defaultUserMenuSections, navigationMenuTriggerStyle, patternGuide, resolveUser, sonnerToast, toast, useCopyToClipboard, useFormField, useIsMobile, useSidebar, useToast

## Exportable constants (89)

Use these instead of guessing string values — they are the valid sets.

ACCORDION_TYPES, ACTION_MENU_PLACEMENTS, ACTION_MENU_SIZES, ACTION_MENU_TOOLTIP_POSITIONS, ADVANCED_SEARCH_BAR_SIZES, ALERT_VARIANTS, BADGE_SIZES, BADGE_VARIANTS, BASE_MESSAGE_SIZES, BASE_MESSAGE_STATUSES, BUTTON_SIZES, BUTTON_VARIANTS, CARD_VARIANTS, CHART_LEGEND_ICON_TYPES, CHART_LEGEND_VARIANTS, CHIP_COLORFUL_PRESETS, CHIP_SIZES, CHIP_STATUSES, CHIP_VARIANTS, COLLAPSABLE_SIZES, DATA_TABLE_ROW_HEIGHTS, DATA_TABLE_VARIANTS, DATE_FORMATS, DATE_PICKER_SIZES, DATE_PICKER_TYPES, DATE_RANGE_ORIENTATIONS, DATE_RANGE_SHORTCUTS, DATE_RANGE_SIZES, DESCRIPTION_SIZES, DIALOG_BUTTON_MAX_WIDTHS, DRAWER_PLACEMENTS, DRAWER_SIZES, EVENT_LIST_SELECTION_POSITIONS, FILE_TYPES, ICON_BASE_TYPES, ICON_BUTTON_SIZES, ICON_BUTTON_VARIANTS, ICON_COLORS, ICON_SIZES, IMAGE_FIT_MODES, IMAGE_LOADING_MODES, IMAGE_TYPES, INPUT_CURRENCY_SIZES, INPUT_SEARCH_SIZES, INPUT_SIZES, LINK_TEXT_SIZES, LINK_TEXT_VARIANTS, LOGO_TYPES, MODAL_STATUSES, MULTI_TEXT_FIELD_SIZES, POPOVER_ALIGNS, POPOVER_SIDES, PROCESSING_ICON_DENSITIES, PROGRESS_SIZES, PROGRESS_VARIANTS, RADIO_GROUP_ORIENTATIONS, RATING_MAX_VALUES, SELECTION_CARD_POSITIONS, SELECTION_CARD_STYLES, SELECTION_CARD_TYPES, SELECT_SIZES, SEPARATOR_ORIENTATIONS, SHEET_SIDES, SIDEBAR_COLLAPSIBLE_MODES, SIDEBAR_MENU_BUTTON_SIZES, SIDEBAR_MENU_BUTTON_VARIANTS, SIDEBAR_SIDES, SIDEBAR_VARIANTS, SKELETON_ANIMATIONS, SKELETON_VARIANTS, SOCIAL_ICON_COLORS, SOCIAL_ICON_SIZES, SOCIAL_NETWORKS, STATUS_TAG_STATUSES, STEPPER_DIRECTIONS, STEPPER_STATES, TAB_SIZES, TAB_VARIANTS, TIP_ITEM_INTENSITIES, TOAST_VARIANTS, TOGGLE_BUTTON_GROUP_SIZES, TOGGLE_BUTTON_GROUP_VARIANTS, TOOLTIP_POSITIONS, TYPOGRAPHY_ALIGNMENTS, TYPOGRAPHY_COLORS, TYPOGRAPHY_INTENSITIES, TYPOGRAPHY_VARIANTS, TYPOGRAPHY_WEIGHTS, UPLOADER_ACCEPT_PRESETS
