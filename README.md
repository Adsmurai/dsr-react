# adsmurai-dsr-react

Adsmurai Design System React — the public UI contract over the internal Adsmurai
design system (DSR). One import surface for components, hooks, enums and types.

**Never import `@adsmurai/design-system-react` directly.** It is bundled inside
this package; reaching for it bypasses the stable API.

## Install

```bash
npm install adsmurai-dsr-react
```

## Setup

Two steps. The first is required — without it the components render unstyled.

**1. Import the stylesheet, once, at your app entry:**

```tsx
// src/main.tsx
import 'adsmurai-dsr-react/styles';
```

That single file carries everything the components need: the design system's own
CSS, the design-token defaults, and the Tailwind utility classes the components
use. **No Tailwind configuration is required** for the library to look right.

**2. Mount the providers you use:**

```tsx
import { TooltipProvider, Toaster } from 'adsmurai-dsr-react';

<TooltipProvider>
  <App />
  <Toaster />
</TooltipProvider>
```

`Tooltip` needs `TooltipProvider`; `useToast()` needs `<Toaster />`; `Sidebar`
needs `SidebarProvider`.

### If you use `DataTable` or `DateRangePicker`

They are backed by MUI X Pro, which needs a licence key or it renders a
watermark. Set it once, from your own environment — the key must not be
committed:

```tsx
import { LicenseInfo } from '@mui/x-license';

LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_LICENSE_KEY);
```

### Optional: use the design tokens in your own markup

The library styles itself, so this is only for code *you* write. The preset adds
the Adsmurai palette, radii, fonts, shadows and — importantly — the design
system's breakpoints, which are **not** Tailwind's defaults:

```js
// tailwind.config.js
import dsrPreset from 'adsmurai-dsr-react/preset';

export default {
  presets: [dsrPreset],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
};
```

| Breakpoint | Adsmurai DS | Tailwind default |
|---|---|---|
| `xs` | 576px | — |
| `sm` | 768px | 640px |
| `md` | 992px | 768px |
| `lg` | 1200px | 1024px |
| `xl` | 1440px | 1280px |

Only `md: 768px` overlaps, and it is shifted: DS `sm` equals Tailwind's default
`md`. Adopting the preset changes how existing responsive classes in your app
behave.

`adsmurai-dsr-react/theme.css` exposes the token custom properties on their own.
They sit in a native `@layer dsr-tokens`, so if your app already defines its own
`:root` theme, yours wins with no configuration.

## Usage

```tsx
import { Button, Card, Input, Chip, useIsMobile, cn } from 'adsmurai-dsr-react';
import { IconsEnum } from 'adsmurai-dsr-react/enums';
import type { ButtonProps } from 'adsmurai-dsr-react/types';

function App() {
  const isMobile = useIsMobile();

  return (
    <Card className={cn(isMobile && 'p-2')}>
      <Input label="Campaign name" />
      <Chip variant="status" status="success" label="Active" />
      <Button startIcon="Add">Create</Button>
    </Card>
  );
}
```

### Import paths

| From | What |
|---|---|
| `adsmurai-dsr-react` | components, hooks, utilities, exportable constants |
| `adsmurai-dsr-react/enums` | all enums (`IconsEnum`, `ButtonVariantEnum`, …) |
| `adsmurai-dsr-react/types` | prop types (`ButtonProps`, `SelectOption`, …) |
| `adsmurai-dsr-react/styles` | the stylesheet (required) |
| `adsmurai-dsr-react/theme.css` | design tokens only |
| `adsmurai-dsr-react/preset` | Tailwind preset (optional) |

Enums and types are **not** exported from the root, and internal paths
(`adsmurai-dsr-react/components/ui/button`) are not part of the API.

## Peer dependencies

| Package | Version | Required |
|---|---|---|
| `react` | `>=18.0.0` | Yes |
| `react-dom` | `>=18.0.0` | Yes |
| `react-hook-form` | `>=7.0.0` | Yes |
| `tailwindcss` | `>=3.0.0` | Only if you use the preset |
| `zod` | `>=3.0.0` | Optional (form validation) |

## More documentation

Shipped inside the package, for humans and for AI coding tools:

- `AI-INSTRUCTIONS.md` — component reference, import rules, per-component gotchas
- `PATTERNS.md` — composed patterns (forms, data tables, layouts)
- `THEMING.md` — the style contract and how to override tokens
- `CHANGELOG.md` — including the 2.0.0 migration tables

## License

MIT
