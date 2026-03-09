import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select, SelectWithSearch } from "./select";

const meta: Meta<typeof Select> = {
  title: "DSR Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Select size",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    clearable: {
      control: "boolean",
      description: "Show clear button",
    },
    loading: {
      control: "boolean",
      description: "Loading state",
    },
    error: {
      control: "boolean",
      description: "Error state",
    },
    isMulti: {
      control: "boolean",
      description: "Enable multi-select",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const countryOptions = [
  { label: "Spain", value: "ES" },
  { label: "France", value: "FR" },
  { label: "Germany", value: "DE" },
  { label: "Italy", value: "IT" },
  { label: "Portugal", value: "PT" },
  { label: "United Kingdom", value: "UK" },
];

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Pending", value: "pending" },
];

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState("");
    return (
      <div className="w-64">
        <Select
          label="Country"
          value={value}
          onValueChange={setValue}
          options={countryOptions}
        />
      </div>
    );
  },
};

export const WithPlaceholder: Story = {
  name: "With Placeholder",
  render: function Render() {
    const [value, setValue] = useState("");
    return (
      <div className="w-64">
        <Select
          label="Status"
          placeholder="Select a status..."
          value={value}
          onValueChange={setValue}
          options={statusOptions}
        />
      </div>
    );
  },
};

export const AllSizes: Story = {
  name: "All Sizes",
  render: function Render() {
    const [small, setSmall] = useState("");
    const [medium, setMedium] = useState("");
    const [large, setLarge] = useState("");

    return (
      <div className="space-y-4 w-64">
        <Select
          label="Small"
          size="small"
          value={small}
          onValueChange={setSmall}
          options={statusOptions}
        />
        <Select
          label="Medium"
          size="medium"
          value={medium}
          onValueChange={setMedium}
          options={statusOptions}
        />
        <Select
          label="Large"
          size="large"
          value={large}
          onValueChange={setLarge}
          options={statusOptions}
        />
      </div>
    );
  },
};

export const Clearable: Story = {
  name: "Clearable",
  render: function Render() {
    const [value, setValue] = useState("ES");
    return (
      <div className="w-64">
        <Select
          label="Country"
          value={value}
          onValueChange={setValue}
          options={countryOptions}
          clearable
        />
      </div>
    );
  },
};

export const WithError: Story = {
  name: "With Error",
  render: function Render() {
    const [value, setValue] = useState("");
    return (
      <div className="w-64">
        <Select
          label="Country"
          value={value}
          onValueChange={setValue}
          options={countryOptions}
          error
          errorMessage="Please select a country"
        />
      </div>
    );
  },
};

export const WithHelperText: Story = {
  name: "With Helper Text",
  render: function Render() {
    const [value, setValue] = useState("");
    return (
      <div className="w-64">
        <Select
          label="Country"
          value={value}
          onValueChange={setValue}
          options={countryOptions}
          helperText="Select your country of residence"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-64">
      <Select
        label="Country"
        value="ES"
        options={countryOptions}
        disabled
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="w-64">
      <Select
        label="Loading..."
        value=""
        options={[]}
        loading
      />
    </div>
  ),
};

export const MultiSelect: Story = {
  name: "Multi Select",
  render: function Render() {
    const [values, setValues] = useState<string[]>(["ES", "FR"]);
    return (
      <div className="w-80">
        <Select
          label="Countries"
          isMulti
          value={values}
          onMultiValueChange={setValues}
          options={countryOptions}
          checkBox
          clearable
        />
        <p className="text-sm text-gray-500 mt-2">
          Selected: {values.join(", ") || "None"}
        </p>
      </div>
    );
  },
};

export const MultiSelectWithSelectAll: Story = {
  name: "Multi Select with Select All",
  render: function Render() {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div className="w-80">
        <Select
          label="Countries"
          isMulti
          value={values}
          onMultiValueChange={setValues}
          options={countryOptions}
          checkBox
          selectAllOptions
          onSelectAll={() => {
            if (values.length === countryOptions.length) {
              setValues([]);
            } else {
              setValues(countryOptions.map((o) => o.value));
            }
          }}
        />
      </div>
    );
  },
};

export const WithSearchComponent: Story = {
  name: "SelectWithSearch",
  render: function Render() {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState(countryOptions);

    const handleSearch = (search: string) => {
      const filtered = countryOptions.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase())
      );
      setOptions(filtered);
    };

    return (
      <div className="w-64">
        <SelectWithSearch
          label="Search Country"
          value={value}
          onValueChange={setValue}
          options={options}
          onSearch={handleSearch}
          clearable
        />
      </div>
    );
  },
};

export const FormExample: Story = {
  name: "Form Example",
  render: function Render() {
    const [form, setForm] = useState({
      country: "",
      status: "",
    });

    return (
      <div className="space-y-4 w-64">
        <Select
          label="Country"
          value={form.country}
          onValueChange={(v) => setForm({ ...form, country: v })}
          options={countryOptions}
          required
          error={!form.country}
          errorMessage={!form.country ? "Required" : undefined}
        />
        <Select
          label="Status"
          value={form.status}
          onValueChange={(v) => setForm({ ...form, status: v })}
          options={statusOptions}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
          disabled={!form.country}
        >
          Submit
        </button>
      </div>
    );
  },
};
