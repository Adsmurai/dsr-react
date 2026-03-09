import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DataTable } from "./data-table";
import type { ExtendedGridColDef, GridRowId } from "./data-table";

const meta: Meta<typeof DataTable> = {
  title: "DSR Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "grid"],
      description: "Visual variant",
    },
    rowHeight: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Row height preset",
    },
    enablePagination: {
      control: "boolean",
      description: "Enable pagination",
    },
    enableSelection: {
      control: "boolean",
      description: "Enable row selection",
    },
    enableSorting: {
      control: "boolean",
      description: "Enable column sorting",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Pending" },
];

const basicColumns: ExtendedGridColDef[] = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "role", headerName: "Role", width: 120 },
  { field: "status", headerName: "Status", width: 100 },
];

export const Default: Story = {
  render: () => (
    <DataTable
      columns={basicColumns}
      data={sampleUsers}
      height={400}
    />
  ),
};

export const WithPagination: Story = {
  name: "With Pagination",
  render: () => {
    const moreUsers = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ["Admin", "User", "Editor"][i % 3],
      status: ["Active", "Inactive", "Pending"][i % 3],
    }));

    return (
      <DataTable
        columns={basicColumns}
        data={moreUsers}
        enablePagination
        pageSizeOptions={[10, 20, 50]}
        height={500}
      />
    );
  },
};

export const WithSelection: Story = {
  name: "With Selection",
  render: function Render() {
    const [selected, setSelected] = useState<GridRowId[]>([]);

    return (
      <div className="space-y-4">
        <DataTable
          columns={basicColumns}
          data={sampleUsers}
          enableSelection
          onSelectChange={setSelected}
          height={400}
        />
        <p className="text-sm text-gray-500">
          Selected: {selected.length > 0 ? selected.join(", ") : "None"}
        </p>
      </div>
    );
  },
};

export const WithSorting: Story = {
  name: "With Sorting",
  render: () => (
    <DataTable
      columns={basicColumns}
      data={sampleUsers}
      enableSorting
      initialSortModel={[{ field: "name", sort: "asc" }]}
      height={400}
    />
  ),
};

export const WithTopBar: Story = {
  name: "With Top Bar",
  render: () => (
    <DataTable
      columns={basicColumns}
      data={sampleUsers}
      title="Users"
      subtitle="Manage your team members"
      enablePagination
      pageSizeOptions={[5, 10]}
      height={450}
    />
  ),
};

export const WithBulkActions: Story = {
  name: "With Bulk Actions",
  render: function Render() {
    const [data, setData] = useState(sampleUsers);

    return (
      <DataTable
        columns={basicColumns}
        data={data}
        enableSelection
        title="Users with Bulk Actions"
        getBulkActionsFromItems={(items) => [
          {
            id: "activate",
            label: `Activate ${items.length} users`,
            level: "success",
            action: async () => {
              setData((prev) =>
                prev.map((user) =>
                  items.some((i) => i.id === user.id)
                    ? { ...user, status: "Active" }
                    : user
                )
              );
              return { type: "success", message: "Users activated!" };
            },
          },
          {
            id: "delete",
            label: `Delete ${items.length} users`,
            level: "error",
            action: async () => {
              setData((prev) =>
                prev.filter((user) => !items.some((i) => i.id === user.id))
              );
              return { type: "success", message: "Users deleted!" };
            },
          },
        ]}
        height={450}
      />
    );
  },
};

export const WithExpandableRows: Story = {
  name: "With Expandable Rows",
  render: () => {
    const usersWithDetails = sampleUsers.map((user) => ({
      ...user,
      createdAt: "2024-01-15",
      lastLogin: "2024-03-01",
      department: "Engineering",
    }));

    return (
      <DataTable
        columns={basicColumns}
        data={usersWithDetails}
        getDetailPanelContent={({ row }) => (
          <div className="p-4 bg-gray-50">
            <h4 className="font-medium mb-2">User Details</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Created:</span> {row.createdAt}
              </div>
              <div>
                <span className="text-gray-500">Last Login:</span> {row.lastLogin}
              </div>
              <div>
                <span className="text-gray-500">Department:</span> {row.department}
              </div>
            </div>
          </div>
        )}
        getDetailPanelHeight={() => "auto"}
        height={500}
      />
    );
  },
};

export const EmptyState: Story = {
  name: "Empty State",
  render: () => (
    <DataTable
      columns={basicColumns}
      data={[]}
      emptyTitle="No users found"
      emptySubtitle="Get started by adding your first user"
      emptyCtaText="Add User"
      onEmptyRefresh={() => alert("Add user clicked")}
      height={400}
    />
  ),
};

export const Loading: Story = {
  name: "Loading State",
  render: () => (
    <DataTable
      columns={basicColumns}
      data={[]}
      loading
      height={400}
    />
  ),
};

export const RowHeights: Story = {
  name: "Row Heights",
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-medium mb-2">Small</h3>
        <DataTable
          columns={basicColumns}
          data={sampleUsers.slice(0, 3)}
          rowHeight="small"
          height={200}
        />
      </div>
      <div>
        <h3 className="font-medium mb-2">Medium (default)</h3>
        <DataTable
          columns={basicColumns}
          data={sampleUsers.slice(0, 3)}
          rowHeight="medium"
          height={220}
        />
      </div>
      <div>
        <h3 className="font-medium mb-2">Large</h3>
        <DataTable
          columns={basicColumns}
          data={sampleUsers.slice(0, 3)}
          rowHeight="large"
          height={250}
        />
      </div>
    </div>
  ),
};

export const ProductsTable: Story = {
  name: "Products Example",
  render: () => {
    const products = [
      { id: 1, name: "Laptop Pro", sku: "LP-001", price: 1299, stock: 45, category: "Electronics" },
      { id: 2, name: "Wireless Mouse", sku: "WM-002", price: 49, stock: 150, category: "Accessories" },
      { id: 3, name: "USB-C Cable", sku: "UC-003", price: 19, stock: 300, category: "Accessories" },
      { id: 4, name: "Monitor 27\"", sku: "MN-004", price: 399, stock: 20, category: "Electronics" },
      { id: 5, name: "Keyboard", sku: "KB-005", price: 89, stock: 75, category: "Accessories" },
    ];

    const columns: ExtendedGridColDef[] = [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Product", flex: 1 },
      { field: "sku", headerName: "SKU", width: 100 },
      {
        field: "price",
        headerName: "Price",
        width: 100,
        valueFormatter: (value) => `$${value}`,
      },
      {
        field: "stock",
        headerName: "Stock",
        width: 100,
        cellClassName: (params) =>
          params.value < 30 ? "text-red-500" : "text-green-500",
      },
      { field: "category", headerName: "Category", width: 120 },
    ];

    return (
      <DataTable
        columns={columns}
        data={products}
        title="Products"
        enableSorting
        enableSelection
        enablePagination
        pageSizeOptions={[5, 10]}
        height={400}
      />
    );
  },
};

export const FullFeatured: Story = {
  name: "Full Featured",
  render: function Render() {
    const [selected, setSelected] = useState<GridRowId[]>([]);
    const [page, setPage] = useState(0);

    const allUsers = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ["Admin", "User", "Editor", "Viewer"][i % 4],
      status: ["Active", "Inactive", "Pending"][i % 3],
      createdAt: new Date(2024, 0, 1 + i).toISOString().split("T")[0],
    }));

    const columns: ExtendedGridColDef[] = [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Name", flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },
      { field: "role", headerName: "Role", width: 100 },
      { field: "status", headerName: "Status", width: 100 },
      { field: "createdAt", headerName: "Created", width: 110 },
    ];

    return (
      <div className="space-y-4">
        <DataTable
          columns={columns}
          data={allUsers}
          title="All Users"
          subtitle={`${allUsers.length} total users`}
          enablePagination
          pageSizeOptions={[10, 25, 50, 100]}
          currentPage={page}
          onPageChange={setPage}
          enableSelection
          onSelectChange={setSelected}
          enableSorting
          initialSortModel={[{ field: "createdAt", sort: "desc" }]}
          getBulkActionsFromItems={(items) => [
            {
              id: "export",
              label: `Export ${items.length} users`,
              level: "info",
              action: async () => ({ type: "success", message: "Exported!" }),
            },
          ]}
          height={500}
        />
        <div className="text-sm text-gray-500">
          Page: {page + 1} | Selected: {selected.length} users
        </div>
      </div>
    );
  },
};
