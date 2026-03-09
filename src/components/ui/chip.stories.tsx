import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Chip, Tag, StatusTag, Rating } from "./chip";

const meta: Meta<typeof Chip> = {
  title: "DSR Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Chip text (required)",
    },
    selected: {
      control: "boolean",
      description: "Selected state",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============= CHIP STORIES =============

export const Default: Story = {
  render: () => <Chip label="Chip Label" />,
};

export const ChipStates: Story = {
  name: "Chip States",
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Chip label="Default" />
      <Chip label="Selected" selected />
      <Chip label="Disabled" disabled />
      <Chip label="Selected Disabled" selected disabled />
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

// ============= TAG STORIES =============

export const TagDefault: Story = {
  name: "Tag - Default",
  render: () => <Tag>Default Tag</Tag>,
};

export const TagColors: Story = {
  name: "Tag - All Colors",
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Tag color="neutral">Neutral</Tag>
      <Tag color="primary">Primary</Tag>
      <Tag color="success">Success</Tag>
      <Tag color="warning">Warning</Tag>
      <Tag color="error">Error</Tag>
      <Tag color="info">Info</Tag>
      <Tag color="processing">Processing</Tag>
    </div>
  ),
};

export const TagVariants: Story = {
  name: "Tag - Variants",
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Tag variant="primary" color="success">Primary Success</Tag>
        <Tag variant="primary" color="warning">Primary Warning</Tag>
        <Tag variant="primary" color="error">Primary Error</Tag>
      </div>
      <div className="flex gap-2">
        <Tag variant="secondary" color="success">Secondary Success</Tag>
        <Tag variant="secondary" color="warning">Secondary Warning</Tag>
        <Tag variant="secondary" color="error">Secondary Error</Tag>
      </div>
    </div>
  ),
};

export const TagDeletable: Story = {
  name: "Tag - Deletable",
  render: function Render() {
    const [tags, setTags] = useState(["UX", "Marketing", "Development"]);

    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <Tag
              key={tag}
              color="primary"
              onDelete={() => setTags((prev) => prev.filter((t) => t !== tag))}
            >
              {tag}
            </Tag>
          ))}
        </div>
        {tags.length === 0 && (
          <p className="text-gray-500 text-sm">No tags remaining</p>
        )}
      </div>
    );
  },
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

export const ChipVsTagComparison: Story = {
  name: "Chip vs Tag Comparison",
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <h3 className="font-medium mb-2">Chip (Interactive filters)</h3>
        <div className="flex gap-2">
          <Chip label="Filter 1" selected />
          <Chip label="Filter 2" onRemove={() => {}} />
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">Tag (Classification)</h3>
        <div className="flex gap-2">
          <Tag color="success">Approved</Tag>
          <Tag color="warning">Review</Tag>
          <Tag color="error">Rejected</Tag>
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">StatusTag (Predefined states)</h3>
        <div className="flex gap-2">
          <StatusTag status="active" />
          <StatusTag status="pending" />
          <StatusTag status="error" />
        </div>
      </div>
    </div>
  ),
};
