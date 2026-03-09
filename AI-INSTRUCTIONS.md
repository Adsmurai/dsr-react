# AI Instructions for @adsmurai/dsr-react

> This document helps AI tools (Lovable, Claude, Cursor, etc.) use this component library correctly.

## Architecture Overview

`@adsmurai/dsr-react` is a **wrapper layer** for the internal `@adsmurai/design-system-react` (DSR).

- **Never import from DSR directly** - always use `@adsmurai/dsr-react`
- Components expose a simplified, React-standard API
- Internal DSR complexity is hidden from consumers

## Import Rules

```tsx
// CORRECT - Components, hooks, utilities from root
import { Button, Input, Card, useIsMobile, cn } from '@adsmurai/dsr-react';

// CORRECT - Enums from /enums subpath
import { IconsEnum, ButtonVariantEnum, BadgeColorEnum } from '@adsmurai/dsr-react/enums';

// CORRECT - Types from /types subpath
import type { ButtonProps, InputProps, SelectProps } from '@adsmurai/dsr-react/types';

// WRONG - Never import enums/types from root
import { IconsEnum } from '@adsmurai/dsr-react'; // ERROR

// WRONG - Never use internal paths
import { Button } from '@adsmurai/dsr-react/components/ui/button'; // ERROR

// WRONG - Never import from DSR directly
import { Button } from '@adsmurai/design-system-react'; // ERROR
```

## Critical Restrictions

### String-Only Children Components

These components **only accept string children**. Passing JSX will result in `[object Object]`:

| Component | Correct | Wrong |
|-----------|---------|-------|
| `Button` | `<Button>Save</Button>` | `<Button><Icon />Save</Button>` |
| `Badge` | `<Badge>5</Badge>` | `<Badge><span>5</span></Badge>` |
| `Checkbox` | `<Checkbox>Accept terms</Checkbox>` | `<Checkbox><strong>Accept</strong></Checkbox>` |
| `RadioGroupItem` | `<RadioGroupItem value="a">Option A</RadioGroupItem>` | `<RadioGroupItem><Icon />A</RadioGroupItem>` |

**For icons in buttons**, use props instead:
```tsx
// CORRECT
<Button startIcon="Add">Add Item</Button>
<Button endIcon="OpenInNew">Open</Button>
<Button leadingIcon={<CustomIcon />}>Custom</Button>

// WRONG
<Button><Icon name="Add" /> Add Item</Button>
```

### Components Without Ref Support

These components **do not support refs** (DSR limitation):
- `Checkbox`
- `Switch`

### Placement Restrictions

| Component | Supported | Alternative |
|-----------|-----------|-------------|
| `Drawer` | left, right only | Use `Sheet` for top/bottom |
| `Sheet` | all sides | - |

### Special Prop Patterns

| Component | Gotcha |
|-----------|--------|
| `Chip` | Uses `label` prop, NOT children: `<Chip label="Tag" />` |
| `DataTable` | Each row object must have an `id` field |
| `Select` | Uses `options` array, not children |
| `Rating` | Controlled via key remount (DSR limitation) |
| `Stepper` | `activeStep` is 0-indexed, but `onStepClick` returns 1-indexed `order`. Use `order - 1` for state. |

---

## Component Reference

### Forms & Inputs

| Component | Description | Key Props | Restrictions |
|-----------|-------------|-----------|--------------|
| `Button` | Primary action button | `variant`, `size`, `startIcon`, `endIcon`, `isLoading` | String children only. Use icon props for icons. |
| `Input` | Text input field | `label`, `value`, `onChange`, `error`, `helperText`, `leadingIcon`, `trailingIcon` | `onChange` receives React event |
| `Textarea` | Multi-line text | `label`, `value`, `onChange`, `withCounter`, `maxCounter` | - |
| `Select` | Dropdown selection | `value`, `onValueChange`, `options`, `isMulti`, `clearable` | `options` is array of `{label, value}` |
| `SelectWithSearch` | Searchable dropdown | `value`, `onValueChange`, `options`, `onSearch`, `isCreatable` | For large lists |
| `Checkbox` | Boolean toggle | `checked`, `onCheckedChange`, `indeterminate`, `rounded` | String children only. No ref support. |
| `Switch` | Visual toggle | `checked`, `onChange`, `disabled` | No ref support |
| `RadioGroup` | Single selection | `value`, `onValueChange`, `orientation` | Contains `RadioGroupItem` children |
| `RadioGroupItem` | Radio option | `value`, `disabled` | String children only |
| `Slider` | Range input | `value`, `onChange`, `min`, `max`, `step` | - |
| `InputSearch` | Search field | `value`, `onChange`, `placeholder` | - |
| `InputCurrency` | Currency input | `value`, `onChange`, `currency` | - |
| `MultiTextField` | Tag/pill input | `value`, `onChange`, `maxItems` | Array of strings |
| `DatePicker` | Date selection | `value`, `onChange`, `dateType`, `size`, `format`, `is24Hours`, `isClearable` | `dateType`: date, time, dateTime, yearMonth |
| `DateRangePicker` | Date range | `value`, `onChange`, `orientation`, `showShortcuts`, `size`, `calendarsNumber` | Legacy props: `startDate`, `endDate`, `onStartDateChange`, `onEndDateChange` |

### Display

| Component | Description | Key Props | Restrictions |
|-----------|-------------|-----------|--------------|
| `Badge` | Status indicator | `variant`, `size` | String/number children only |
| `Chip` | Interactive tag | `label`, `selected`, `onRemove`, `icon` | Uses `label` prop, not children |
| `Tag` | Classification | `color`, `variant`, `onDelete` | - |
| `StatusTag` | Predefined status | `status` | No custom text, only predefined statuses |
| `Icon` | Material icon | `name`, `size`, `color`, `baseType` | `name` from `IconsEnum` or string |
| `Typography` | Text styling | `variant`, `color`, `weight` | - |
| `Alert` | Alert message | `variant`, `title`, `description` | Use with `AlertTitle`, `AlertDescription` |
| `Progress` | Progress bar | `value`, `max`, `animated` | - |
| `Skeleton` | Loading placeholder | `variant`, `width`, `height`, `columnCount`, `numberOfItems` | Grid variant supports `columnCount` and `numberOfItems` |
| `Avatar` | User avatar | `src`, `alt`, `fallback` | - |
| `Image` | Image with fallback | `src`, `alt`, `fallback`, `objectFit` | - |

### Navigation

| Component | Description | Key Props | Restrictions |
|-----------|-------------|-----------|--------------|
| `Tabs` | Tab navigation | `value`, `onValueChange`, `defaultValue` | Contains `TabsList`, `TabsTrigger`, `TabsContent` |
| `Pagination` | Page navigation | `currentPage`, `totalPages`, `onPageChange` | - |
| `Stepper` | Step progress | `steps`, `activeStep`, `direction`, `onStepClick` | `activeStep` is **0-indexed**. `onStepClick` returns **1-indexed** `order`. |
| `Breadcrumbs` | Path navigation | `steps`, `onClick` | Array of `{label, onClick}` |

### Containers & Overlays

| Component | Description | Key Props | Restrictions |
|-----------|-------------|-----------|--------------|
| `Card` | Content container | `variant`, `className` | Use `CardHeader`, `CardContent`, `CardFooter` |
| `Modal` | DSR modal | `open`, `onClose`, `title`, `actions` | Simpler API than Dialog |
| `Dialog` | Radix-style dialog | `open`, `onOpenChange` | Compositional with `DialogTrigger`, `DialogContent` |
| `Drawer` | Side panel | `open`, `onClose`, `title`, `placement`, `size` | **Left/right only**. Use Sheet for top/bottom. |
| `Sheet` | Slide panel | `open`, `onOpenChange`, `side` | All sides supported |
| `Tooltip` | Hover tooltip | `content`, `side`, `delayDuration` | Wrap with `TooltipProvider` |
| `Popover` | Click popover | `open`, `onOpenChange` | - |
| `Collapsable` | Expandable | `open`, `onOpenChange`, `title` | - |

### Data Display

| Component | Description | Key Props | Restrictions |
|-----------|-------------|-----------|--------------|
| `DataTable` | Data grid | `columns`, `data`, `enablePagination`, `enableSelection`, `enableSorting`, `enableQuickFilter` | **Each row must have `id` field**. Use `quickFilterPlaceholder` for filter text. |
| `Table` | Simple table | - | HTML-based: `TableHeader`, `TableBody`, `TableRow`, `TableCell` |
| `LineChart` | Line chart | `data`, `xAxisKey`, `series` | Recharts-based |
| `BarChart` | Bar chart | `data`, `series` | Recharts-based |
| `DonutChart` | Donut chart | `data` | Recharts-based |

### Interactive

| Component | Description | Key Props | Restrictions |
|-----------|-------------|-----------|--------------|
| `IconButton` | Icon-only button | `icon`, `onClick`, `tooltip` | - |
| `ActionMenu` | Action dropdown with confirmation | `actions`, `externalActions`, `iconName`, `size`, `placement` | Actions use `onClick` (not `action`). Use `needsConfirm` for destructive actions |
| `DropdownMenu` | Generic dropdown | - | Radix-based composition |
| `ContextMenu` | Right-click menu | - | Radix-based composition |
| `ToggleButton` | Toggle state | `selected`, `onClick`, `icon` | - |
| `ToggleButtonGroup` | Toggle group | `value`, `onValueChange`, `type` | - |

### Feedback

| Component | Description | Key Props | Restrictions |
|-----------|-------------|-----------|--------------|
| `Toaster` | Toast container | - | Place once in app root |
| `useToast` | Toast hook | - | Returns `{ toast }` function |
| `Alert` | Inline alert | `variant`, `title`, `description` | - |
| `BaseMessage` | Status message | `status`, `title`, `description` | - |

### Layout

| Component | Description | Key Props | Restrictions |
|-----------|-------------|-----------|--------------|
| `Separator` | Visual divider | `orientation` | - |
| `Sidebar` | App sidebar | - | 17 subcomponents for composition |
| `PageHeader` | Page header | `title`, `breadcrumbs`, `actions` | - |
| `ScrollArea` | Scrollable area | - | - |
| `AspectRatio` | Aspect container | `ratio` | - |
| `Resizable` | Resizable panels | - | Use `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle` |

### Uploads

| Component | Description | Key Props | Restrictions |
|-----------|-------------|-----------|--------------|
| `Uploader` | File upload | `accept`, `multiple`, `onUpload`, `maxSize` | Use `UPLOADER_ACCEPT_PRESETS` for common file types |
| `FileBox` | File display | `fileName`, `fileSize`, `onRemove`, `onDownload`, `onPreview` | - |

### Advanced

| Component | Description | Key Props | Restrictions |
|-----------|-------------|-----------|--------------|
| `TreeView` | Hierarchical tree | `items`, `defaultExpanded`, `expandedItems`, `onExpandedItemsChange` | Use `leadingContent` on items for checkboxes/badges |
| `RichTextEditor` | WYSIWYG editor | `value`, `onChange`, `placeholder` | - |
| `AdvancedSearchBar` | Search with filters | `placeholder`, `disabled`, `hasError` | - |

---

## Minimal Examples

### Button with Icon
```tsx
import { Button } from '@adsmurai/dsr-react';

<Button variant="default" startIcon="Add">Add Item</Button>
<Button variant="outline" endIcon="OpenInNew">Open Link</Button>
<Button variant="destructive" isLoading>Deleting...</Button>
```

### Form Input
```tsx
import { Input } from '@adsmurai/dsr-react';

<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={!!errors.email}
  helperText={errors.email?.message}
  leadingIcon="Email"
/>
```

### Select
```tsx
import { Select } from '@adsmurai/dsr-react';

<Select
  label="Country"
  value={country}
  onValueChange={setCountry}
  options={[
    { label: 'Spain', value: 'ES' },
    { label: 'France', value: 'FR' },
    { label: 'Germany', value: 'DE' },
  ]}
  clearable
/>
```

### RadioGroup
```tsx
import { RadioGroup, RadioGroupItem } from '@adsmurai/dsr-react';

<RadioGroup value={selected} onValueChange={setSelected}>
  <RadioGroupItem value="option1">Option 1</RadioGroupItem>
  <RadioGroupItem value="option2">Option 2</RadioGroupItem>
  <RadioGroupItem value="option3">Option 3</RadioGroupItem>
</RadioGroup>
```

### Checkbox
```tsx
import { Checkbox } from '@adsmurai/dsr-react';

<Checkbox checked={accepted} onCheckedChange={setAccepted}>
  I accept the terms and conditions
</Checkbox>
```

### Badge
```tsx
import { Badge } from '@adsmurai/dsr-react';

<Badge variant="success">Active</Badge>
<Badge variant="destructive">3</Badge>
<Badge variant="warning">Pending</Badge>
```

### ActionMenu
```tsx
import { ActionMenu } from '@adsmurai/dsr-react';

<ActionMenu
  actions={[
    { id: 'edit', label: 'Edit', onClick: handleEdit, icon: 'Edit' },
    { id: 'delete', label: 'Delete', onClick: handleDelete, variant: 'destructive',
      needsConfirm: true, confirmTitle: 'Delete item', confirmMessage: 'Are you sure?' }
  ]}
/>

// With external actions (visible outside the dropdown)
<ActionMenu
  actions={[{ id: 'archive', label: 'Archive', onClick: handleArchive }]}
  externalActions={[
    { id: 'edit', label: 'Edit', icon: 'Edit', onClick: handleEdit }
  ]}
/>
```

### Chip
```tsx
import { Chip } from '@adsmurai/dsr-react';

// Note: uses label prop, not children
<Chip label="React" selected />
<Chip label="Removable" onRemove={() => handleRemove()} />
<Chip label="With Icon" icon="Star" />
```

### DataTable
```tsx
import { DataTable } from '@adsmurai/dsr-react';

<DataTable
  columns={[
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'status', headerName: 'Status', width: 120 },
  ]}
  data={[
    { id: 1, name: 'Item 1', status: 'active' },
    { id: 2, name: 'Item 2', status: 'pending' },
  ]}
  enablePagination
  enableSelection
  enableSorting
/>
```

### Modal
```tsx
import { Modal, Button } from '@adsmurai/dsr-react';

<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  actions={
    <>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="destructive" onClick={handleDelete}>Delete</Button>
    </>
  }
>
  <p>Are you sure you want to delete this item?</p>
</Modal>
```

### Drawer
```tsx
import { Drawer } from '@adsmurai/dsr-react';

// Note: Only left/right placement. Use Sheet for top/bottom.
<Drawer
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Settings"
  placement="right"
  size="medium"
>
  <SettingsForm />
</Drawer>
```

### Tabs
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@adsmurai/dsr-react';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Stepper
```tsx
import { Stepper } from '@adsmurai/dsr-react';

const [activeStep, setActiveStep] = useState(0); // 0-indexed!

<Stepper
  steps={[
    { title: 'Account', description: 'Create account' },
    { title: 'Profile', description: 'Complete profile' },
    { title: 'Done', description: 'All set!' },
  ]}
  activeStep={activeStep}
  onStepClick={(step) => {
    // step.order is 1-indexed (1, 2, 3...)
    // Convert to 0-indexed for state
    if (step.order !== undefined) {
      setActiveStep(step.order - 1);
    }
  }}
/>

// Navigation buttons
<Button onClick={() => setActiveStep(s => s - 1)} disabled={activeStep === 0}>Back</Button>
<Button onClick={() => setActiveStep(s => s + 1)} disabled={activeStep === 2}>Next</Button>
```

### Icon
```tsx
import { Icon } from '@adsmurai/dsr-react';
import { IconsEnum } from '@adsmurai/dsr-react/enums';

<Icon name={IconsEnum.Add} size="medium" />
<Icon name="Settings" size="small" color="primary" />
```

### DatePicker
```tsx
import { DatePicker } from '@adsmurai/dsr-react';

// Date only
<DatePicker
  value={date}
  onChange={setDate}
  label="Birth Date"
  dateType="date"
/>

// Date and time
<DatePicker
  value={dateTime}
  onChange={setDateTime}
  label="Appointment"
  dateType="dateTime"
  is24Hours
/>

// Time only
<DatePicker
  value={time}
  onChange={setTime}
  label="Meeting Time"
  dateType="time"
  timeSteps={{ minutes: 15 }}
/>
```

### DateRangePicker
```tsx
import { DateRangePicker } from '@adsmurai/dsr-react';

// With shortcuts
<DateRangePicker
  value={dateRange}
  onChange={setDateRange}
  label="Date Range"
  showShortcuts
  orientation="vertical"
/>

// Legacy API (still supported)
<DateRangePicker
  startDate={start}
  endDate={end}
  onStartDateChange={setStart}
  onEndDateChange={setEnd}
/>
```

### Toast
```tsx
import { useToast, Toaster } from '@adsmurai/dsr-react';

// In app root
<Toaster />

// In component
const { toast } = useToast();
toast({
  title: "Success",
  description: "Item saved successfully",
  variant: "default",
});
```

---

## Common Patterns

See [PATTERNS.md](./PATTERNS.md) for complete, copy-paste ready examples including:
- Form with validation (react-hook-form + zod)
- DataTable with actions
- Confirmation modal
- Selection patterns (RadioGroup vs Checkbox)
- Tab navigation
- Stats cards

---

## Enums Reference

Import from `@adsmurai/dsr-react/enums`:

| Enum | Values | Used In |
|------|--------|---------|
| `IconsEnum` | Material Icons keys | `Icon`, `Button` (startIcon/endIcon), `Input` (leadingIcon/trailingIcon) |
| `ButtonVariantEnum` | Filled, Outlined, Standard, Tonal, Error, ErrorOutlined, Brand | Internal mapping |
| `BadgeColorEnum` | Neutral, Success, Warning, Info, Danger | Internal mapping |
| `TagColorsEnum` | Success, Warning, Error, Processing, Default | `Tag` color prop |
| `TagVariantsEnum` | Primary, Secondary | `Tag` variant prop |

---

## Version

This document is for `@adsmurai/dsr-react` version 0.1.x.
