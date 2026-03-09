import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "./sheet";
import { Button } from "./button";
import { Input } from "./input";

const meta: Meta<typeof Sheet> = {
  title: "Custom Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            This is a description of the sheet content.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>Sheet content goes here.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const FromLeft: Story = {
  name: "From Left",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open from Left</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav className="py-4 space-y-2">
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-100">
            Dashboard
          </a>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-100">
            Projects
          </a>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-100">
            Settings
          </a>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-100">
            Help
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  ),
};

export const FromTop: Story = {
  name: "From Top",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open from Top</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-gray-500">You have 3 new notifications.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const FromBottom: Story = {
  name: "From Bottom",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open from Bottom</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Quick Actions</SheetTitle>
        </SheetHeader>
        <div className="py-4 flex gap-4 justify-center">
          <Button variant="outline">Share</Button>
          <Button variant="outline">Copy Link</Button>
          <Button variant="outline">Download</Button>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const WithForm: Story = {
  name: "With Form",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Edit Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <Input label="Name" placeholder="John Doe" />
          <Input label="Email" type="email" placeholder="john@example.com" />
          <Input label="Username" placeholder="@johndoe" />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const FilterPanel: Story = {
  name: "Filter Panel",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Filters</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Narrow down results with filters.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <div>
            <label className="text-sm font-medium">Status</label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Active</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Pending</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Completed</span>
              </label>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Date Range</label>
            <div className="mt-2 space-y-2">
              <Input type="date" label="From" />
              <Input type="date" label="To" />
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline">Reset</Button>
          <Button>Apply Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const SettingsPanel: Story = {
  name: "Settings Panel",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">Settings</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Manage your preferences.</SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifications</p>
              <p className="text-sm text-gray-500">Receive email notifications</p>
            </div>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-gray-500">Use dark theme</p>
            </div>
            <input type="checkbox" className="toggle" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-save</p>
              <p className="text-sm text-gray-500">Save changes automatically</p>
            </div>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const AllSides: Story = {
  name: "All Sides Demo",
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Right (default)</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>From Right</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Left</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>From Left</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Top</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>From Top</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>From Bottom</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  ),
};
