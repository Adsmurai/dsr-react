import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./tooltip";
import { Button } from "./button";

const meta: Meta<typeof Tooltip> = {
  title: "DSR Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>This is a tooltip</TooltipContent>
    </Tooltip>
  ),
};

export const OnText: Story = {
  name: "On Text",
  render: () => (
    <p>
      Hover over{" "}
      <Tooltip>
        <TooltipTrigger>
          <span className="underline decoration-dotted cursor-help">
            this text
          </span>
        </TooltipTrigger>
        <TooltipContent>Additional information here</TooltipContent>
      </Tooltip>{" "}
      to see the tooltip.
    </p>
  ),
};

export const OnIcon: Story = {
  name: "On Icon",
  render: () => (
    <div className="flex items-center gap-2">
      <span>Password</span>
      <Tooltip>
        <TooltipTrigger>
          <span className="inline-flex items-center justify-center w-4 h-4 text-xs bg-gray-200 rounded-full cursor-help">
            ?
          </span>
        </TooltipTrigger>
        <TooltipContent>Must be at least 8 characters</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const MultipleTooltips: Story = {
  name: "Multiple Tooltips",
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline">Edit</Button>
        </TooltipTrigger>
        <TooltipContent>Edit this item</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline">Save</Button>
        </TooltipTrigger>
        <TooltipContent>Save changes</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="destructive">Delete</Button>
        </TooltipTrigger>
        <TooltipContent>Delete permanently</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const TruncatedText: Story = {
  name: "Truncated Text",
  render: () => (
    <div className="w-48">
      <Tooltip>
        <TooltipTrigger>
          <p className="truncate cursor-help">
            This is a very long text that will be truncated and you need to
            hover to see the full content
          </p>
        </TooltipTrigger>
        <TooltipContent>
          This is a very long text that will be truncated
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const DisabledButton: Story = {
  name: "Disabled Button Tooltip",
  render: () => (
    <Tooltip>
      <TooltipTrigger>
        <span className="inline-block">
          <Button disabled>Submit</Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>Please fill all required fields</TooltipContent>
    </Tooltip>
  ),
};

export const IconButtons: Story = {
  name: "Icon Buttons with Tooltips",
  render: () => (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger>
          <button className="p-2 rounded hover:bg-gray-100">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent>Home</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <button className="p-2 rounded hover:bg-gray-100">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent>Settings</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <button className="p-2 rounded hover:bg-gray-100">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent>Profile</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const FormFieldHelp: Story = {
  name: "Form Field Help",
  render: () => (
    <div className="w-64 space-y-4">
      <div>
        <div className="flex items-center gap-1 mb-1">
          <label className="text-sm font-medium">Email</label>
          <Tooltip>
            <TooltipTrigger>
              <span className="inline-flex items-center justify-center w-4 h-4 text-xs text-gray-400 border rounded-full cursor-help">
                i
              </span>
            </TooltipTrigger>
            <TooltipContent>We will never share your email</TooltipContent>
          </Tooltip>
        </div>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <div className="flex items-center gap-1 mb-1">
          <label className="text-sm font-medium">API Key</label>
          <Tooltip>
            <TooltipTrigger>
              <span className="inline-flex items-center justify-center w-4 h-4 text-xs text-gray-400 border rounded-full cursor-help">
                i
              </span>
            </TooltipTrigger>
            <TooltipContent>Find this in your account settings</TooltipContent>
          </Tooltip>
        </div>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded"
          placeholder="sk-..."
        />
      </div>
    </div>
  ),
};
