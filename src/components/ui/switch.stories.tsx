import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Switch } from "./switch";

const meta: Meta<typeof Switch> = {
  title: "DSR Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Switch state",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex items-center gap-3">
        <Switch checked={checked} onCheckedChange={setChecked} />
        <span>{checked ? "On" : "Off"}</span>
      </div>
    );
  },
};

export const Controlled: Story = {
  name: "Controlled",
  render: function Render() {
    const [checked, setChecked] = useState(true);
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Switch checked={checked} onCheckedChange={setChecked} />
          <span>Switch is {checked ? "enabled" : "disabled"}</span>
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 text-sm bg-gray-100 rounded"
            onClick={() => setChecked(true)}
          >
            Turn On
          </button>
          <button
            className="px-3 py-1 text-sm bg-gray-100 rounded"
            onClick={() => setChecked(false)}
          >
            Turn Off
          </button>
        </div>
      </div>
    );
  },
};

export const WithLabel: Story = {
  name: "With Label",
  render: function Render() {
    const [darkMode, setDarkMode] = useState(false);
    return (
      <div className="flex items-center gap-3">
        <Switch checked={darkMode} onCheckedChange={setDarkMode} id="dark-mode" />
        <label htmlFor="dark-mode" className="cursor-pointer">
          Dark Mode
        </label>
      </div>
    );
  },
};

export const DisabledStates: Story = {
  name: "Disabled States",
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Switch checked={false} disabled />
        <span className="text-gray-400">Disabled (off)</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch checked={true} disabled />
        <span className="text-gray-400">Disabled (on)</span>
      </div>
    </div>
  ),
};

export const DefaultChecked: Story = {
  name: "Default Checked",
  render: function Render() {
    const [checked, setChecked] = useState<boolean | undefined>(undefined);
    return (
      <div className="flex items-center gap-3">
        <Switch
          defaultChecked={true}
          onCheckedChange={(c) => setChecked(c)}
        />
        <span>Starts enabled (changed: {checked === undefined ? "no" : String(checked)})</span>
      </div>
    );
  },
};

export const SettingsExample: Story = {
  name: "Settings Example",
  render: function Render() {
    const [settings, setSettings] = useState({
      notifications: true,
      marketing: false,
      security: true,
      autoUpdate: false,
    });

    const toggleSetting = (key: keyof typeof settings) => {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div className="w-80 space-y-4">
        <h3 className="font-medium text-lg">Notification Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-gray-500">Receive push notifications</p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={() => toggleSetting("notifications")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Marketing Emails</p>
              <p className="text-sm text-gray-500">Receive marketing emails</p>
            </div>
            <Switch
              checked={settings.marketing}
              onCheckedChange={() => toggleSetting("marketing")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Security Alerts</p>
              <p className="text-sm text-gray-500">Get alerted about security</p>
            </div>
            <Switch
              checked={settings.security}
              onCheckedChange={() => toggleSetting("security")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto Updates</p>
              <p className="text-sm text-gray-500">Automatically update apps</p>
            </div>
            <Switch
              checked={settings.autoUpdate}
              onCheckedChange={() => toggleSetting("autoUpdate")}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const FeatureToggle: Story = {
  name: "Feature Toggle",
  render: function Render() {
    const [enabled, setEnabled] = useState(false);

    return (
      <div className="w-96 p-4 border rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium">Advanced Mode</h3>
            <p className="text-sm text-gray-500">
              Enable advanced features for power users
            </p>
          </div>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </div>
        {enabled && (
          <div className="p-3 bg-blue-50 rounded-md text-sm text-blue-700">
            Advanced features are now available! You can access the power
            user panel.
          </div>
        )}
      </div>
    );
  },
};
