import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
import { Button } from "./button";
import { Badge } from "./badge";
import { Input } from "./input";

const meta: Meta<typeof Card> = {
  title: "DSR Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description: "Card visual variant",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with any elements you need.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  name: "Simple Card",
  render: () => (
    <Card className="w-[350px] p-6">
      <p>A simple card with just content, no header or footer.</p>
    </Card>
  ),
};

export const WithBadge: Story = {
  name: "With Badge",
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Feature</CardTitle>
          <Badge variant="success">New</Badge>
        </div>
        <CardDescription>This is a new feature</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Check out this exciting new feature we just released!</p>
      </CardContent>
    </Card>
  ),
};

export const ProductCard: Story = {
  name: "Product Card",
  render: () => (
    <Card className="w-[300px]">
      <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center text-gray-400">
        Product Image
      </div>
      <CardHeader>
        <CardTitle>Product Name</CardTitle>
        <CardDescription>Brief product description</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">$99.99</span>
          <Badge variant="warning">Sale</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="flex-1">Add to Cart</Button>
        <Button variant="outline">Details</Button>
      </CardFooter>
    </Card>
  ),
};

export const UserCard: Story = {
  name: "User Card",
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>Software Engineer</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span>john@example.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Location</span>
            <span>New York, USA</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Joined</span>
            <span>Jan 2024</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1">
          Message
        </Button>
        <Button className="flex-1">Follow</Button>
      </CardFooter>
    </Card>
  ),
};

export const StatsCard: Story = {
  name: "Stats Card",
  render: () => (
    <div className="flex gap-4">
      <Card className="w-[200px]">
        <CardHeader className="pb-2">
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-3xl">$45,231</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-green-500">+12.5% from last month</p>
        </CardContent>
      </Card>
      <Card className="w-[200px]">
        <CardHeader className="pb-2">
          <CardDescription>Active Users</CardDescription>
          <CardTitle className="text-3xl">2,350</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-green-500">+8.2% from last month</p>
        </CardContent>
      </Card>
      <Card className="w-[200px]">
        <CardHeader className="pb-2">
          <CardDescription>Conversion</CardDescription>
          <CardTitle className="text-3xl">3.2%</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-red-500">-2.1% from last month</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const FormCard: Story = {
  name: "Form Card",
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Enter your details to create a new account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input label="Name" placeholder="John Doe" />
        <Input label="Email" type="email" placeholder="john@example.com" />
        <Input label="Password" type="password" placeholder="••••••••" />
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button fullWidth>Create Account</Button>
        <p className="text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  ),
};

export const CardVariants: Story = {
  name: "Card Variants",
  render: () => (
    <div className="flex gap-4">
      <Card variant="primary" className="w-[200px] p-4">
        <CardTitle>Primary</CardTitle>
        <p className="text-sm mt-2">Default card style</p>
      </Card>
      <Card variant="secondary" className="w-[200px] p-4">
        <CardTitle>Secondary</CardTitle>
        <p className="text-sm mt-2">Secondary variant</p>
      </Card>
      <Card variant="tertiary" className="w-[200px] p-4">
        <CardTitle>Tertiary</CardTitle>
        <p className="text-sm mt-2">Tertiary variant</p>
      </Card>
    </div>
  ),
};
