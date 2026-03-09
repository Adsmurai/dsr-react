import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "DSR Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Checkbox state",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    indeterminate: {
      control: "boolean",
      description: 'Indeterminate state (for "select all")',
    },
    rounded: {
      control: "boolean",
      description: "Use rounded style",
    },
    children: {
      control: "text",
      description: "Label text (string only)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox checked={checked} onCheckedChange={setChecked}>
        Accept terms and conditions
      </Checkbox>
    );
  },
};

export const Checked: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(true);
    return (
      <Checkbox checked={checked} onCheckedChange={setChecked}>
        This is checked
      </Checkbox>
    );
  },
};

export const Rounded: Story = {
  name: "Rounded Style",
  render: function Render() {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox checked={checked} onCheckedChange={setChecked} rounded>
        Rounded checkbox
      </Checkbox>
    );
  },
};

export const Disabled: Story = {
  name: "Disabled States",
  render: () => (
    <div className="space-y-3">
      <Checkbox checked={false} disabled>
        Disabled unchecked
      </Checkbox>
      <Checkbox checked={true} disabled>
        Disabled checked
      </Checkbox>
    </div>
  ),
};

export const Indeterminate: Story = {
  name: "Indeterminate State",
  render: function Render() {
    const [items, setItems] = useState({
      item1: true,
      item2: false,
      item3: true,
    });

    const allChecked = Object.values(items).every(Boolean);
    const someChecked = Object.values(items).some(Boolean) && !allChecked;

    const handleSelectAll = (checked: boolean) => {
      setItems({ item1: checked, item2: checked, item3: checked });
    };

    return (
      <div className="space-y-3">
        <Checkbox
          checked={allChecked}
          indeterminate={someChecked}
          onCheckedChange={handleSelectAll}
        >
          Select all
        </Checkbox>
        <div className="ml-6 space-y-2">
          <Checkbox
            checked={items.item1}
            onCheckedChange={(c) => setItems({ ...items, item1: c })}
          >
            Item 1
          </Checkbox>
          <Checkbox
            checked={items.item2}
            onCheckedChange={(c) => setItems({ ...items, item2: c })}
          >
            Item 2
          </Checkbox>
          <Checkbox
            checked={items.item3}
            onCheckedChange={(c) => setItems({ ...items, item3: c })}
          >
            Item 3
          </Checkbox>
        </div>
      </div>
    );
  },
};

export const WithoutLabel: Story = {
  name: "Without Label",
  render: function Render() {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex items-center gap-2">
        <Checkbox checked={checked} onCheckedChange={setChecked} />
        <span>Custom label outside</span>
      </div>
    );
  },
};

export const MultipleOptions: Story = {
  name: "Multiple Options",
  render: function Render() {
    const [features, setFeatures] = useState<string[]>(["analytics"]);

    const toggleFeature = (feature: string, checked: boolean) => {
      setFeatures((prev) =>
        checked ? [...prev, feature] : prev.filter((f) => f !== feature)
      );
    };

    const allFeatures = [
      { id: "analytics", label: "Analytics Dashboard" },
      { id: "api", label: "API Access" },
      { id: "support", label: "Priority Support" },
      { id: "backup", label: "Daily Backups" },
    ];

    return (
      <div className="space-y-4">
        <h3 className="font-medium">Select Features</h3>
        <div className="space-y-2">
          {allFeatures.map((feature) => (
            <Checkbox
              key={feature.id}
              checked={features.includes(feature.id)}
              onCheckedChange={(checked) => toggleFeature(feature.id, checked)}
            >
              {feature.label}
            </Checkbox>
          ))}
        </div>
        <p className="text-sm text-gray-500">
          Selected: {features.length} feature(s)
        </p>
      </div>
    );
  },
};

export const TermsAcceptance: Story = {
  name: "Terms Acceptance",
  render: function Render() {
    const [terms, setTerms] = useState(false);
    const [newsletter, setNewsletter] = useState(false);

    return (
      <div className="space-y-4 w-80">
        <Checkbox checked={terms} onCheckedChange={setTerms}>
          I accept the terms and conditions
        </Checkbox>
        <Checkbox checked={newsletter} onCheckedChange={setNewsletter}>
          Subscribe to newsletter
        </Checkbox>
        <button
          disabled={!terms}
          className={`w-full py-2 rounded ${
            terms
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    );
  },
};
