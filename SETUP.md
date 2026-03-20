# Setup Guide

Quick setup guide for adsmurai-dsr-react in your React application.

## Installation

```bash
npm install adsmurai-dsr-react
```

## Required Peer Dependencies

```bash
npm install react react-dom tailwindcss
```

## Optional Peer Dependencies

```bash
# For form validation
npm install react-hook-form zod @hookform/resolvers
```

## App Setup

### 1. Tailwind Configuration

Add DSR to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Include DSR components
    "./node_modules/adsmurai-dsr-react/**/*.{js,ts,jsx,tsx}",
  ],
  // ... rest of config
}
```

## Provider Setup

Some components require context providers. Here's what you need:

### Components That Need Providers

| Component | Provider | Required? |
|-----------|----------|-----------|
| `Tooltip`, `TooltipTrigger`, `TooltipContent` | `TooltipProvider` | Yes |
| `Sidebar`, `SidebarContent`, etc. | `SidebarProvider` | Yes |
| `Dialog`, `DialogContent`, etc. | None (self-contained) | No |
| `Modal` | None | No |
| `Form`, `FormField`, etc. | `FormProvider` (react-hook-form) | Yes |

### Recommended App Structure

```tsx
// App.tsx
import { TooltipProvider } from 'adsmurai-dsr-react';

function App() {
  return (
    <TooltipProvider>
      {/* Your app content */}
      <RouterProvider router={router} />
    </TooltipProvider>
  );
}
```

### Sidebar Setup

When using Sidebar components, wrap the layout with `SidebarProvider`:

```tsx
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from 'adsmurai-dsr-react';

function Layout({ children }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Home</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <main>{children}</main>
    </SidebarProvider>
  );
}
```

### Form Setup (with react-hook-form)

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Button
} from 'adsmurai-dsr-react';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}
```

## Import Patterns

### Components

```tsx
// Import components from root
import { Button, Card, Input, Typography } from 'adsmurai-dsr-react';
```

### Enums

```tsx
// Import enums from /enums subpath
import { IconsEnum, ButtonVariantEnum } from 'adsmurai-dsr-react/enums';
```

### Types

```tsx
// Import types from /types subpath
import type { ButtonProps, InputProps, CardProps } from 'adsmurai-dsr-react/types';
```

### Variant Constants

```tsx
// Use exported constants for valid prop values
import { BUTTON_VARIANTS, BUTTON_SIZES, BADGE_VARIANTS } from 'adsmurai-dsr-react';

// These help with autocomplete and validation
<Button variant={BUTTON_VARIANTS.default}>Primary</Button>
<Button variant={BUTTON_VARIANTS.destructive}>Delete</Button>
<Button size={BUTTON_SIZES.lg}>Large CTA</Button>
```

## Common Patterns

### Button with Icon

```tsx
import { Button } from 'adsmurai-dsr-react';

// Using icon name (recommended for Lovable)
<Button startIcon="Add">Add Item</Button>
<Button endIcon="OpenInNew">Open Link</Button>

// Using icon component (advanced)
import { Icon } from 'adsmurai-dsr-react';
<Button leadingIcon={<Icon name="Add" />}>Add Item</Button>
```

### Alert Variants

```tsx
import { Alert, ALERT_VARIANTS } from 'adsmurai-dsr-react';

<Alert variant="success">Operation completed</Alert>
<Alert variant="destructive">Error occurred</Alert>
<Alert variant="warning">Please review</Alert>
<Alert variant="info">Did you know?</Alert>
```

### Badge Variants

```tsx
import { Badge, BADGE_VARIANTS } from 'adsmurai-dsr-react';

<Badge variant="success">Active</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="warning">Pending</Badge>
<Badge>3</Badge>
```

## Troubleshooting

### "Cannot find module 'adsmurai-dsr-react/enums'"

Make sure you're using the correct version (>= 0.1.2). Update with:

```bash
npm update adsmurai-dsr-react
```

### TypeScript errors with props

Import types from the `/types` subpath:

```tsx
import type { ButtonProps } from 'adsmurai-dsr-react/types';
```

### Tooltip not showing

Make sure `TooltipProvider` wraps your app:

```tsx
<TooltipProvider>
  <App />
</TooltipProvider>
```
