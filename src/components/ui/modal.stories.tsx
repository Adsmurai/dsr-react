import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "./modal";
import { Button } from "./button";

const meta: Meta<typeof Modal> = {
  title: "DSR Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "Whether modal is open",
    },
    status: {
      control: "select",
      options: ["success", "error", "warning", "info", undefined],
      description: "Visual status styling",
    },
    fullWidth: {
      control: "boolean",
      description: "Full width modal",
    },
    closeOnOutsideClick: {
      control: "boolean",
      description: "Close when clicking outside",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Modal Title">
          <p>This is the modal content. You can add any content here.</p>
        </Modal>
      </>
    );
  },
};

export const WithActions: Story = {
  name: "With Actions",
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Confirmation</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm Action"
          actions={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </>
          }
        >
          <p>Are you sure you want to proceed with this action?</p>
        </Modal>
      </>
    );
  },
};

export const DeleteConfirmation: Story = {
  name: "Delete Confirmation",
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Delete Item"
          status="error"
          actions={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => setOpen(false)}>
                Delete
              </Button>
            </>
          }
        >
          <p>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
        </Modal>
      </>
    );
  },
};

export const SuccessModal: Story = {
  name: "Success Modal",
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Complete Action</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Success!"
          status="success"
          actions={<Button onClick={() => setOpen(false)}>Continue</Button>}
        >
          <p>Your operation has been completed successfully.</p>
        </Modal>
      </>
    );
  },
};

export const WarningModal: Story = {
  name: "Warning Modal",
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Show Warning
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Warning"
          status="warning"
          actions={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Proceed Anyway</Button>
            </>
          }
        >
          <p>
            This action may have unintended consequences. Are you sure you want
            to continue?
          </p>
        </Modal>
      </>
    );
  },
};

export const InfoModal: Story = {
  name: "Info Modal",
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Show Info
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Information"
          status="info"
          actions={<Button onClick={() => setOpen(false)}>Got it</Button>}
        >
          <p>
            Here is some important information you should know about this
            feature.
          </p>
        </Modal>
      </>
    );
  },
};

export const NoOutsideClick: Story = {
  name: "No Outside Click Close",
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Important Action"
          closeOnOutsideClick={false}
          actions={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Continue</Button>
            </>
          }
        >
          <p>
            This modal can only be closed using the buttons. Clicking outside
            will not close it.
          </p>
        </Modal>
      </>
    );
  },
};

export const FormModal: Story = {
  name: "Form in Modal",
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Edit Profile</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Edit Profile"
          actions={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save Changes</Button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="john@example.com"
              />
            </div>
          </div>
        </Modal>
      </>
    );
  },
};
