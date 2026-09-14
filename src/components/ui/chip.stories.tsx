import type { Meta, StoryObj } from "@storybook/react";
import { useState, type ComponentType } from "react";
import { Chip, StatusTag, Rating, type AssistChipProps } from "./chip";

// Chip props are a discriminated union keyed by `variant`. Storybook controls
// are typed against the default `assist` variant (hence the cast); the other
// variants are shown through render-only stories.
const meta: Meta<AssistChipProps> = {
  title: "DSR Components/Chip",
  component: Chip as ComponentType<AssistChipProps>,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Chip Label",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Chip text (required)",
    },
    size: {
      control: "select",
      options: ["extra-small", "small", "medium", "large"],
      description: "Chip size",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state (interactive variants only)",
    },
  },
};

export default meta;
type Story = StoryObj<AssistChipProps>;

// ============= CHIP STORIES =============

export const Default: Story = {};

export const Variants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Chip label="Assist" />
      <Chip variant="suggestion" label="Suggestion" />
      <Chip variant="input" label="Input" onRemove={() => {}} />
      <Chip variant="filter" label="Filter" selected />
      <Chip variant="status" status="success" label="Status" />
      <Chip variant="colorful" color="purple-light" label="Colorful" />
    </div>
  ),
};

export const Sizes: Story = {
  name: "Sizes",
  render: () => (
    <div className="flex gap-2 items-center flex-wrap">
      <Chip size="extra-small" label="Extra small" />
      <Chip size="small" label="Small" />
      <Chip size="medium" label="Medium" />
      <Chip size="large" label="Large" />
    </div>
  ),
};

export const ChipStates: Story = {
  name: "Chip States",
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Chip label="Default" />
      <Chip label="Disabled" disabled />
      <Chip variant="filter" label="Selected" selected />
      <Chip variant="filter" label="Selected Disabled" selected disabled />
    </div>
  ),
};

export const ChipWithIcon: Story = {
  name: "Chip with Icon",
  render: () => (
    <div className="flex gap-2">
      <Chip label="Star" icon="Star" />
      <Chip label="Settings" icon="Settings" />
      <Chip label="Person" icon="Person" />
    </div>
  ),
};

export const ChipRemovable: Story = {
  name: "Removable Chips",
  render: function Render() {
    const [chips, setChips] = useState(["React", "TypeScript", "Tailwind"]);

    const removeChip = (chip: string) => {
      setChips((prev) => prev.filter((c) => c !== chip));
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {chips.map((chip) => (
            <Chip
              key={chip}
              variant="input"
              label={chip}
              onRemove={() => removeChip(chip)}
            />
          ))}
        </div>
        {chips.length === 0 && (
          <p className="text-gray-500 text-sm">No chips remaining</p>
        )}
        <button
          className="text-sm text-blue-500 hover:underline"
          onClick={() => setChips(["React", "TypeScript", "Tailwind"])}
        >
          Reset
        </button>
      </div>
    );
  },
};

export const ChipFilter: Story = {
  name: "Filter Example",
  render: function Render() {
    const [selected, setSelected] = useState<string[]>(["react"]);
    const filters = [
      { id: "react", label: "React" },
      { id: "vue", label: "Vue" },
      { id: "angular", label: "Angular" },
      { id: "svelte", label: "Svelte" },
    ];

    const toggleFilter = (id: string) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      );
    };

    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-500">Select frameworks:</p>
        <div className="flex gap-2 flex-wrap">
          {filters.map((filter) => (
            <Chip
              key={filter.id}
              variant="filter"
              label={filter.label}
              selected={selected.includes(filter.id)}
              onClick={() => toggleFilter(filter.id)}
            />
          ))}
        </div>
        <p className="text-sm">Selected: {selected.join(", ") || "None"}</p>
      </div>
    );
  },
};

// ============= STATUS CHIP STORIES =============
// These replace the old Tag stories: DSR 15 removed `Tag`, so semantic
// classification is now `variant="status"`.

export const StatusChips: Story = {
  name: "Status Chips (replaces Tag)",
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Chip variant="status" status="default" label="Default" />
      <Chip variant="status" status="success" label="Success" />
      <Chip variant="status" status="info" label="Info" />
      <Chip variant="status" status="warning" label="Warning" />
      <Chip variant="status" status="error" label="Error" />
    </div>
  ),
};

export const ColorfulChips: Story = {
  name: "Colorful Chips",
  render: () => (
    <div className="flex gap-2 flex-wrap max-w-md">
      <Chip variant="colorful" color="default" label="Default" />
      <Chip variant="colorful" color="blue-light" label="Blue" />
      <Chip variant="colorful" color="red-light" label="Red" />
      <Chip variant="colorful" color="emerald-light" label="Emerald" />
      <Chip variant="colorful" color="purple-light" label="Purple" />
      <Chip variant="colorful" color="orange-light" label="Orange" />
      <Chip variant="colorful" color="cyan-light" label="Cyan" />
      <Chip variant="colorful" color="yellow-light" label="Yellow" />
      <Chip variant="colorful" color="granate-light" label="Granate" />
      <Chip variant="colorful" color="green-light" label="Green" />
    </div>
  ),
};

// ============= STATUS TAG STORIES =============

export const StatusTagDefault: Story = {
  name: "StatusTag - Default",
  render: () => <StatusTag status="default" />,
};

export const StatusTagAllStatuses: Story = {
  name: "StatusTag - All Statuses",
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <StatusTag status="active" />
      <StatusTag status="inactive" />
      <StatusTag status="pending" />
      <StatusTag status="completed" />
      <StatusTag status="success" />
      <StatusTag status="warning" />
      <StatusTag status="error" />
      <StatusTag status="info" />
      <StatusTag status="default" />
    </div>
  ),
};

// ============= RATING STORIES =============

export const RatingDefault: Story = {
  name: "Rating - Default",
  render: function Render() {
    const [rating, setRating] = useState(3);
    return (
      <div className="space-y-2">
        <Rating value={rating} onChange={setRating} />
        <p className="text-sm">Rating: {rating}/5</p>
      </div>
    );
  },
};

export const RatingReadOnly: Story = {
  name: "Rating - Read Only",
  render: () => (
    <div className="space-y-2">
      <Rating value={4} readOnly />
      <Rating value={2.5} readOnly />
      <Rating value={5} readOnly />
    </div>
  ),
};

export const RatingMaxStars: Story = {
  name: "Rating - Max Stars",
  render: function Render() {
    const [rating, setRating] = useState(7);
    return (
      <div className="space-y-2">
        <Rating value={rating} onChange={setRating} max={10} />
        <p className="text-sm">Rating: {rating}/10</p>
      </div>
    );
  },
};

// ============= COMPARISON =============

export const WhichVariantComparison: Story = {
  name: "Which variant to use",
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <h3 className="font-medium mb-2">Interactive filters</h3>
        <div className="flex gap-2">
          <Chip variant="filter" label="Filter 1" selected />
          <Chip variant="filter" label="Filter 2" onRemove={() => {}} />
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">Classification (semantic)</h3>
        <div className="flex gap-2">
          <Chip variant="status" status="success" label="Approved" />
          <Chip variant="status" status="warning" label="Review" />
          <Chip variant="status" status="error" label="Rejected" />
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">Classification (decorative)</h3>
        <div className="flex gap-2">
          <Chip variant="colorful" color="purple-light" label="UX" />
          <Chip variant="colorful" color="blue-light" label="Marketing" />
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">StatusTag (predefined states)</h3>
        <div className="flex gap-2">
          <StatusTag status="active" />
          <StatusTag status="pending" />
          <StatusTag status="error" />
        </div>
      </div>
    </div>
  ),
};
