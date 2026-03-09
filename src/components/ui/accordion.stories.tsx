import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

const meta = {
  title: "DSR Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: "Single or multiple expansion",
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const SingleNotCollapsible: Story = {
  name: "Single (Not Collapsible)",
  render: () => (
    <Accordion type="single" className="w-[400px]" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>
          This accordion type="single" without collapsible prop means one item
          is always open. Clicking the open item won't close it.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>
          Click here to open this section. Section 1 will close automatically.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>
          Only one section can be open at a time.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  name: "Multiple Expansion",
  render: () => (
    <Accordion type="multiple" className="w-[400px]" defaultValue={["item-1", "item-2"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>First Section</AccordionTrigger>
        <AccordionContent>
          Multiple sections can be open at the same time with type="multiple".
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Section</AccordionTrigger>
        <AccordionContent>
          This section is also open by default.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Section</AccordionTrigger>
        <AccordionContent>
          Click to toggle this section independently.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Controlled: Story = {
  name: "Controlled",
  render: function Render() {
    const [value, setValue] = useState("item-2");

    return (
      <div className="space-y-4 w-[400px]">
        <div className="flex gap-2">
          <button
            className="px-3 py-1 text-sm bg-gray-100 rounded"
            onClick={() => setValue("item-1")}
          >
            Open 1
          </button>
          <button
            className="px-3 py-1 text-sm bg-gray-100 rounded"
            onClick={() => setValue("item-2")}
          >
            Open 2
          </button>
          <button
            className="px-3 py-1 text-sm bg-gray-100 rounded"
            onClick={() => setValue("item-3")}
          >
            Open 3
          </button>
        </div>
        <Accordion
          type="single"
          collapsible
          value={value}
          onValueChange={setValue}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content for item 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Item 2</AccordionTrigger>
            <AccordionContent>Content for item 2</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Item 3</AccordionTrigger>
            <AccordionContent>Content for item 3</AccordionContent>
          </AccordionItem>
        </Accordion>
        <p className="text-sm text-gray-500">Current: {value || "none"}</p>
      </div>
    );
  },
};

export const FAQ: Story = {
  name: "FAQ Example",
  render: () => (
    <div className="w-[500px]">
      <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="q1">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-600">
              We offer a 30-day money-back guarantee on all purchases. If you're
              not satisfied with your purchase, simply return it within 30 days
              for a full refund.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger>How long does shipping take?</AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-600">
              Standard shipping takes 5-7 business days. Express shipping is
              available for 2-3 business days delivery. International shipping
              may take 10-14 business days.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q3">
          <AccordionTrigger>Do you offer customer support?</AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-600">
              Yes! Our customer support team is available 24/7 via email and
              live chat. You can also reach us by phone during business hours
              (9am-5pm EST).
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q4">
          <AccordionTrigger>Can I change my order?</AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-600">
              You can modify your order within 1 hour of placing it. After that,
              the order enters processing and cannot be changed. Contact support
              immediately if you need to make changes.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const SettingsPanel: Story = {
  name: "Settings Panel Example",
  render: () => (
    <div className="w-[450px]">
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      <Accordion type="multiple" defaultValue={["general"]}>
        <AccordionItem value="general">
          <AccordionTrigger>General Settings</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Language</span>
                <select className="border rounded px-2 py-1">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span>Timezone</span>
                <select className="border rounded px-2 py-1">
                  <option>UTC</option>
                  <option>EST</option>
                  <option>PST</option>
                </select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="notifications">
          <AccordionTrigger>Notifications</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span>Email notifications</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span>Push notifications</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>SMS notifications</span>
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="privacy">
          <AccordionTrigger>Privacy & Security</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span>Two-factor authentication</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Share usage data</span>
              </label>
              <button className="text-sm text-blue-500 hover:underline">
                Download my data
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const WithRichContent: Story = {
  name: "With Rich Content",
  render: () => (
    <Accordion type="single" collapsible className="w-[450px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Product Features</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>High-performance processing</li>
            <li>Cloud synchronization</li>
            <li>Real-time collaboration</li>
            <li>Advanced security features</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Pricing Plans</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded">
              <p className="font-medium">Basic - $9/mo</p>
              <p className="text-sm text-gray-500">For individuals</p>
            </div>
            <div className="p-3 bg-blue-50 rounded border border-blue-200">
              <p className="font-medium">Pro - $29/mo</p>
              <p className="text-sm text-gray-500">Most popular</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="font-medium">Enterprise - Custom</p>
              <p className="text-sm text-gray-500">For large teams</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Contact Information</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-gray-600">
            <p>📧 support@example.com</p>
            <p>📞 1-800-EXAMPLE</p>
            <p>📍 123 Main St, City, ST 12345</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
