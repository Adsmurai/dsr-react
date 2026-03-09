import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "DSR Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "ghost",
        "secondary",
        "destructive",
        "destructive-outline",
        "brand",
        "link",
      ],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["default", "sm", "md", "lg"],
      description: "Button size",
    },
    isLoading: {
      control: "boolean",
      description: "Shows loading spinner",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
    },
    fullWidth: {
      control: "boolean",
      description: "Button takes full width",
    },
    startIcon: {
      control: "select",
      options: [undefined, "Add", "Edit", "Delete", "Search", "Settings"],
      description: "Icon at the start (IconsEnum name)",
    },
    endIcon: {
      control: "select",
      options: [undefined, "OpenInNew", "ArrowForward", "Download"],
      description: "Icon at the end (IconsEnum name)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
  },
};

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="destructive-outline">Destructive Outline</Button>
      <Button variant="brand">Brand</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  name: "With Icons",
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button startIcon="Add">Add Item</Button>
      <Button endIcon="OpenInNew">Open Link</Button>
      <Button startIcon="Download" endIcon="ArrowForward">
        Download
      </Button>
    </div>
  ),
};

export const LoadingState: Story = {
  name: "Loading State",
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button isLoading>Loading...</Button>
      <Button variant="outline" isLoading>
        Processing
      </Button>
      <Button variant="destructive" isLoading>
        Deleting
      </Button>
    </div>
  ),
};

export const DisabledState: Story = {
  name: "Disabled State",
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>
        Disabled
      </Button>
      <Button variant="destructive" disabled>
        Disabled
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  name: "Full Width",
  render: () => (
    <div className="w-80 space-y-2">
      <Button fullWidth>Full Width Button</Button>
      <Button variant="outline" fullWidth>
        Full Width Outline
      </Button>
    </div>
  ),
};

export const ButtonHierarchy: Story = {
  name: "Button Hierarchy (Usage Pattern)",
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 mb-4">
        Use only ONE primary action per section. Secondary and tertiary actions
        support the primary.
      </p>
      <div className="flex gap-2">
        <Button variant="default">Save Changes</Button>
        <Button variant="outline">Preview</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
      <div className="flex gap-2 mt-4 pt-4 border-t">
        <Button variant="destructive">Delete</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
    </div>
  ),
};
