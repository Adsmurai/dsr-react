/**
 * Generates UI-CONTRACT.md — the condensed contract meant to be committed into
 * the Foundation Kit template (and pasted into Lovable's Knowledge).
 *
 * Why generated rather than hand-written: `node_modules/**\/*.md` is not in a
 * Lovable model's context, so the shipped AI-INSTRUCTIONS.md never reaches the
 * actual consumer. A file committed in the project *is* in context. Generating
 * it from the live barrel means it cannot claim a component or constant that
 * does not exist — which is exactly how the previous docs drifted.
 *
 * Run with `npm run contract`.
 */
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const pkg = require(resolve(root, 'package.json'));

// Read the exports out of the BUILT bundle, not the source: the doc must
// describe what a consumer actually receives. Doubles as a smoke test that
// dist is importable and its surface matches the barrel.
const barrel = await import(resolve(root, 'dist/index.js'));
const enums = await import(resolve(root, 'dist/enums.js'));
const tokens = require(resolve(root, 'src/tailwind/tokens.json'));

const names = Object.keys(barrel).filter((n) => n !== 'default');
const isConst = (n) => /^[A-Z][A-Z0-9_]*$/.test(n);
const constants = names.filter(isConst).sort();
const components = names.filter((n) => !isConst(n) && /^[A-Z]/.test(n)).sort();
const hooksAndUtils = names.filter((n) => /^[a-z]/.test(n)).sort();

const bp = ['xs', 'sm', 'md', 'lg', 'xl'].map((b) => `${b} ${tokens.ds[`bp-${b}`]}`).join(' · ');

const doc = `<!--
  GENERATED — do not edit by hand.
  Produced by adsmurai-dsr-react@${pkg.version} (scripts/generate-ui-contract.mjs).
  Regenerate after upgrading the library so this file cannot drift from it.
-->

# UI contract: adsmurai-dsr-react@${pkg.version}

All UI in this project comes from \`adsmurai-dsr-react\`. It is the public
contract over the internal Adsmurai design system.

## Hard rules

1. **Never** import \`@adsmurai/design-system-react\`. It is bundled inside
   \`adsmurai-dsr-react\`; importing it directly bypasses the stable API.
2. **Never** create a local component that duplicates one below. Use the library
   component, even if it needs a wrapper for layout.
3. **Never** import from internal paths
   (\`adsmurai-dsr-react/components/ui/button\`). Only the four entry points below.
4. Enums come from \`/enums\` and types from \`/types\` — never from the root.

## Entry points

| Import from | For |
|---|---|
| \`adsmurai-dsr-react\` | components, hooks, utilities, constants |
| \`adsmurai-dsr-react/enums\` | enums (${Object.keys(enums).length} available) |
| \`adsmurai-dsr-react/types\` | prop types |
| \`adsmurai-dsr-react/styles\` | the stylesheet — **required once at the app entry** |

\`\`\`tsx
import 'adsmurai-dsr-react/styles';                       // required
import { Button, Card } from 'adsmurai-dsr-react';
import { IconsEnum } from 'adsmurai-dsr-react/enums';
import type { ButtonProps } from 'adsmurai-dsr-react/types';
\`\`\`

No Tailwind config is needed for the library to render correctly.

## Gotchas that cause silent breakage

- \`Chip\` takes \`label\`, **not** children, and its props depend on \`variant\`
  (\`assist\` | \`suggestion\` | \`input\` | \`filter\` | \`status\` | \`colorful\`).
  \`selected\` is \`filter\`-only; \`onRemove\` is \`filter\`/\`input\`-only;
  \`status\` and \`colorful\` are not interactive.
- \`Button\`, \`Badge\`, \`Checkbox\` and \`RadioGroupItem\` take **string** children.
  Passing JSX renders empty or \`[object Object]\`.
- Two toast systems, not interchangeable: \`useToast()\` + \`<Toaster />\` is the
  default; \`sonnerToast\` + \`<Sonner />\` is the promise-based alternative. The
  root \`toast\` is the useToast one, so \`toast.success()\` throws.
- \`DataTable\`: every row needs an \`id\`. \`Select\`: \`options\` array, primitive
  \`value\`s. \`Stepper\`: \`activeStep\` is 0-indexed but \`onStepClick\` gives a
  1-indexed \`order\`.
- \`Icon\`: omit \`baseType\`; the design system default is correct.
- \`buttonVariants\` is deprecated and produces no colour — do not use it.
- Providers: \`Tooltip\` needs \`TooltipProvider\`, \`useToast\` needs \`<Toaster />\`,
  \`Sidebar\` needs \`SidebarProvider\`.
- \`DataTable\` / \`DateRangePicker\` need a MUI X Pro licence key or they show a
  watermark.

## Breakpoints

The design system's scale, **not** Tailwind's defaults: ${bp}.
Only \`md: 768px\` overlaps, and it is shifted — DS \`sm\` equals Tailwind's
default \`md\`.

## Components (${components.length})

${components.join(', ')}

## Hooks and utilities

${hooksAndUtils.join(', ')}

## Exportable constants (${constants.length})

Use these instead of guessing string values — they are the valid sets.

${constants.join(', ')}
`;

writeFileSync(resolve(root, 'UI-CONTRACT.md'), doc);
console.log(
  `contract: UI-CONTRACT.md — ${components.length} components, ${hooksAndUtils.length} hooks/utils, ${constants.length} constants`,
);
