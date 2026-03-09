# @adsmurai/dsr-react

Official public UI wrapper layer on top of the internal Adsmurai Design System (DSR).

**Purpose:**
- Single UI entry point for all projects
- Stable public API contract
- Compatible with Lovable Design System integration
- Decoupled from application logic and layouts

**Consumers MUST NOT import directly from `@adsmurai/design-system-react`.**

## Architecture Rules

### Single Public Entry Point

All UI components, enums, hooks and helpers must be consumed from:
- `@adsmurai/dsr-react` - Components, hooks, utilities
- `@adsmurai/dsr-react/enums` - All enums (IconsEnum, ButtonVariantEnum, etc.)
- `@adsmurai/dsr-react/types` - TypeScript prop types

Direct imports from internal files or from the DSR core are forbidden.

```tsx
// Correct imports
import { Button, Input, Card, useIsMobile, cn } from '@adsmurai/dsr-react';
import { IconsEnum, ButtonVariantEnum, ThemesEnum } from '@adsmurai/dsr-react/enums';
import type { ButtonProps, InputProps } from '@adsmurai/dsr-react/types';

// WRONG - never do this
import { IconsEnum } from '@adsmurai/dsr-react'; // enums not exported from root
import type { ButtonProps } from '@adsmurai/dsr-react'; // types not exported from root
import { Button } from '@adsmurai/dsr-react/components/ui/button'; // internal path
import { IconsEnum } from '@adsmurai/design-system-react'; // direct DSR import
```

### Enum Consolidation

**All enums MUST be exported only from `src/enums/index.ts`.**

Components should NOT re-export enums. If a component uses an enum internally, it imports from DSR but does not re-export it.

### Type Consolidation

**All types MUST be exported only from `src/types/index.ts`.**

Components should NOT export types inline in the barrel file. Types are defined in component files but only re-exported from `/types`.

### Encapsulation

DSR is an internal dependency. If DSR changes, the fix must happen inside dsr-react without breaking consumers.

> **Architectural note:** DSR is currently a peer dependency, meaning consumers install it and could technically import from it directly. To enforce encapsulation at the package level, consider moving DSR from `peerDependencies` to `dependencies`. This would hide DSR from consumers entirely. No React Providers or contexts from DSR are used, so there's no technical blocker for this change.

## Public API Contract

Once an export is public:
- It must not be removed without a major version bump
- Breaking changes are forbidden in snapshot patch releases
- Renaming exports requires migration guidance

**Backward compatibility is prioritized.**

## What NOT To Do

- Refactor components without request
- Change public APIs without approval
- Introduce monorepo structures
- Add application-specific logic
- Import directly from the DSR core in consumers
- Optimize prematurely

**Stability > cleverness.**

## Change Process

All structural changes must follow:
1. Proposal
2. Review
3. Incremental implementation
4. Validation in Foundation Kit
5. Snapshot release

Never apply large refactors in one step.

## Foundation Kit

Foundation Kit is the main starter template project that uses `@adsmurai/dsr-react`.

It serves as:
- The primary real-world validation environment for this library
- The base template for Lovable

All snapshot versions must be validated with Foundation Kit before being considered stable.

## Lovable Compatibility

This package must remain Lovable-friendly:
- Predictable import paths
- Centralized enums
- Simple, explicit APIs
- Avoid dynamic magic patterns
- Avoid implicit internal dependencies

If a change makes Lovable code generation harder, it must be reconsidered.

---

## Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build**: Vite (library mode)
- **Styles**: Tailwind CSS + class-variance-authority (cva)
- **Base components**: Radix UI primitives
- **Utilities**: clsx, tailwind-merge (via `cn()`)

## Project Structure

```
src/
  components/ui/   # UI components (Button, Card, Input, etc.)
  hooks/           # Custom hooks (useIsMobile, useCopyToClipboard)
  lib/             # Utilities (cn function)
  enums/           # Exportable enums
  types/           # Exportable TypeScript types
```

## Conventions

### Components

- Each component in its own `.tsx` file in `src/components/ui/`
- Use `forwardRef` for components that need refs
- Export from `src/components/ui/index.ts`
- shadcn/ui style: composable components with variants via `cva`

### Styles

- Use `cn()` from `@/lib/utils` to merge classes
- Variants with `class-variance-authority`
- Tailwind CSS classes for styling

### Import Alias

- `@/` points to `src/`

## Commands

```bash
npm run build      # Production build
npm run dev        # Watch mode build
npm run lint       # ESLint
npm run typecheck  # TypeScript type check
```

## Snapshot Workflow

Format: `0.x.y-snapshot.N`

Rules:
- Snapshots are used for validation and iteration
- No silent breaking changes allowed
- Minor API additions allowed
- Snapshot releases must be tested in Foundation Kit before publishing

Stable releases happen only after multiple validated snapshots.

## Publishing

- Registry: GitLab Package Registry
- Snapshots: `npm run publish:snapshot`
- Releases: `npm run publish:release`

## Changelog

**REQUIRED: Update `CHANGELOG.md` when modifying components.**

Maintain `CHANGELOG.md` using [Keep a Changelog](https://keepachangelog.com/) format.

Categories:
- **Added** - new features, new props, new components
- **Changed** - changes in existing functionality, internal refactors
- **Deprecated** - soon-to-be removed features
- **Removed** - removed features, removed props
- **Fixed** - bug fixes
- **Security** - vulnerability fixes

### When to update CHANGELOG

- Adding/removing/modifying component props
- Changing component behavior
- Adding new components
- Removing or renaming components
- Bug fixes
- Breaking changes (mark with **BREAKING**)

Update the `[Unreleased]` section with each change. Move to a versioned section when publishing.

## Dependencies

### Peer Dependencies (required in consumer)

- `react` >= 18.0.0
- `tailwindcss` >= 3.0.0
- `react-hook-form` >= 7.0.0 (optional, for Form)
- `zod` >= 3.0.0 (optional, for validation)

### Internal Dependencies

- `@adsmurai/design-system-react` - Currently peer, recommended to move to regular dependency for full encapsulation

---

## Creating DSR Wrappers

Guide for creating wrapper components over `@adsmurai/design-system-react`.

### File Structure

Every wrapper follows this order:

```tsx
/**
 * @fileoverview Component description
 * @description Detailed explanation
 * @when_to_use / @when_not_to_use
 * @example
 */

// 1. Imports
import * as React from "react";
import { DSRComponent, SomeEnum } from "@adsmurai/design-system-react";
import { cn } from "@/lib/utils";

// 2. Enum mappings (internal)
const variantMap: Record<string, SomeEnum> = { ... };

// 3. Exported constants
export const COMPONENT_VARIANTS = { ... } as const;

// 4. Props interface
export interface ComponentProps { ... }

// 5. Component implementation
const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ ... }, ref) => { ... }
);
Component.displayName = "Component";

// 6. Exports
export { Component };
```

### Pattern 1: Enum Mapping

Map DSR enums to simple strings for a cleaner API:

```tsx
import { ButtonVariantEnum } from "@adsmurai/design-system-react";

// Internal mapping (not exported)
const variantMap: Record<string, ButtonVariantEnum> = {
  default: ButtonVariantEnum.Filled,
  outline: ButtonVariantEnum.Outlined,
  ghost: ButtonVariantEnum.Standard,
  destructive: ButtonVariantEnum.Error,
};

// Exported constants for IntelliSense
export const BUTTON_VARIANTS = {
  default: "default",
  outline: "outline",
  ghost: "ghost",
  destructive: "destructive",
} as const;

// Usage in component
const dsrVariant = variantMap[variant || "default"];
```

### Pattern 2: Props Definition

Extend HTML attributes and omit conflicts:

```tsx
export interface InputProps
  extends Omit<React.ComponentProps<"input">, "onChange" | "size"> {
  // Redefined props with our API
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "sm" | "md" | "lg";

  // Additional props
  label?: string;
  error?: boolean;
  helperText?: string;

  // Standard props (always include)
  className?: string;
  dataQa?: string;
  disabled?: boolean;
}
```

**Standard props to always support:**
- `className` - For styling customization
- `dataQa` - For testing selectors
- `disabled` - For disabled state

### Pattern 3: Callback Adaptation

#### 3.1 Synthetic Events (for react-hook-form compatibility)

When DSR passes raw values but React expects events:

```tsx
// DSR calls onBlur(value: string)
// react-hook-form expects onBlur(event: FocusEvent)

const handleBlur = (val: string) => {
  if (onBlur) {
    const syntheticEvent = {
      target: { value: val, name },
      type: "blur",
    } as React.FocusEvent<HTMLInputElement>;
    onBlur(syntheticEvent);
  }
};

<DSRInput onBlur={handleBlur} />
```

#### 3.2 Boolean Direct (Checkbox pattern)

When DSR uses boolean instead of event:

```tsx
export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const handleChange = (newValue: boolean) => {
  onCheckedChange?.(newValue);
};

<DSRCheckBox value={checked} onChange={handleChange} />
```

#### 3.3 Value Conversion (Select pattern)

When DSR returns objects but we want simple values:

```tsx
// DSR returns OptionDataType { label, value }
// We return just the value string

const handleChange = (option: OptionDataType | null) => {
  if (onValueChange) {
    onValueChange(option?.value || "");
  }
};
```

### Pattern 4: Ref Handling

#### When DSR supports refs:

```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", ...props }, ref) => {
    return (
      <DSRButton ref={ref} variant={variantMap[variant]} {...props} />
    );
  }
);
Button.displayName = "Button";
```

#### When DSR does NOT support refs:

```tsx
/**
 * NOTE: DSR CheckBox does not support refs
 */
const Checkbox: React.FC<CheckboxProps> = ({ className, ...props }) => {
  return (
    <div className={cn("inline-flex", className)}>
      <DSRCheckBox {...props} />
    </div>
  );
};
```

### Pattern 5: Development Validation

Warn about incorrect usage in development only:

```tsx
const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  if (process.env.NODE_ENV === "development") {
    if (children && typeof children !== "string") {
      console.warn(
        "[Button] Complex children (JSX) detected. " +
        "Use children=\"text\" with leadingIcon/trailingIcon props. " +
        "Example: <Button trailingIcon=\"ArrowRight\">Next</Button>"
      );
    }
  }

  return <DSRButton label={String(children)} {...props} />;
};
```

**Format:** `[ComponentName] Clear message with example`

### JSDoc Template

```tsx
/**
 * @fileoverview Button component wrapper for DSR ButtonV2
 *
 * @description
 * Wrapper that adapts DSR ButtonV2 to a standard React API.
 * DSR uses `label` prop and ButtonVariantEnum; this wrapper
 * accepts `children` (string) and simple variant strings.
 *
 * ## Variant Reference
 * | Variant | DSR Enum | Use Case |
 * |---------|----------|----------|
 * | `default` | Filled | Primary action (1 per section) |
 * | `outline` | Outlined | Secondary actions |
 * | `ghost` | Standard | Tertiary/subtle actions |
 * | `destructive` | Error | Delete/dangerous actions |
 *
 * @when_to_use
 * - Primary and secondary actions in forms
 * - CTAs in modals and pages
 * - Navigation actions
 *
 * @when_not_to_use
 * - Icon-only buttons → use IconButton
 * - Link navigation → use Link component
 *
 * @example
 * ```tsx
 * // Basic
 * <Button variant="default">Save</Button>
 * <Button variant="outline">Cancel</Button>
 *
 * // With icons
 * <Button leadingIcon="Add">Add Item</Button>
 * <Button trailingIcon="ArrowRight">Next</Button>
 *
 * // Loading state
 * <Button isLoading>Saving...</Button>
 * ```
 */
```

### Exports Checklist

From each component file, export:

```tsx
// Always export
export { ComponentName };

// Export if defined
export { COMPONENT_VARIANTS, COMPONENT_SIZES };

// Re-export DSR enums only if users need them directly
export { SomeEnum } from "@adsmurai/design-system-react";
```

**Remember:** Enums go in `src/enums/index.ts`, types go in `src/types/index.ts`.

### Complete Example

```tsx
/**
 * @fileoverview Badge component wrapper for DSR Badge
 *
 * @description
 * Displays a small status indicator or count.
 * Only accepts text/numbers as children.
 *
 * @when_to_use
 * - Status indicators (online, offline)
 * - Notification counts
 * - Labels on items
 *
 * @when_not_to_use
 * - Interactive tags → use Chip
 * - Descriptive labels → use Tag
 *
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="destructive">3</Badge>
 * ```
 */
import * as React from "react";
import { Badge as DSRBadge, BadgeColorEnum } from "@adsmurai/design-system-react";
import { cn } from "@/lib/utils";

// 1. Enum mappings
const variantMap: Record<string, BadgeColorEnum> = {
  default: BadgeColorEnum.Neutral,
  success: BadgeColorEnum.Success,
  warning: BadgeColorEnum.Warning,
  destructive: BadgeColorEnum.Danger,
  info: BadgeColorEnum.Info,
};

const sizeMap: Record<string, "extra-small" | "small" | "medium" | "large"> = {
  xs: "extra-small",
  sm: "small",
  md: "medium",
  lg: "large",
};

// 2. Exported constants
export const BADGE_VARIANTS = {
  default: "default",
  success: "success",
  warning: "warning",
  destructive: "destructive",
  info: "info",
} as const;

export const BADGE_SIZES = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

// 3. Props interface
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof BADGE_VARIANTS;
  size?: keyof typeof BADGE_SIZES;
  children: React.ReactNode;
  dataQa?: string;
}

// 4. Component
function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  dataQa,
  ...props
}: BadgeProps) {
  // Development validation
  if (process.env.NODE_ENV === "development") {
    if (typeof children !== "string" && typeof children !== "number") {
      console.warn(
        "[Badge] Only accepts text or numbers. For icons, use Chip instead."
      );
    }
  }

  const dsrColor = variantMap[variant];
  const dsrSize = sizeMap[size];

  return (
    <div className={cn("inline-flex", className)} {...props}>
      <DSRBadge color={dsrColor} size={dsrSize} dataQa={dataQa}>
        {String(children)}
      </DSRBadge>
    </div>
  );
}

// 5. Exports
export { Badge };
```

### Quick Checklist

Before submitting a new wrapper or component change:

- [ ] **JSDoc** - Has @fileoverview, @description, @when_to_use, @example
- [ ] **Enum mapping** - Uses `Record<string, EnumType>` for variants/sizes
- [ ] **Constants** - Exports `COMPONENT_VARIANTS` as const
- [ ] **Props** - Uses `Omit<>` for HTML extension, documents each prop
- [ ] **Callbacks** - Adapted to React standard (events, not raw values)
- [ ] **Refs** - Uses `forwardRef` or documents why not
- [ ] **Validation** - Has dev-only warnings for common mistakes
- [ ] **className** - Supported for customization
- [ ] **dataQa** - Supported for testing
- [ ] **displayName** - Set for React DevTools
- [ ] **CHANGELOG** - Updated `CHANGELOG.md` with changes
