import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "./alert";
import { Button } from "./button";

const meta: Meta<typeof Alert> = {
  title: "DSR Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "destructive", "info"],
      description: "Alert visual variant",
    },
    title: {
      control: "text",
      description: "Optional title",
    },
    isBanner: {
      control: "boolean",
      description: "Full width banner style",
    },
    autoClose: {
      control: "boolean",
      description: "Auto-close after delay",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[400px]">
      <Alert variant="default">This is a default alert message.</Alert>
    </div>
  ),
};

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="space-y-4 w-[400px]">
      <Alert variant="default">Default: This is a neutral message.</Alert>
      <Alert variant="success">Success: Operation completed successfully!</Alert>
      <Alert variant="warning">Warning: Please review before continuing.</Alert>
      <Alert variant="destructive">Error: Something went wrong.</Alert>
      <Alert variant="info">Info: Here is some helpful information.</Alert>
    </div>
  ),
};

export const WithTitle: Story = {
  name: "With Title",
  render: () => (
    <div className="space-y-4 w-[400px]">
      <Alert variant="success" title="Success!">
        Your changes have been saved successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Your session will expire in 5 minutes.
      </Alert>
      <Alert variant="destructive" title="Error">
        Failed to save changes. Please try again.
      </Alert>
    </div>
  ),
};

export const WithIcon: Story = {
  name: "With Custom Icon",
  render: () => (
    <div className="space-y-4 w-[400px]">
      <Alert variant="info" icon="Info">
        Tip: You can use keyboard shortcuts for faster navigation.
      </Alert>
      <Alert variant="success" icon="Check">
        All tasks completed!
      </Alert>
    </div>
  ),
};

export const Closeable: Story = {
  name: "Closeable Alert",
  render: function Render() {
    const [show, setShow] = useState(true);

    if (!show) {
      return (
        <Button onClick={() => setShow(true)} variant="outline">
          Show Alert Again
        </Button>
      );
    }

    return (
      <div className="w-[400px]">
        <Alert variant="info" onClose={() => setShow(false)}>
          This alert can be dismissed by clicking the close button.
        </Alert>
      </div>
    );
  },
};

export const BannerStyle: Story = {
  name: "Banner Style",
  render: () => (
    <div className="w-[600px]">
      <Alert variant="warning" isBanner title="Maintenance Notice">
        Scheduled maintenance will occur on Sunday from 2:00 AM to 4:00 AM.
      </Alert>
    </div>
  ),
};

export const WithCompoundContent: Story = {
  name: "With Compound Content",
  render: () => (
    <div className="w-[400px]">
      <Alert variant="destructive">
        <AlertTitle>There was a problem with your request</AlertTitle>
        <AlertDescription>
          <ul className="list-disc pl-4 mt-2">
            <li>Your password must be at least 8 characters</li>
            <li>Your password must include a number</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const FormValidation: Story = {
  name: "Form Validation Example",
  render: function Render() {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = () => {
      setSubmitted(true);
      setError(Math.random() > 0.5);
    };

    return (
      <div className="space-y-4 w-[400px]">
        {submitted && (
          <Alert
            variant={error ? "destructive" : "success"}
            title={error ? "Submission Failed" : "Success!"}
            onClose={() => setSubmitted(false)}
          >
            {error
              ? "Please check your input and try again."
              : "Your form has been submitted successfully."}
          </Alert>
        )}
        <Button onClick={handleSubmit}>Submit Form (Random Result)</Button>
      </div>
    );
  },
};
