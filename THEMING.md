# Theming

How `adsmurai-dsr-react` gets its appearance, and how to change it.

## The one required step

```tsx
import 'adsmurai-dsr-react/styles';
```

Without this line roughly two thirds of the library renders as unstyled DOM.
There is no way for the package to inject it: the stylesheet is not referenced
from the JavaScript bundle, so no bundler will pull it in on your behalf.

## What that file contains

Three layers, in this order, assembled at build time:

| Layer | Size | What it is |
|---|---|---|
| 1. Design system CSS | ~296 kB | The 274 `.e-*` classes the DSR components render with |
| 2. Token defaults | ~2.5 kB | The shadcn-style custom properties, in a native `@layer dsr-tokens` |
| 3. Component utilities | ~54 kB | The 391 Tailwind classes this library's own components use |

Layer 3 is pre-compiled deliberately. The components hardcode Tailwind class
strings (`bg-popover`, `ring-ring`, `sm:max-w-lg`), and those are inert unless
something runs Tailwind over them. Shipping a preset with a `content` glob does
not solve it — **Tailwind does not honour a `content` glob declared inside a
preset**, with or without a `content` in the consuming config. So the library
compiles its own classes instead, and you need no Tailwind setup at all.

## Overriding the tokens

Layer 2 sits inside a native `@layer dsr-tokens`. Native layers rank *below* unlayered
rules, so anything you declare normally wins — no `!important`, no config:

```css
/* your index.css — this beats our defaults */
:root {
  --primary: 262 83% 58%;
  --radius: 12px;
}
```

Values are bare HSL channels (`249.6 68.2% 53.1%`), not colour functions,
because the utilities resolve them through `hsl(var(--token))`.

### Why the layer is not called `base`

`base` is also a Tailwind directive name. Tailwind's PostCSS plugin throws

```
`@layer base` is used but no matching `@tailwind base` directive is present
```

on any stylesheet carrying it without a matching `@tailwind base` — and since
you import `adsmurai-dsr-react/styles` from JS, your bundler hands that file to
PostCSS on its own, with no `@tailwind` directive in sight. Tailwind only claims
`base`, `components` and `utilities`, so the dedicated name passes through
untouched and stays a real native layer.

Do **not** "fix" a build error by `@import`-ing the stylesheet into a file that
has `@tailwind base`. That compiles, but Tailwind flattens the layer, and the
defaults stop being layered — they then only lose to your theme by source
order, which breaks the moment someone reorders the imports.

If your app already has a shadcn theme block, you do not have to do anything:
yours already wins.

### Available tokens

`--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`,
`--popover-foreground`, `--primary`, `--primary-foreground`, `--secondary`,
`--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`,
`--accent-foreground`, `--destructive`, `--destructive-foreground`, `--border`,
`--input`, `--ring`, `--radius`, `--chart-1` … `--chart-5`, and the sidebar set
(`--sidebar-background`, `--sidebar-foreground`, `--sidebar-accent`,
`--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring`).

`adsmurai-dsr-react/theme.css` exports just this layer, if you want the tokens
without the rest.

## Using the tokens in your own markup

```js
// tailwind.config.js
import dsrPreset from 'adsmurai-dsr-react/preset';

export default {
  presets: [dsrPreset],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
};
```

This is optional — the library is already styled. The preset gives *your* code
the DS palette, radii (8px for containers, 4px for chips and cells), the three
font families, the purple-tinted shadows, and the DS breakpoints.

**The breakpoints are a behaviour change.** DS uses `xs 576 / sm 768 / md 992 /
lg 1200 / xl 1440`; Tailwind defaults to `sm 640 / md 768 / lg 1024 / xl 1280`.
Only `md: 768px` overlaps and it is shifted — DS `sm` is Tailwind's default `md`.
Adopting the preset therefore changes when your existing `sm:`/`md:`/`lg:`
classes fire. Check your responsive layouts after adding it.

## Where the values come from

Nothing here is transcribed by hand. `scripts/generate-tokens.mjs` compiles the
SCSS of `@adsmurai/design-system` — the design system's own token source — into
`theme.css` and the preset, converting hex to HSL channels along the way. A
design-system upgrade regenerates them, so they cannot drift from design.

The generated files are committed, so a DS bump shows up as a reviewable diff,
and `Foundations/Design Tokens` in Storybook renders the whole palette, the
shadows, the radii and the breakpoints for visual review.

To regenerate after a design-system upgrade:

```bash
npm run tokens
```

## Dark mode

Not supported. The design system's shadows are calibrated for light surfaces,
and no component in this library reads a theme, so shipping a `.dark` block
would produce a half-broken result rather than a dark theme.
