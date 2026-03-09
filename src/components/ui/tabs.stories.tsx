import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import { Input } from "./input";
import { Button } from "./button";

const meta: Meta<typeof Tabs> = {
  title: "DSR Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">
        <h3 className="font-medium mb-2">Account Settings</h3>
        <p className="text-sm text-gray-500">
          Manage your account settings and preferences.
        </p>
      </TabsContent>
      <TabsContent value="tab2" className="p-4">
        <h3 className="font-medium mb-2">Password</h3>
        <p className="text-sm text-gray-500">
          Change your password and security settings.
        </p>
      </TabsContent>
      <TabsContent value="tab3" className="p-4">
        <h3 className="font-medium mb-2">Settings</h3>
        <p className="text-sm text-gray-500">
          Configure your application settings.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const Controlled: Story = {
  name: "Controlled Tabs",
  render: function Render() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
      <div className="space-y-4 w-[400px]">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab("overview")}
          >
            Go to Overview
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab("analytics")}
          >
            Go to Analytics
          </Button>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="p-4">
            Overview content
          </TabsContent>
          <TabsContent value="analytics" className="p-4">
            Analytics content
          </TabsContent>
          <TabsContent value="reports" className="p-4">
            Reports content
          </TabsContent>
        </Tabs>
        <p className="text-sm text-gray-500">Current tab: {activeTab}</p>
      </div>
    );
  },
};

export const WithIcons: Story = {
  name: "With Icons",
  render: () => (
    <Tabs defaultValue="settings" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="settings" icon="Settings">
          Settings
        </TabsTrigger>
        <TabsTrigger value="users" icon="Person">
          Users
        </TabsTrigger>
        <TabsTrigger value="notifications" icon="Notifications">
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="settings" className="p-4">
        Settings content
      </TabsContent>
      <TabsContent value="users" className="p-4">
        Users content
      </TabsContent>
      <TabsContent value="notifications" className="p-4">
        Notifications content
      </TabsContent>
    </Tabs>
  ),
};

export const WithBorder: Story = {
  name: "With Border Bottom",
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList hasBorderBottom>
        <TabsTrigger value="tab1">Profile</TabsTrigger>
        <TabsTrigger value="tab2">Preferences</TabsTrigger>
        <TabsTrigger value="tab3">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">
        Profile content
      </TabsContent>
      <TabsContent value="tab2" className="p-4">
        Preferences content
      </TabsContent>
      <TabsContent value="tab3" className="p-4">
        Billing content
      </TabsContent>
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  name: "With Disabled Tab",
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Active</TabsTrigger>
        <TabsTrigger value="tab2" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="tab3">Also Active</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">
        This tab is active
      </TabsContent>
      <TabsContent value="tab3" className="p-4">
        This tab is also active
      </TabsContent>
    </Tabs>
  ),
};

export const SettingsPage: Story = {
  name: "Settings Page Example",
  render: function Render() {
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("john@example.com");

    return (
      <Tabs defaultValue="profile" className="w-[500px]">
        <TabsList hasBorderBottom>
          <TabsTrigger value="profile" icon="Person">
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" icon="Settings">
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" icon="Notifications">
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="p-4 space-y-4">
          <h3 className="font-medium text-lg">Profile Information</h3>
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button>Save Changes</Button>
        </TabsContent>

        <TabsContent value="account" className="p-4 space-y-4">
          <h3 className="font-medium text-lg">Account Settings</h3>
          <p className="text-sm text-gray-500">
            Manage your account security and preferences.
          </p>
          <Button variant="outline">Change Password</Button>
          <Button variant="destructive">Delete Account</Button>
        </TabsContent>

        <TabsContent value="notifications" className="p-4 space-y-4">
          <h3 className="font-medium text-lg">Notification Preferences</h3>
          <p className="text-sm text-gray-500">
            Choose what notifications you want to receive.
          </p>
        </TabsContent>
      </Tabs>
    );
  },
};

export const ManyTabs: Story = {
  name: "Many Tabs with Scroll",
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList hasScrollButtons>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        <TabsTrigger value="tab4">Tab 4</TabsTrigger>
        <TabsTrigger value="tab5">Tab 5</TabsTrigger>
        <TabsTrigger value="tab6">Tab 6</TabsTrigger>
        <TabsTrigger value="tab7">Tab 7</TabsTrigger>
        <TabsTrigger value="tab8">Tab 8</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">Content 1</TabsContent>
      <TabsContent value="tab2" className="p-4">Content 2</TabsContent>
      <TabsContent value="tab3" className="p-4">Content 3</TabsContent>
      <TabsContent value="tab4" className="p-4">Content 4</TabsContent>
      <TabsContent value="tab5" className="p-4">Content 5</TabsContent>
      <TabsContent value="tab6" className="p-4">Content 6</TabsContent>
      <TabsContent value="tab7" className="p-4">Content 7</TabsContent>
      <TabsContent value="tab8" className="p-4">Content 8</TabsContent>
    </Tabs>
  ),
};
