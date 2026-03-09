import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./radio-group";

const meta: Meta<typeof RadioGroup> = {
  title: "DSR Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
      description: "Layout orientation",
    },
    disabled: {
      control: "boolean",
      description: "Disable entire group",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState("option1");
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <RadioGroupItem value="option1">Option 1</RadioGroupItem>
        <RadioGroupItem value="option2">Option 2</RadioGroupItem>
        <RadioGroupItem value="option3">Option 3</RadioGroupItem>
      </RadioGroup>
    );
  },
};

export const Horizontal: Story = {
  name: "Horizontal Layout",
  render: function Render() {
    const [value, setValue] = useState("a");
    return (
      <RadioGroup value={value} onValueChange={setValue} orientation="horizontal">
        <RadioGroupItem value="a">Option A</RadioGroupItem>
        <RadioGroupItem value="b">Option B</RadioGroupItem>
        <RadioGroupItem value="c">Option C</RadioGroupItem>
      </RadioGroup>
    );
  },
};

export const WithDefaultValue: Story = {
  name: "With Default Value",
  render: () => (
    <RadioGroup defaultValue="medium">
      <RadioGroupItem value="small">Small</RadioGroupItem>
      <RadioGroupItem value="medium">Medium</RadioGroupItem>
      <RadioGroupItem value="large">Large</RadioGroupItem>
    </RadioGroup>
  ),
};

export const WithDisabledItem: Story = {
  name: "With Disabled Item",
  render: function Render() {
    const [value, setValue] = useState("free");
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <RadioGroupItem value="free">Free Plan</RadioGroupItem>
        <RadioGroupItem value="pro">Pro Plan</RadioGroupItem>
        <RadioGroupItem value="enterprise" disabled>
          Enterprise (Coming Soon)
        </RadioGroupItem>
      </RadioGroup>
    );
  },
};

export const DisabledGroup: Story = {
  name: "Disabled Group",
  render: () => (
    <RadioGroup defaultValue="option1" disabled>
      <RadioGroupItem value="option1">Option 1</RadioGroupItem>
      <RadioGroupItem value="option2">Option 2</RadioGroupItem>
      <RadioGroupItem value="option3">Option 3</RadioGroupItem>
    </RadioGroup>
  ),
};

export const PlanSelector: Story = {
  name: "Plan Selector Example",
  render: function Render() {
    const [plan, setPlan] = useState("basic");

    return (
      <div className="space-y-4 w-64">
        <h3 className="font-medium">Select a Plan</h3>
        <RadioGroup value={plan} onValueChange={setPlan}>
          <RadioGroupItem value="basic">Basic - $9/month</RadioGroupItem>
          <RadioGroupItem value="pro">Pro - $19/month</RadioGroupItem>
          <RadioGroupItem value="team">Team - $49/month</RadioGroupItem>
        </RadioGroup>
        <p className="text-sm text-gray-500">
          Selected: <strong>{plan}</strong>
        </p>
      </div>
    );
  },
};

export const ShippingOptions: Story = {
  name: "Shipping Options Example",
  render: function Render() {
    const [shipping, setShipping] = useState("standard");

    return (
      <div className="space-y-4 w-80">
        <h3 className="font-medium">Shipping Method</h3>
        <RadioGroup value={shipping} onValueChange={setShipping}>
          <RadioGroupItem value="standard">Standard (5-7 days) - Free</RadioGroupItem>
          <RadioGroupItem value="express">Express (2-3 days) - $9.99</RadioGroupItem>
          <RadioGroupItem value="overnight">Overnight - $24.99</RadioGroupItem>
        </RadioGroup>
      </div>
    );
  },
};

export const YesNoQuestion: Story = {
  name: "Yes/No Question",
  render: function Render() {
    const [answer, setAnswer] = useState("");

    return (
      <div className="space-y-4">
        <p className="font-medium">Do you agree to the terms?</p>
        <RadioGroup
          value={answer}
          onValueChange={setAnswer}
          orientation="horizontal"
        >
          <RadioGroupItem value="yes">Yes</RadioGroupItem>
          <RadioGroupItem value="no">No</RadioGroupItem>
        </RadioGroup>
      </div>
    );
  },
};
