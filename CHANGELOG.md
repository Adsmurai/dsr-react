# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-09-10

### Breaking
- **@adsmurai/design-system-react**: Upgraded from 11.2.2 to 15.0.0 (four majors)
- **@adsmurai/design-system**: 2.5.1 → 3.0.0 (transitive, pinned exactly by DSR 15)
- **Dependencies restructured so the package installs from public npm.** `@adsmurai/design-system-react` is no longer a runtime dependency — it is bundled into `dist/`, so declaring it only made `npm install` fail with E404 for anyone without `@adsmurai` scope auth. Removing it also removed the transitive path that silently supplied MUI, Emotion, ECharts and Tiptap, so those are now declared explicitly: `@mui/material`, `@mui/x-data-grid-pro`, `@mui/x-date-pickers-pro`, `@mui/x-license`, `@mui/x-tree-view`, `@emotion/react`, `@emotion/styled`, `@emotion/is-prop-valid`, `@emotion/unitless`, `echarts`, `@tiptap/react`, `@tiptap/suggestion` and the 26 `@tiptap/extension-*` the bundle imports. MUI and ECharts mirror DSR's exact pins on purpose: a range that drifts from DSR's would install a second copy of MUI and break its Emotion theme context.
- **`react-hook-form` is now a required peer dependency**, not an optional one. It was always imported statically from the main chunk, so `optional: true` was never true.

- **`Tag` removed**: DSR 15 deleted its `Tag` component. Use `Chip` instead:
  | Before | After |
  |--------|-------|
  | `<Tag color="success">Approved</Tag>` | `<Chip variant="status" status="success" label="Approved" />` |
  | `<Tag color="error">Failed</Tag>` | `<Chip variant="status" status="error" label="Failed" />` |
  | `<Tag color="warning">Review</Tag>` | `<Chip variant="status" status="warning" label="Review" />` |
  | `<Tag color="info">Note</Tag>` | `<Chip variant="status" status="info" label="Note" />` |
  | `<Tag color="neutral">UX</Tag>` | `<Chip variant="status" status="default" label="UX" />` |
  | `<Tag color="primary">UX</Tag>` | `<Chip variant="colorful" color="blue-light" label="UX" />` |
  | `<Tag color="processing">Syncing</Tag>` | no equivalent — DSR 15 dropped the animated state |
  | `<Tag variant="secondary">` | no equivalent — `variant` had no counterpart in DSR 15 |
  | `<Tag onDelete={fn}>X</Tag>` | `<Chip variant="input" label="X" onRemove={fn} />` (loses the colour) |
- **`TagProps` type removed** (from `adsmurai-dsr-react/types`)
- **`TagColorsEnum`, `TagVariantsEnum` removed** (from `adsmurai-dsr-react/enums`) — deleted upstream
- **`Chip` is now a discriminated union on `variant`** (`assist` \| `suggestion` \| `input` \| `filter` \| `status` \| `colorful`), mirroring DSR `ChipV2`. `selected` is `filter`-only, `onRemove` is `filter`/`input`-only, and `status`/`colorful` are non-interactive. Calls that relied on the old flat API need a `variant`:
  | Before | After |
  |--------|-------|
  | `<Chip label="X" selected />` | `<Chip variant="filter" label="X" selected />` |
  | `<Chip label="X" onRemove={fn} />` | `<Chip variant="input" label="X" onRemove={fn} />` |
  | `<Chip label="X" />` | unchanged (defaults to `assist`) |
- **`DataTable` variant `grid` removed**: DSR 15's `TableVariantEnum` only has `Primary` and `Secondary`. `DATA_TABLE_VARIANTS` is now `['primary', 'secondary']`
- **`DataTable.rowSelectionModel` retyped** from MUI's `GridRowSelectionModel` to `GridRowId[]`. MUI X v8 changed that type to `{ type, ids: Set }`, but DSR's `TableV2` still takes a plain array — passing the object shape now fails to compile
- **`Icon` baseType `sharp` removed**: not in DSR 15's `IconBaseTypeEnum`. Use `outlined`
- **Props that did nothing have been removed from the types.** Each was accepted by TypeScript and silently ignored at runtime, which is the worst possible outcome for generated code — a type error is feedback, a silent no-op is not. Removing them turns each into a compile error at the call site:
  | Removed | Why |
  |---|---|
  | `Button.asChild` | Declared and destructured, never used; `Slot` was never even imported |
  | `Slider.step` | The prop's own comment admitted DSR Slider has no `step`; the slider was never stepped |
  | `Textarea.placeholder` | DSR `InputField` has no `placeholder` prop. Use `label` |
  | `PopoverTrigger.asChild` | Never read, and it contradicted the example in the same file's docblock |
  | `TooltipProvider.delayDuration`, `.skipDelayDuration`, `.disableHoverableContent` | No delay logic exists anywhere in the component |
  This immediately caught a real call site: `sidebar.tsx` was passing `delayDuration={0}` to `TooltipProvider`, which had never done anything.

### Added
- **The whole style contract is now one import.** `adsmurai-dsr-react/styles` carries three layers, assembled at build time by `scripts/compose-styles.mjs`: DSR's own CSS (295 kB), the design-token defaults (2.5 kB), and the 391 Tailwind utility classes the components actually use (54 kB). A consumer with **no Tailwind config at all** now gets correctly styled components — verified in a scratch Vite app.
  - Previously the components' Tailwind class strings (`bg-popover`, `ring-ring`, `sm:max-w-lg`…) were inert unless the consuming app happened to scan `node_modules` for them, and the shadcn theme tokens they resolve against were defined nowhere.
  - The utilities have to be compiled here rather than scanned by the consumer: a Tailwind `content` glob declared inside a *preset* is not honoured. Verified against Tailwind 3 both with and without a `content` in the consuming config — neither picks it up.
- **Design tokens are generated from the design system, not transcribed.** `scripts/generate-tokens.mjs` compiles `@adsmurai/design-system/scss` (the DS 3.0 token source) into 30 shadcn custom properties, converting to the HSL channel triplets that `hsl(var(--token))` and `sidebar.tsx` both require. A DS bump regenerates them instead of silently drifting. Run with `npm run tokens`; the build runs it too, so it cannot drift.
- **`adsmurai-dsr-react/theme.css`** — the token defaults on their own, wrapped in a native `@layer base`. Native layers rank *below* unlayered rules, so an app that already defines its own `:root` theme keeps winning with no configuration, while an app without one gets the Adsmurai palette.
- **`adsmurai-dsr-react/preset`** — optional Tailwind preset (ESM + CJS) for writing your own markup against the DS tokens: palette, radii, fonts, purple-tinted shadows, and the DS breakpoints. **Those breakpoints are not Tailwind's defaults** — DS is `xs 576 / sm 768 / md 992 / lg 1200 / xl 1440`, so only `md: 768px` overlaps and it is shifted (DS `sm` equals Tailwind's default `md`). The library's own 68 responsive classes now compile against the DS scale.
- **Storybook renders the real styles for the first time.** `.storybook/preview.ts` previously imported no CSS whatsoever, so neither the DSR wrappers nor the shadcn components had ever been seen with their intended appearance. Adds Tailwind (scoped to Storybook, so the library build's CSS is untouched), DS viewport presets, and a `Foundations/Design Tokens` story set that renders the generated palette, shadows, radii and breakpoints — so a DS bump is visually reviewable.
- **The 32 unreachable constants are now on the public API**, plus `Rating`, `AlertTitle`, `AlertDescription`, `PopoverAnchor` and the `CalendarProps` type. All of these were exported by their own component file and never re-exported from the barrel, so they could not be imported from `adsmurai-dsr-react` — while `COMPONENT-STATUS.md` recorded them as complete. Includes `ICON_SIZES`, `ICON_COLORS`, `ICON_BASE_TYPES`, the five `TYPOGRAPHY_*` sets, `TOOLTIP_POSITIONS`, `MODAL_STATUSES`, `SHEET_SIDES`, `POPOVER_SIDES`/`ALIGNS`, `SKELETON_VARIANTS`/`ANIMATIONS`, `PROGRESS_VARIANTS`/`SIZES`, `ICON_BUTTON_VARIANTS`/`SIZES`, `LINK_TEXT_VARIANTS`/`SIZES`, `DRAWER_PLACEMENTS`/`SIZES`, `ACCORDION_TYPES`, `COLLAPSABLE_SIZES`, `SEPARATOR_ORIENTATIONS`, `RADIO_GROUP_ORIENTATIONS`, `INPUT_SEARCH_SIZES`, `TOGGLE_BUTTON_GROUP_SIZES`/`VARIANTS`, `STATUS_TAG_STATUSES` and `RATING_MAX_VALUES`.
- **A registry-driven contract harness** (`src/test/contract/`). One row per component that gets written by hand, plus generic `it.each` suites asserting what the old hand-written tests could not: the component renders a DOM node, `className` reaches an element and reaches the *documented* one, promised HTML attributes arrive, a declared `forwardRef` actually attaches, and children never render as `[object Object]`, `"undefined"` or nothing at all. 185 assertions from ~30 registry rows. It produced the fix list below rather than the list being guessed, and it also recorded where `className` legitimately cannot be forwarded — only three public DSR components accept it at all — so a future change there fails the suite instead of silently relocating consumers' styles.
- **Three existing tests asserted the bug as the specification** (`button.test.tsx:111/117`, `input.test.tsx:232` all checked that a consumer's `className` had landed on a wrapper). Rewritten to state that intent explicitly, plus new cases for attribute forwarding, ref attachment and interpolated children.
- **`src/test/public-api.test.ts`** guards that surface from now on: every export of every component module must be reachable from the barrel or listed in `KNOWN_PRIVATE` **with a written reason**. It also asserts no enum leaks through the root (they belong to `/enums`). Silent drift is now a failing build instead of a documentation claim.
- **`sonnerToast`** — Sonner's imperative API is now actually reachable. `<Sonner />` was exported without it, making the component unusable, while `sonner.tsx`'s own 110-line docblock documented `import { toast } from 'adsmurai-dsr-react'` and `toast.success(...)` — an import that resolves to the useToast API, which has no `.success`. Every example in that docblock generated broken code. Rewritten.
- **Docs now ship with the package.** `files` gained `AI-INSTRUCTIONS.md`, `PATTERNS.md`, `THEMING.md`, `UI-CONTRACT.md` and `CHANGELOG.md`; previously the tarball carried only a 736-byte README, so all of the authored AI guidance was invisible to consumers.
- **`THEMING.md`** — the style contract, how to override tokens, and why the breakpoints differ from Tailwind's.
- **`UI-CONTRACT.md`**, generated from the built bundle by `npm run contract` — a condensed contract to commit into the Foundation Kit template (`node_modules/**/*.md` is not in a Lovable model's context; a file committed in the project is). Generated from `dist`, so it cannot list a component or constant that does not exist, and it doubles as a smoke test that `dist` is importable.
- **Chip**: `size` prop (`extra-small`, `small`, `medium`, `large`) and `leadingIcon` (React element, takes priority over `icon`)
- **Chip**: exported constants `CHIP_VARIANTS`, `CHIP_SIZES`, `CHIP_STATUSES`, `CHIP_COLORFUL_PRESETS`
- **Types**: `AssistChipProps`, `SuggestionChipProps`, `InputChipProps`, `FilterChipProps`, `StatusChipProps`, `ColorfulChipProps`, `ChipVariant`, `ChipSize`, `ChipStatus`, `ChipColorfulPreset`
- **Icon**: baseTypes `outlined-symbols` and `rounded-symbols` (new Material Symbols styles in DSR 15)
- **`.npmrc`**: scope config for the GitLab registry, with the token read from `${GITLAB_NPM_TOKEN}` instead of being written to the file

### Fixed
- **The package was silently broken on React 19, and the peer range invited it.** `peerDependencies.react` was `>=18.0.0`, so npm happily installed React 19 — which is what `npm create vite` gives you today. The result is a **blank page**: React 19 removed `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED`, and the React-18-era `jsx-runtime` that DSR bundles inside its own `lib/` reads it, so the app dies at module scope with `Cannot read properties of undefined (reading 'ReactCurrentOwner')`. Verified in a scratch Vite app on React 19.3.0 against the bundled build. The range is now `>=18.0.0 <19.0.0` for both `react` and `react-dom`, so a React 19 project fails loudly at install with `ERESOLVE` instead of rendering nothing. React 18.3.1 installs and renders correctly (verified in the browser: DSR classes, DS colours, DS fonts).
- **`<Button>Save {count}</Button>` rendered an invisible button.** Interpolated children arrive as an array, and the old `typeof children === 'string' ? children : ''` fallback turned that into an empty label. Same class of bug in `Badge` (`String(children)` rendered the literal text `"undefined"` for `<Badge />`) and `Checkbox`. All three now use a shared `toText()` helper that flattens strings, numbers and arrays, returns `undefined` when there is nothing to render, and warns in dev when JSX is flattened.
- **`Button` now forwards the HTML attributes it always promised.** `ButtonProps` extends `ButtonHTMLAttributes`, but the implementation read only `onClick` and `type`; `id`, `aria-label`, `data-*`, `onFocus`, `onKeyDown`, `form` and `tabIndex` were silently discarded. They now reach the real `<button>`. `className` is deliberately still kept off it — `ButtonV2` applies a consumer `className` *after* its own computed classes, so forwarding it there would erase DSR's styling outright.
- **`Input` and `Textarea` never attached their forwarded ref.** Both declared `forwardRef` and never referenced it, so `ref.current` stayed `null` forever and focus management silently did nothing. They now adapt to DSR's `inputRef`. `Input` also applies `name` to the real input (it was destructured and used only inside synthetic events), and both spread their remaining attributes onto the wrapper instead of dropping them.
- **`Alert`'s runtime warning** told consumers to use `AlertTitle`/`AlertDescription`, which were not importable. Both are now exported and the message names the import.
- **`ProcessingIcon.className`** was declared in the props and not even destructured, so it had no effect anywhere. Now applied to the wrapper.
- **`sideEffects`** is now `["**/*.css"]` instead of `false`. The old value let bundlers drop a consumer's `import 'adsmurai-dsr-react/styles'`, which is the import two thirds of the library needs to render. Verified in a scratch Vite consumer: adding the import takes the emitted CSS from 1.78 kB to 241.87 kB.
- **Build**: output is now minified (`minify: true`). The package is public, so shipping the internal design system's source readable was an avoidable disclosure. `dist/index.js` 1.82 MB → 1.69 MB and the bundled CSS 297.8 kB → 240.6 kB; consumer bundles are unchanged, since their own minifier already did that work.
- **Build**: `vite-plugin-dts` now excludes `*.stories.tsx`, matching `tsconfig.build.json`. This silences a pre-existing TS4023 failure on union-prop components (`accordion.stories.tsx`) and stops shipping 19 `.stories.d.ts` files that referenced Storybook types consumers don't install
- **Tests**: `@testing-library/dom` added as an explicit devDependency (peer of `@testing-library/react` 16, so it was never installed under `--legacy-peer-deps`)
- **Tests**: DSR is now inlined in the Vitest config — DSR 15 imports raw CSS from its ESM entry, which Node cannot load

### Deprecated
- **`buttonVariants`** — a `cva()` whose every variant resolves to an empty string, which `Button` never applies. `className={buttonVariants({ variant: 'outline' })}` on an `<a>` (the canonical shadcn idiom) yields layout classes with no colour. Use `<Button>`, or `BUTTON_VARIANTS` for the valid values. Removed next major. `badgeVariants` has the same shape and is deliberately not exported.

### Improved
- **README**: rewritten as a real quickstart. It now documents the required `import 'adsmurai-dsr-react/styles'`, the providers, the MUI X Pro licence key, the optional Tailwind preset and the breakpoint table. Previously it documented `npm install` and one snippet, and no file in the repo mentioned the styles import at all.
- **AI-INSTRUCTIONS.md**: added a Required Setup section; a "two toast systems, do not mix them" table; an overlapping-components table resolving the three cases DS 3.0 is explicit about (labels → `Chip variant="status"`, header nav → the layouts, dropdowns → `Select`); `Icon` should omit `baseType`; `buttonVariants` marked do-not-use. Rewrote the `Chip` entry with the variant matrix; removed `Tag` and the deleted enums.
- **`Alert`'s dev warning** now names the import. It told consumers to use `AlertTitle`/`AlertDescription`, which were not exportable — the advice was impossible to follow.
- **`Icon` JSDoc** no longer leads with `baseType="outlined"`. The design system's default is `RoundedSymbols`, so the old example steered code generators away from the correct variant.
- **COMPONENT-STATUS.md**: updated the Chip/Tag row, and added a notice that its "✅" marks had asserted work that never reached the public API — the barrel test is now the source of truth.

### Known issues
- **Tree-shaking does not work in this release: importing only `Button` costs 3.53 MB** (1.09 MB gzip), indistinguishable from importing eighteen components (3.70 MB). Every consumer ships MUI, ECharts and Tiptap regardless of what they use. There are two independent blockers, both measured:
  - DSR is *bundled* into one chunk, which collapses its own per-file ESM tree (that tree is fully tree-shakeable on its own).
  - Our `dist/index.js` is a single module, so importing one export retains the whole body — and with it the import of DSR's barrel. Fixing either one alone changes nothing: DSR external alone gives 3.65 MB, `preserveModules` alone gives 7.19 MB.
  - **A fix has been prototyped and verified end-to-end, entirely within this package**: vendor DSR's `lib/` into `dist/vendor/dsr/` instead of bundling it, rewrite the bare specifier to a relative path, patch DSR's vendored `react/jsx-runtime` references back to bare specifiers, and switch the output to per-module ESM. Measured on React 18: **467 kB / 154 kB gzip** for `Button` alone, CSS **10.4 kB** instead of 284 kB, zero MUI/ECharts/Tiptap/Recharts, types resolving, nothing extra to install, and verified rendering correctly in a browser. Costs: ESM-only (DSR's `exports` has no `require` condition), +0.4 MB tarball, 104 published files, and `./styles` shrinking to tokens plus our own utilities since DSR's CSS then arrives per component. Not applied in this release — it is a structural change that deserves its own review.
- **48 of 93 component files silently drop props.** `className` mostly lands on a wrapper element rather than the styled node — largely unavoidable, since only three public DSR components accept `className` at all and `ButtonV2` applies a consumer `className` *after* its own, replacing DSR's styling entirely. But several are plain oversights: `input.tsx`/`textarea.tsx` capture `...props` and never spread it and never attach their `ref` (DSR exposes `inputRef`), and `<Button>Save {count}</Button>` renders an **invisible** button because `children` is coerced with an empty-string fallback. Not addressed in this release.
- **The published bundle is a single 1.8 MB chunk** (`preserveModules: false`), so importing one component pulls the whole graph. A scratch consumer app importing 18 components builds to 3.7 MB / 1.1 MB gzip. Code-splitting is what would make the MUI/ECharts/Tiptap dependencies genuinely optional.
- `react-day-picker@8` peer-conflicts with `date-fns@4`. This affects **development in this repo only** (both are direct dependencies here, so `npm install` needs `--legacy-peer-deps`); consumers install fine, since npm nests the transitive copy and only warns. `react-day-picker@10` drops the `date-fns` peer entirely and would remove the conflict.

## [1.2.0] - 2026-04-07

### Breaking
- **@adsmurai/design-system-react**: Upgraded from 9.95.6 to 11.2.2
- **SelectWithSearch**: Removed `hasMorePages` prop (DSR 10.1.2 switched to cursor-based pagination)

### Added
- **CustomLayout**: New `onOrgSearch` and `orgBaseUrl` props for organization search (DSR 11.0.0 requires `onSearch` and `baseUrl` in Organizations)
- **SelectWithSearch**: New `variant` prop with `'outlined'` (default) and `'inline'` options
- **Types**: Re-exported `OrganizationSearchResponse` from DSR

### Changed
- **SelectWithSearch**: Internal search handler updated from page-based to cursor-based pagination signature
- **date-fns**: Updated from ^3.6.0 to ^4.1.0 (required by DSR 11)

## [1.1.0] - 2026-03-20

### Improved
- **Build**: Source maps removed from published package, dependencies externalized for smaller bundle size (10.5 MB → 3.3 MB)
- **Docs**: Updated all documentation to reflect 1.0 migration

## [1.0.0] - 2026-03-20

### Changed
- **Package name**: Renamed from `@adsmurai/dsr-react` to `adsmurai-dsr-react`
- **Registry**: Migrated from GitLab npm registry to npmjs.org (public)
- **License**: Changed from `UNLICENSED` to `MIT`
- **@adsmurai/design-system-react**: Moved from peer dependency to bundled dependency (consumers no longer need GitLab token)

## [0.1.1-snapshot.18] - 2026-02-26

### Changed
- **Card**: Default variant changed from `primary` to `secondary`

## [0.1.1-snapshot.17] - 2026-02-12

### Added

- **ActionMenu**: Added Storybook stories (Default, Destructive Confirmation, External Actions, Custom Icon, Sizes, Placements, Disabled Actions)
- **Layouts**: Added pre-configured layout components (SimpleLayout, DashboardLayout, MultiSectionLayout, CustomLayout)

### Improved

- **AI-INSTRUCTIONS.md**: Updated ActionMenu documentation with correct props and added minimal example
- **PATTERNS.md**: Added ActionMenu variation to DataTable with Actions pattern

## [0.1.1-snapshot.16] - 2026-02-04

### Changed

- **@adsmurai/design-system-react**: Updated to 9.95.6 (fixed version)

### Added

- **Skeleton**: Added `columnCount` and `numberOfItems` props for grid variant (DSR 9.95.3)

### Improved

- **AI-INSTRUCTIONS.md**: Enhanced component documentation
  - Updated DatePicker with `dateType`, `size`, `format`, `is24Hours`, `isClearable` props
  - Updated DateRangePicker with `orientation`, `showShortcuts`, `size`, `calendarsNumber` props
  - Updated DataTable with `enableQuickFilter` and `quickFilterPlaceholder` props
  - Updated Skeleton with `variant`, `width`, `height`, `columnCount`, `numberOfItems` props
  - Added Uploads section (Uploader, FileBox)
  - Added Advanced section (TreeView, RichTextEditor, AdvancedSearchBar)
  - Added DatePicker and DateRangePicker examples

## [0.1.1-snapshot.14] - 2025-01-30

### Added

- **Storybook 8.5**: Complete Storybook setup with Vite builder
  - 20 story files covering DSR and Custom components
  - Organized in "DSR Components" and "Custom Components" sections
  - Stories for: Button, Badge, Input, Select, Checkbox, RadioGroup, Switch, Tabs, Card, Alert, Modal, Tooltip, Accordion, Chip, DataTable, Stepper, Dialog, Sheet, Carousel
- **ESLint 9 config**: New `eslint.config.js` for ESLint flat config format
- **Stepper stories**: Comprehensive examples including:
  - Basic usage, all states, descriptions, vertical layout
  - Error states, interactive navigation, clickable steps
  - Checkout flow example, form wizard example
  - **Full Interactive Demo**: Complete wizard with form validation, error handling, optional/skippable steps, progress bar, and clickable navigation
- **CLAUDE.md**: Project-specific instructions for Claude
  - Documentation update rules (when to update AI-INSTRUCTIONS.md, PATTERNS.md, CHANGELOG.md)
  - Component update checklist
  - Documentation standards

### Fixed

- **Stepper**: Fixed step numbering display (was showing +1)
  - Removed explicit `order` prop, let DSR generate numbers automatically
- **Stepper**: Fixed click handler returning wrong step index
  - DSR returns 0-based index, wrapper now converts to 1-based `order`
  - `onStepClick` now receives correct 1-indexed `order` (use `order - 1` for state)
- **Empty interfaces**: Converted to type aliases in `command.tsx` and `pagination.tsx`
- **Build config**: Excluded `.stories.tsx` files from production build

### Improved

- **Stepper documentation**: Comprehensive JSDoc with:
  - Key concepts: indexing (0-based vs 1-based), state priority
  - `@ai-note` for click handling with conversion example
  - 6 complete code examples (basic, descriptions, vertical, error, clickable, full wizard)
  - Detailed interface documentation for `StepperStep` and `StepperProps`
- **AI-INSTRUCTIONS.md**: Added Stepper documentation
  - Updated Navigation table with indexing gotcha
  - Added to Special Prop Patterns table
  - Added complete Stepper example in Minimal Examples section

## [0.1.1-snapshot.13] - 2025-01-30

### Added

- **AI-INSTRUCTIONS.md**: New comprehensive documentation file for AI tools (Lovable, Claude, Cursor)
  - Architecture overview and import rules
  - Complete component reference table with restrictions and gotchas
  - Minimal code examples for all major components
- **PATTERNS.md**: Copy-paste ready patterns for common use cases
  - Form with validation (react-hook-form + zod)
  - DataTable with actions and bulk operations
  - Confirmation modal patterns
  - Selection patterns (RadioGroup vs Checkbox)
  - Tab navigation with URL sync
  - Stats cards dashboard
  - Search with filters

### Changed

- **RadioGroupItem**: `children` prop now typed as `string` (was `ReactNode`)
  - Enforces that only plain text is passed (JSX will cause TypeScript error)
- **Checkbox**: `children` prop now typed as `string` (was `ReactNode`)
  - Enforces that only plain text labels are used
- **Badge**: `children` prop now typed as `string | number` (was `ReactNode`)
  - Prevents passing JSX which would render as "[object Object]"

### Improved

- Enhanced JSDoc with `@ai-note` tags for AI tool compatibility
  - Button, Badge, Checkbox, RadioGroup, Select, Modal, DataTable, Drawer, Chip
  - Clear examples of correct and incorrect usage patterns
  - Documentation of string-only children restrictions

## [0.1.1-snapshot.12] - 2025-01-29

### Added

- **ToggleButton**: Exposed `selected` prop from DSR for controlled selection state

## [0.1.1-snapshot.10] - 2025-01-29

### Changed

- **Drawer**: Simplified to only wrap DSR Drawer component (left/right panels)
  - For top/bottom panels, use `Sheet` component instead

### Removed

- **BREAKING**: Removed `DrawerButton` component (HTML fallback) - use `Drawer` with your own trigger button
- **BREAKING**: Removed composable Drawer API (`DrawerTrigger`, `DrawerContent`, etc.) - use `Sheet` for compositional API or `Drawer` for simple side panels

## [0.1.1-snapshot.8] - 2025-01-29

### Changed

- **SelectionCard**: Now uses DSR SelectionCard internally instead of HTML fallback
  - Added new props: `value` (required), `image`, `style`, `position`, `width`, `children`
  - **BREAKING**: `onChange` signature changed from `(selected: boolean)` to `(value: string, checked?: boolean)`

### Removed

- **BREAKING**: Removed `Divider` component - use `Separator` instead (same API)
- **BREAKING**: Removed `FileUpload` component - use `Uploader` instead
  - Migration: `onFileSelect` → `onUpload`, `accept` string → array of MIME types
- **BREAKING**: Removed `Notification` component - use `useToast` hook or `Sonner` instead
  - Migration: See Toast/Sonner documentation for imperative toast API

## [0.1.1-snapshot.6] - 2025-01-29

### Changed

- **PageHeader**: Now uses DSR `Breadcrumbs` component internally instead of custom implementation

## [0.1.1-snapshot.4] - 2025-01-28

### Added

- Vitest test suite infrastructure for component testing

## [0.1.1-snapshot.3] - 2025-01-28

### Added

- JSDoc documentation with `@example` for all 97 components (Lovable compatibility)
- All documentation translated to English
- DSR Wrapper Guide documentation in `claude.md`

- New exported constants for IntelliSense and type safety:
  - `INPUT_SIZES` - Valid input size values
  - `SELECT_SIZES` - Valid select size values
  - `TAB_VARIANTS`, `TAB_SIZES` - Valid tab variant and size values
  - `CARD_VARIANTS` - Valid card variant values
  - `STEPPER_DIRECTIONS`, `STEPPER_STATES` - Valid stepper direction and state values
  - `MULTI_TEXT_FIELD_SIZES` - Valid multi-text-field size values

- New props exposed from DSR:
  - **Select**: `checkBox`, `roundedCheckBox`, `selectAllOptions`, `onSelectAll`, `menuPlacement`, `maxListHeight`, `name`, `required`
  - **SelectWithSearch**: `onCreateValue`, `isVirtualized`, `dataQa`
  - **Input**: `validate`, `autocompleteOptions`, `min`, `max`, `step`, `textAlign`, `errorMessage`
  - **Textarea**: `withCounter`, `maxCounter`, `dataQa`, `rows`, `minHeight`, `helperText`, `errorMessage`
  - **IconButton**: `tooltipPosition`
  - **Card** (all sub-components): `dataQa`
  - **Stepper**: `dataQa`
  - **MultiTextField**: `dataQa`, `onInput`
  - **Icon**: Now accepts arbitrary Material Icons strings in addition to `IconsEnum` keys

- Development validations (`console.warn`) for common mistakes:
  - `Checkbox`: Warning for complex JSX children
  - `Select`: Warning for empty options array
  - `Alert`: Warning to use AlertTitle/AlertDescription for complex content
  - `Stepper`: Warning for empty steps or out-of-bounds activeStep
  - `MultiTextField`: Warning for invalid regex patterns
  - `Icon`: Warning for unknown icon names (when using arbitrary strings)

- New type exports in `adsmurai-dsr-react/types`:
  - `StepperStep` - Step definition for Stepper component
  - `ChartLegendItem` - Legend item for ChartLegend
  - `TreeViewItem` - Node definition for TreeView
  - `DonutChartDataItem` - Data item for DonutChart
  - `LineChartDataItem` - Data item for LineChart
  - `BarChartSeriesData` - Series data for BarChart
  - `AdvancedSearchConfig`, `SearchField`, `SearchOperator`, `SearchFilterCondition` - Config types for AdvancedSearchBar
  - `DataTableRef` - Ref type for DataTable

### Changed

- **BREAKING**: Enums are now only exported from `adsmurai-dsr-react/enums`
  - Removed `IconsEnum`, `ThemesEnum` re-exports from component files
  - Removed `IconsEnum`, `IconBaseTypeEnum`, `BadgeColorEnum` re-exports from `icon.tsx`
  - Migration: `import { IconsEnum } from 'adsmurai-dsr-react/enums'`

- **BREAKING**: Types are now only exported from `adsmurai-dsr-react/types`
  - Removed inline type exports from component barrel (`index.ts`)
  - Migration: `import type { ButtonProps } from 'adsmurai-dsr-react/types'`

- **BREAKING**: Removed composable Breadcrumb components in favor of DSR-based `Breadcrumbs`
  - Removed: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`
  - Migration: Use `<Breadcrumbs steps={[{ title: 'Home', url: '/' }, { title: 'Current' }]} />`

- **BREAKING**: Removed Radix-based toggle components in favor of DSR-based versions
  - Removed: `Toggle`, `toggleVariants`, `ToggleGroup`, `ToggleGroupItem`
  - Migration: Use `ToggleButton` and `ToggleButtonGroup` (now use DSR internally)

- **BREAKING**: Removed Radix-based Collapsible in favor of DSR-based `Collapsable`
  - Removed: `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`
  - Migration: Use `<Collapsable title="Title">Content</Collapsable>`

- **Collapsable**: Now uses DSR Collapsable internally (was HTML fallback)
- **ToggleButton/ToggleButtonGroup**: Now use DSR components internally (were HTML fallback)

### Deprecated

- **Textarea**: `helper` prop is deprecated in favor of `helperText` for consistency with Input

### Fixed

- Added missing `displayName` to `Badge` component (React DevTools)
- **Drawer/Dialog**: Fixed event propagation issue where clicking inside content would close the modal
  - Added `stopPropagation` handlers to prevent overlay click events from triggering close

## [0.1.1-snapshot.1] - 2025-01-28

### Added

- Initial public release of `adsmurai-dsr-react`
- UI components wrapping DSR core components
- Custom hooks: `useIsMobile`, `useCopyToClipboard`
- Utility function `cn()` for class merging
- Exportable enums via `adsmurai-dsr-react/enums`
- Exportable types via `adsmurai-dsr-react/types`
