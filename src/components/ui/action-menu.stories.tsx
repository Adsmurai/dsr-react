import type { Meta, StoryObj } from "@storybook/react";
import { ActionMenu } from "./action-menu";

const meta: Meta<typeof ActionMenu> = {
  title: "DSR Components/ActionMenu",
  component: ActionMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const handleClick = () => {
  console.log("Action clicked");
};

export const Default: Story = {
  args: {
    actions: [
      { id: "edit", label: "Edit", onClick: handleClick, icon: "Edit" },
      {
        id: "duplicate",
        label: "Duplicate",
        onClick: handleClick,
        icon: "ContentCopy",
      },
      { id: "delete", label: "Delete", onClick: handleClick, icon: "Delete" },
    ],
  },
};

export const WithDestructiveConfirmation: Story = {
  name: "With Destructive Confirmation",
  args: {
    actions: [
      { id: "edit", label: "Edit", onClick: handleClick, icon: "Edit" },
      {
        id: "delete",
        label: "Delete",
        icon: "Delete",
        variant: "destructive",
        needsConfirm: true,
        confirmTitle: "Delete item",
        confirmMessage: "Are you sure you want to delete this item? This action cannot be undone.",
        acceptTitle: "Delete",
        onClick: handleClick,
      },
    ],
  },
};

export const WithExternalActions: Story = {
  name: "With External Actions",
  args: {
    actions: [
      { id: "download", label: "Download", onClick: handleClick, icon: "Download" },
      {
        id: "delete",
        label: "Delete",
        onClick: handleClick,
        icon: "Delete",
        variant: "destructive",
      },
    ],
    externalActions: [
      { id: "edit", label: "Edit", icon: "Edit", onClick: handleClick },
      {
        id: "preview",
        label: "Preview",
        icon: "Visibility",
        href: "#",
      },
    ],
  },
};

export const CustomIcon: Story = {
  name: "Custom Trigger Icon",
  args: {
    iconName: "Settings",
    actions: [
      { id: "general", label: "General Settings", onClick: handleClick },
      { id: "security", label: "Security", onClick: handleClick },
      { id: "notifications", label: "Notifications", onClick: handleClick },
    ],
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <ActionMenu
          size="small"
          actions={[
            { id: "edit", label: "Edit", onClick: handleClick },
            { id: "delete", label: "Delete", onClick: handleClick },
          ]}
        />
        <span className="text-xs text-gray-500">Small (32px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ActionMenu
          size="medium"
          actions={[
            { id: "edit", label: "Edit", onClick: handleClick },
            { id: "delete", label: "Delete", onClick: handleClick },
          ]}
        />
        <span className="text-xs text-gray-500">Medium (40px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ActionMenu
          size="large"
          actions={[
            { id: "edit", label: "Edit", onClick: handleClick },
            { id: "delete", label: "Delete", onClick: handleClick },
          ]}
        />
        <span className="text-xs text-gray-500">Large (48px)</span>
      </div>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <ActionMenu
          placement="bottom-start"
          actions={[
            { id: "edit", label: "Edit", onClick: handleClick },
            { id: "delete", label: "Delete", onClick: handleClick },
          ]}
        />
        <span className="text-xs text-gray-500">bottom-start</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ActionMenu
          placement="bottom-end"
          actions={[
            { id: "edit", label: "Edit", onClick: handleClick },
            { id: "delete", label: "Delete", onClick: handleClick },
          ]}
        />
        <span className="text-xs text-gray-500">bottom-end (default)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ActionMenu
          placement="top-end"
          actions={[
            { id: "edit", label: "Edit", onClick: handleClick },
            { id: "delete", label: "Delete", onClick: handleClick },
          ]}
        />
        <span className="text-xs text-gray-500">top-end</span>
      </div>
    </div>
  ),
};

export const DisabledActions: Story = {
  name: "With Disabled Actions",
  args: {
    actions: [
      { id: "edit", label: "Edit", onClick: handleClick, icon: "Edit" },
      {
        id: "publish",
        label: "Share",
        onClick: handleClick,
        icon: "Share",
        disabled: true,
      },
      { id: "delete", label: "Delete", onClick: handleClick, icon: "Delete", variant: "destructive" as const },
    ],
  },
};
