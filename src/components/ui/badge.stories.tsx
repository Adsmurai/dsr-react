import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "DSR Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "success",
        "warning",
        "info",
      ],
      description: "Color variant",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Badge size",
    },
    children: {
      control: "text",
      description: "Badge content (string or number only)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Badge size="xs">XS</Badge>
      <Badge size="sm">SM</Badge>
      <Badge size="md">MD</Badge>
      <Badge size="lg">LG</Badge>
    </div>
  ),
};

export const StatusIndicators: Story = {
  name: "Status Indicators",
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <Badge variant="success">Active</Badge>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="destructive">Error</Badge>
        <Badge variant="default">Inactive</Badge>
      </div>
      <div className="flex gap-4 items-center">
        <Badge variant="info">New</Badge>
        <Badge variant="success">Published</Badge>
        <Badge variant="warning">Draft</Badge>
      </div>
    </div>
  ),
};

export const NumericCounters: Story = {
  name: "Numeric Counters",
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Badge variant="destructive">3</Badge>
      <Badge variant="info">12</Badge>
      <Badge variant="default">99+</Badge>
      <Badge variant="success">0</Badge>
    </div>
  ),
};

export const WithText: Story = {
  name: "With Text Context",
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="font-medium">Notifications</span>
        <Badge variant="destructive" size="sm">
          5
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium">Status:</span>
        <Badge variant="success">Online</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium">Version</span>
        <Badge variant="info" size="sm">
          v2.0
        </Badge>
      </div>
    </div>
  ),
};
