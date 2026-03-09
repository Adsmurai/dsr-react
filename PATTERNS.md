# Common Patterns for @adsmurai/dsr-react

> Complete, copy-paste ready examples for common use cases.

## Table of Contents

1. [Form with Validation](#1-form-with-validation)
2. [DataTable with Actions](#2-datatable-with-actions)
3. [Confirmation Modal](#3-confirmation-modal)
4. [Selection Patterns](#4-selection-patterns)
5. [Tab Navigation](#5-tab-navigation)
6. [Stats Cards](#6-stats-cards)
7. [Search with Filters](#7-search-with-filters)
8. [Sidebar Layout](#8-sidebar-layout)

---

## 1. Form with Validation

Using react-hook-form and zod for form validation.

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Button,
  Input,
  Select,
  Checkbox,
  Textarea,
} from '@adsmurai/dsr-react';

// 1. Define schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  country: z.string().min(1, 'Please select a country'),
  bio: z.string().max(500, 'Bio must be under 500 characters').optional(),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms'),
});

type FormData = z.infer<typeof formSchema>;

// 2. Country options
const countryOptions = [
  { label: 'Spain', value: 'ES' },
  { label: 'France', value: 'FR' },
  { label: 'Germany', value: 'DE' },
  { label: 'Italy', value: 'IT' },
];

// 3. Component
export function UserForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      country: '',
      bio: '',
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log('Form submitted:', data);
    // await api.createUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      {/* Name Input */}
      <Input
        label="Name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      {/* Email Input */}
      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        leadingIcon="Email"
      />

      {/* Country Select */}
      <Select
        label="Country"
        value={watch('country')}
        onValueChange={(value) => setValue('country', value, { shouldValidate: true })}
        options={countryOptions}
        error={!!errors.country}
        helperText={errors.country?.message}
      />

      {/* Bio Textarea */}
      <Textarea
        label="Bio (optional)"
        {...register('bio')}
        withCounter
        maxCounter={500}
        error={!!errors.bio}
        helperText={errors.bio?.message}
      />

      {/* Terms Checkbox */}
      <Checkbox
        checked={watch('acceptTerms')}
        onCheckedChange={(checked) => setValue('acceptTerms', checked, { shouldValidate: true })}
      >
        I accept the terms and conditions
      </Checkbox>
      {errors.acceptTerms && (
        <p className="text-sm text-red-500">{errors.acceptTerms.message}</p>
      )}

      {/* Submit Button */}
      <Button type="submit" isLoading={isSubmitting} fullWidth>
        Submit
      </Button>
    </form>
  );
}
```

### Variations

**Inline Form (horizontal layout)**:
```tsx
<form className="flex gap-4 items-end">
  <Input label="Search" className="flex-1" />
  <Select
    label="Filter"
    options={filterOptions}
    value={filter}
    onValueChange={setFilter}
    className="w-40"
  />
  <Button type="submit">Search</Button>
</form>
```

**Form with Server-side Validation**:
```tsx
const onSubmit = async (data: FormData) => {
  try {
    await api.createUser(data);
    toast({ title: 'Success', description: 'User created!' });
  } catch (error) {
    if (error.field === 'email') {
      setError('email', { message: 'Email already exists' });
    }
  }
};
```

---

## 2. DataTable with Actions

Complete DataTable with selection, sorting, pagination, and bulk actions.

```tsx
import { useState, useMemo } from 'react';
import { DataTable, Badge, IconButton, useToast } from '@adsmurai/dsr-react';
import type { ExtendedGridColDef, GridRowId } from '@adsmurai/dsr-react/types';

// 1. Define your data type
interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

// 2. Sample data (each row MUST have an `id` field)
const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', createdAt: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'pending', createdAt: '2024-01-16' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'inactive', createdAt: '2024-01-17' },
];

// 3. Component
export function UsersTable() {
  const { toast } = useToast();
  const [selectedIds, setSelectedIds] = useState<GridRowId[]>([]);

  // Column definitions
  const columns: ExtendedGridColDef[] = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {
        const variant = {
          active: 'success',
          inactive: 'default',
          pending: 'warning',
        }[params.value as string] as 'success' | 'default' | 'warning';
        return <Badge variant={variant}>{params.value}</Badge>;
      },
    },
    { field: 'createdAt', headerName: 'Created', width: 120 },
    {
      field: 'actions',
      headerName: '',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-1">
          <IconButton
            icon="Edit"
            tooltip="Edit"
            onClick={() => handleEdit(params.row)}
          />
          <IconButton
            icon="Delete"
            tooltip="Delete"
            onClick={() => handleDelete(params.row.id)}
          />
        </div>
      ),
    },
  ], []);

  // Handlers
  const handleEdit = (user: User) => {
    console.log('Edit user:', user);
  };

  const handleDelete = async (id: number) => {
    console.log('Delete user:', id);
  };

  // Bulk actions
  const getBulkActions = (selectedItems: User[]) => [
    {
      id: 'export',
      label: `Export ${selectedItems.length} users`,
      level: 'default' as const,
      action: async () => {
        // Export logic here
        return { type: 'success' as const, message: 'Exported successfully!' };
      },
    },
    {
      id: 'delete',
      label: 'Delete selected',
      level: 'error' as const,
      action: async () => {
        // Delete logic here
        return { type: 'success' as const, message: 'Users deleted!' };
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={users}
      enablePagination
      pageSizeOptions={[10, 20, 50]}
      enableSelection
      rowSelectionModel={selectedIds}
      onSelectChange={setSelectedIds}
      enableSorting
      getBulkActionsFromItems={getBulkActions}
      onResponseBulkAction={(id, response) => {
        if (response && 'message' in response) {
          toast({ title: 'Success', description: response.message });
        }
      }}
      title="Users"
      subtitle={`${users.length} total users`}
      emptyTitle="No users found"
      emptySubtitle="Create your first user to get started"
      height={500}
    />
  );
}
```

### Variations

**Server-side Pagination**:
```tsx
const [page, setPage] = useState(0);
const [pageSize, setPageSize] = useState(20);
const { data, total, isLoading } = useQuery(['users', page, pageSize], () =>
  fetchUsers({ page, pageSize })
);

<DataTable
  columns={columns}
  data={data}
  enableServerMode
  enablePagination
  currentPage={page}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
  rowCount={total}
  loading={isLoading}
/>
```

**Row Actions with ActionMenu** (recommended over multiple IconButtons):
```tsx
import { ActionMenu } from '@adsmurai/dsr-react';

const columns: ExtendedGridColDef[] = [
  // ...other columns
  {
    field: 'actions',
    headerName: '',
    width: 60,
    sortable: false,
    renderCell: (params) => (
      <ActionMenu
        actions={[
          { id: 'edit', label: 'Edit', icon: 'Edit', onClick: () => handleEdit(params.row) },
          { id: 'duplicate', label: 'Duplicate', icon: 'ContentCopy', onClick: () => handleDuplicate(params.row) },
          {
            id: 'delete',
            label: 'Delete',
            icon: 'Delete',
            variant: 'destructive',
            needsConfirm: true,
            confirmTitle: 'Delete item',
            confirmMessage: `Are you sure you want to delete "${params.row.name}"?`,
            onClick: () => handleDelete(params.row.id),
          },
        ]}
      />
    ),
  },
];
```

**Expandable Rows**:
```tsx
<DataTable
  columns={columns}
  data={orders}
  getDetailPanelContent={({ row }) => (
    <div className="p-4 bg-gray-50">
      <h4 className="font-medium mb-2">Order Items</h4>
      <ul>
        {row.items.map((item) => (
          <li key={item.id}>{item.name} x{item.quantity}</li>
        ))}
      </ul>
    </div>
  )}
  getDetailPanelHeight={() => 'auto'}
/>
```

---

## 3. Confirmation Modal

Reusable confirmation modal pattern.

```tsx
import { useState } from 'react';
import { Modal, Button } from '@adsmurai/dsr-react';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'default';
  isLoading?: boolean;
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      status={variant === 'danger' ? 'error' : undefined}
      actions={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'destructive' : 'default'}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <p>{description}</p>
    </Modal>
  );
}

// Usage
function MyComponent() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await api.deleteItem(itemId);
      setIsDeleteOpen(false);
      toast({ title: 'Deleted', description: 'Item has been deleted.' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>
        Delete
      </Button>

      <ConfirmModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Item?"
        description="This action cannot be undone. The item will be permanently deleted."
        confirmText="Delete"
        variant="danger"
        isLoading={isDeleting}
      />
    </>
  );
}
```

### Using Dialog (compositional pattern)

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Button,
} from '@adsmurai/dsr-react';

<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Item?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
      <Button variant="destructive" onClick={handleDelete}>
        Delete
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## 4. Selection Patterns

### Single Selection (RadioGroup)

Use when user must choose exactly one option.

```tsx
import { useState } from 'react';
import { RadioGroup, RadioGroupItem, Button } from '@adsmurai/dsr-react';

export function PlanSelector() {
  const [selectedPlan, setSelectedPlan] = useState('basic');

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Select a plan</h3>

      <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
        <RadioGroupItem value="basic">Basic - $9/month</RadioGroupItem>
        <RadioGroupItem value="pro">Pro - $19/month</RadioGroupItem>
        <RadioGroupItem value="enterprise">Enterprise - $49/month</RadioGroupItem>
      </RadioGroup>

      <Button onClick={() => console.log('Selected:', selectedPlan)}>
        Continue with {selectedPlan}
      </Button>
    </div>
  );
}
```

### Multiple Selection (Checkbox)

Use when user can select zero or more options.

```tsx
import { useState } from 'react';
import { Checkbox, Button } from '@adsmurai/dsr-react';

const features = [
  { id: 'analytics', label: 'Analytics Dashboard' },
  { id: 'api', label: 'API Access' },
  { id: 'support', label: 'Priority Support' },
  { id: 'backup', label: 'Daily Backups' },
];

export function FeatureSelector() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['analytics']);

  const toggleFeature = (featureId: string, checked: boolean) => {
    setSelectedFeatures(prev =>
      checked
        ? [...prev, featureId]
        : prev.filter(id => id !== featureId)
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Select features</h3>

      <div className="space-y-2">
        {features.map((feature) => (
          <Checkbox
            key={feature.id}
            checked={selectedFeatures.includes(feature.id)}
            onCheckedChange={(checked) => toggleFeature(feature.id, checked)}
          >
            {feature.label}
          </Checkbox>
        ))}
      </div>

      <p className="text-sm text-gray-500">
        {selectedFeatures.length} features selected
      </p>
    </div>
  );
}
```

### Multi-Select Dropdown

Use Select with `isMulti` for compact multi-selection.

```tsx
import { Select } from '@adsmurai/dsr-react';

const tagOptions = [
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Node.js', value: 'nodejs' },
  { label: 'GraphQL', value: 'graphql' },
];

export function TagSelector() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <Select
      label="Tags"
      isMulti
      value={selectedTags}
      onMultiValueChange={setSelectedTags}
      options={tagOptions}
      clearable
      checkBox
    />
  );
}
```

---

## 5. Tab Navigation

### Basic Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@adsmurai/dsr-react';

export function SettingsTabs() {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="mt-4">
        <GeneralSettings />
      </TabsContent>

      <TabsContent value="security" className="mt-4">
        <SecuritySettings />
      </TabsContent>

      <TabsContent value="notifications" className="mt-4">
        <NotificationSettings />
      </TabsContent>

      <TabsContent value="billing" className="mt-4">
        <BillingSettings />
      </TabsContent>
    </Tabs>
  );
}
```

### Controlled Tabs with URL sync

```tsx
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@adsmurai/dsr-react';

export function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'general';

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange}>
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="general">...</TabsContent>
      <TabsContent value="security">...</TabsContent>
    </Tabs>
  );
}
```

---

## 6. Stats Cards

Dashboard statistics display.

```tsx
import { Card, CardHeader, CardTitle, CardContent, Badge, Icon } from '@adsmurai/dsr-react';
import { IconsEnum } from '@adsmurai/dsr-react/enums';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: keyof typeof IconsEnum;
}

function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <Icon name={IconsEnum[icon]} size="small" color="secondary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <Icon
              name={change >= 0 ? IconsEnum.TrendingUp : IconsEnum.TrendingDown}
              size="extra-small"
            />
            <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
            <span>vs last month</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// Usage
export function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Revenue"
        value="$45,231"
        change={12.5}
        icon="AttachMoney"
      />
      <StatCard
        title="Active Users"
        value="2,350"
        change={8.2}
        icon="People"
      />
      <StatCard
        title="Conversion Rate"
        value="3.2%"
        change={-2.1}
        icon="TrendingUp"
      />
      <StatCard
        title="Avg. Order Value"
        value="$125"
        change={4.3}
        icon="ShoppingCart"
      />
    </div>
  );
}
```

---

## 7. Search with Filters

Search bar with filter chips.

```tsx
import { useState } from 'react';
import { InputSearch, Chip, Select, Button } from '@adsmurai/dsr-react';

interface Filter {
  id: string;
  label: string;
  value: string;
}

export function SearchWithFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const addFilter = (type: string, value: string, label: string) => {
    if (!value) return;
    const newFilter = { id: `${type}-${value}`, label: `${type}: ${label}`, value };
    setActiveFilters(prev => [...prev.filter(f => !f.id.startsWith(type)), newFilter]);
  };

  const removeFilter = (filterId: string) => {
    setActiveFilters(prev => prev.filter(f => f.id !== filterId));
    // Reset the corresponding select
    if (filterId.startsWith('status')) setStatusFilter('');
    if (filterId.startsWith('category')) setCategoryFilter('');
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setStatusFilter('');
    setCategoryFilter('');
    setSearchQuery('');
  };

  return (
    <div className="space-y-4">
      {/* Search and filters row */}
      <div className="flex gap-4 flex-wrap">
        <InputSearch
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-64"
        />

        <Select
          label="Status"
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
            const option = statusOptions.find(o => o.value === value);
            if (option) addFilter('status', value, option.label);
          }}
          options={statusOptions}
          className="w-40"
          clearable
        />

        <Select
          label="Category"
          value={categoryFilter}
          onValueChange={(value) => {
            setCategoryFilter(value);
            const option = categoryOptions.find(o => o.value === value);
            if (option) addFilter('category', value, option.label);
          }}
          options={categoryOptions}
          className="w-40"
          clearable
        />
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-sm text-gray-500">Filters:</span>
          {activeFilters.map((filter) => (
            <Chip
              key={filter.id}
              label={filter.label}
              onRemove={() => removeFilter(filter.id)}
            />
          ))}
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
];

const categoryOptions = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Books', value: 'books' },
];
```

---

## 8. Sidebar Layout

App layout with collapsible sidebar.

```tsx
import { useState } from 'react';
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  Icon,
} from '@adsmurai/dsr-react';
import { IconsEnum } from '@adsmurai/dsr-react/enums';

const menuItems = [
  { icon: IconsEnum.Dashboard, label: 'Dashboard', href: '/' },
  { icon: IconsEnum.People, label: 'Users', href: '/users' },
  { icon: IconsEnum.Inventory, label: 'Products', href: '/products' },
  { icon: IconsEnum.BarChart, label: 'Analytics', href: '/analytics' },
  { icon: IconsEnum.Settings, label: 'Settings', href: '/settings' },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [currentPath, setCurrentPath] = useState('/');

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader className="p-4">
            <h1 className="text-xl font-bold">My App</h1>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        isActive={currentPath === item.href}
                        onClick={() => setCurrentPath(item.href)}
                      >
                        <Icon name={item.icon} />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <div className="flex items-center gap-2">
              <Avatar src="/avatar.jpg" fallback="JD" />
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <header className="border-b p-4 flex items-center gap-4">
            <SidebarTrigger />
            <h2 className="text-lg font-medium">
              {menuItems.find(i => i.href === currentPath)?.label}
            </h2>
          </header>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
```

---

## Tips for AI Tools

1. **Always import from the correct paths**:
   - Components: `@adsmurai/dsr-react`
   - Enums: `@adsmurai/dsr-react/enums`
   - Types: `@adsmurai/dsr-react/types`

2. **String-only children**: Button, Badge, Checkbox, RadioGroupItem only accept strings

3. **DataTable requires id**: Every row object must have an `id` field

4. **Chip uses label prop**: `<Chip label="Text" />` not `<Chip>Text</Chip>`

5. **Drawer is left/right only**: Use Sheet for top/bottom panels

6. **Select uses options array**: Not children-based composition

See [AI-INSTRUCTIONS.md](./AI-INSTRUCTIONS.md) for the complete reference.
