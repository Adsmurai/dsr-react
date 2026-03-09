import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "DSR Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Field label",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    helperText: {
      control: "text",
      description: "Helper text below input",
    },
    error: {
      control: "boolean",
      description: "Error state",
    },
    errorMessage: {
      control: "text",
      description: "Error message (shown when error=true)",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    readOnly: {
      control: "boolean",
      description: "Read-only state",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Input size",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "url"],
      description: "Input type",
    },
    leadingIcon: {
      control: "select",
      options: [undefined, "Search", "Email", "Person", "Lock"],
      description: "Icon at the start",
    },
    trailingIcon: {
      control: "select",
      options: [undefined, "Visibility", "Clear", "Check"],
      description: "Icon at the end",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
  },
};

export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="Small" size="sm" placeholder="Small input" />
      <Input label="Medium" size="md" placeholder="Medium input" />
      <Input label="Large" size="lg" placeholder="Large input" />
    </div>
  ),
};

export const WithIcons: Story = {
  name: "With Icons",
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="Search" leadingIcon="Search" placeholder="Search..." />
      <Input
        label="Email"
        leadingIcon="Email"
        type="email"
        placeholder="email@example.com"
      />
      <Input
        label="Password"
        leadingIcon="Lock"
        trailingIcon="Visibility"
        type="password"
        placeholder="Enter password"
      />
    </div>
  ),
};

export const WithPrefixSuffix: Story = {
  name: "With Prefix/Suffix",
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="Price" prefixText="$" type="number" placeholder="0.00" />
      <Input
        label="Weight"
        suffixText="kg"
        type="number"
        placeholder="Enter weight"
      />
      <Input label="Website" prefixText="https://" placeholder="example.com" />
    </div>
  ),
};

export const WithCounter: Story = {
  name: "With Character Counter",
  render: function Render() {
    const [value, setValue] = useState("");
    return (
      <div className="w-80">
        <Input
          label="Bio"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          withCounter
          maxCounter={100}
          placeholder="Tell us about yourself"
        />
      </div>
    );
  },
};

export const States: Story = {
  name: "Different States",
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="Default" placeholder="Default state" />
      <Input
        label="With Helper"
        helperText="This is a helper text"
        placeholder="With helper"
      />
      <Input
        label="Error"
        error
        errorMessage="This field is required"
        placeholder="Error state"
      />
      <Input label="Disabled" disabled placeholder="Disabled input" />
      <Input
        label="Read Only"
        readOnly
        value="This value cannot be changed"
      />
    </div>
  ),
};

export const InputTypes: Story = {
  name: "Input Types",
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="Text" type="text" placeholder="Plain text" />
      <Input label="Email" type="email" placeholder="email@example.com" />
      <Input label="Password" type="password" placeholder="Enter password" />
      <Input label="Number" type="number" placeholder="0" />
      <Input label="URL" type="url" placeholder="https://example.com" />
    </div>
  ),
};

export const FormExample: Story = {
  name: "Form Example",
  render: function Render() {
    const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
      const newErrors: Record<string, string> = {};
      if (!form.name) newErrors.name = "Name is required";
      if (!form.email) newErrors.email = "Email is required";
      if (!form.password) newErrors.password = "Password is required";
      setErrors(newErrors);
    };

    return (
      <div className="space-y-4 w-80">
        <Input
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={!!errors.name}
          errorMessage={errors.name}
          leadingIcon="Person"
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={!!errors.email}
          errorMessage={errors.email}
          leadingIcon="Email"
        />
        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={!!errors.password}
          errorMessage={errors.password}
          leadingIcon="Lock"
        />
        <button
          onClick={validate}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Validate
        </button>
      </div>
    );
  },
};
