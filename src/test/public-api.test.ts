/**
 * Guards the public API surface.
 *
 * The failure this prevents: a component file exports something useful
 * (`ICON_SIZES`, `Rating`, `AlertTitle`…) and nobody re-exports it from the
 * barrel, so it is unreachable from `adsmurai-dsr-react`. That had happened to
 * 32 constants and 15 components, while COMPONENT-STATUS.md recorded them as
 * done — the tracking doc asserted work that never reached consumers.
 *
 * The rule is "assert, don't generate". A generated `export *` barrel would
 * leak internals (`reducer` from use-toast), re-export enums that must only
 * come from `/enums`, and collide on the two `Toaster`s and two
 * `ChartLegend`s. So instead every non-exported name needs an entry in
 * KNOWN_PRIVATE with a written reason, which forces one deliberate decision
 * per name instead of silent drift.
 */
/// <reference types="vite/client" />
import { describe, it, expect } from 'vitest';
import * as barrel from '@/components/ui';
import * as enums from '@/enums';

/** Modules whose runtime exports make up the component surface. */
const modules = import.meta.glob('../components/ui/**/*.{ts,tsx}', { eager: true }) as Record<
  string,
  Record<string, unknown>
>;

const SKIP_FILES = /(\.stories\.|\.test\.|\/index\.ts$)/;

/**
 * Names deliberately not on the public API, each with the reason.
 * Adding a name here is a decision; leaving it out is a test failure.
 */
const KNOWN_PRIVATE: Record<string, string> = {
  // Internal state machine for the toast system; `useToast`/`toast` are the API.
  reducer: 'internal implementation detail of use-toast',

  // Enums must be reached through `adsmurai-dsr-react/enums` only. Several
  // component files re-export them locally for convenience; the barrel
  // deliberately does not forward them.
  IconsEnum: 'enums are exported from /enums only',
  ButtonVariantEnum: 'enums are exported from /enums only',
  BadgeColorEnum: 'enums are exported from /enums only',
  AlertTypeEnum: 'enums are exported from /enums only',
  EventListPositionSelectedEnum: 'enums are exported from /enums only',
  SocialIconColorEnum: 'enums are exported from /enums only',
  IconBaseTypeEnum: 'enums are exported from /enums only',
  TypographyColorEnum: 'enums are exported from /enums only',
  ThemesEnum: 'enums are exported from /enums only',

  // A second, competing way to build a dropdown. DS 3.0 is explicit that
  // SelectV2 (our `Select`) is the supported path, and exposing the Radix
  // composition too would give a code generator two incompatible APIs.
  SelectComposed: 'competing API — use Select; see AI-INSTRUCTIONS.md',
  SelectGroup: 'competing API — use Select',
  SelectValue: 'competing API — use Select',
  SelectTrigger: 'competing API — use Select',
  SelectContent: 'competing API — use Select',
  SelectLabel: 'competing API — use Select',
  SelectItem: 'competing API — use Select',
  SelectSeparator: 'competing API — use Select',
  SelectScrollUpButton: 'competing API — use Select',
  SelectScrollDownButton: 'competing API — use Select',

  // Raw DSR escape hatch. Consumers must not reach DSR directly.
  DSRPopover: 'raw DSR component — consumers must not import DSR directly',

  // Name collides with the DSR-backed ChartLegend; the barrel exports this one
  // as ChartLegendBase instead.
  ChartLegend: 'exported as ChartLegendBase to avoid colliding with chart-legend.tsx',

  // sonner.tsx re-exports these under different names because `Toaster` and
  // `toast` already belong to the useToast system: the barrel exports them as
  // `Sonner` and `sonnerToast`.
  Toaster: 'sonner.tsx re-export — exported as Sonner by the barrel',

  // A cva() whose base and every variant are empty strings, used only to
  // derive VariantProps. Badge never applies it. Exporting it would invite
  // `className={badgeVariants({variant})}`, which yields no styling at all —
  // the same trap as the (deprecated) buttonVariants.
  badgeVariants: 'type-derivation helper, produces no classes — see BADGE_VARIANTS',
};

function publicNames(mod: Record<string, unknown>) {
  return Object.keys(mod).filter((k) => k !== 'default' && !k.startsWith('_'));
}

describe('public API surface', () => {
  const perFile = Object.entries(modules).filter(([path]) => !SKIP_FILES.test(path));

  it('finds the component modules', () => {
    expect(perFile.length).toBeGreaterThan(80);
  });

  it('re-exports every component-module export, or records why not', () => {
    const unreachable: Array<{ name: string; file: string }> = [];

    for (const [path, mod] of perFile) {
      for (const name of publicNames(mod)) {
        if (name in barrel) continue;
        if (name in KNOWN_PRIVATE) continue;
        // Barrel aliases (e.g. Sonner, ChartLegendBase) resolve via the value.
        const aliased = (Object.values(barrel) as unknown[]).includes(mod[name]);
        if (aliased) continue;
        unreachable.push({ name, file: path.replace('../components/ui/', '') });
      }
    }

    expect(
      unreachable,
      `These are exported by their component file but unreachable from the package root.\n` +
        `Either add them to src/components/ui/index.ts, or add them to KNOWN_PRIVATE with a reason:\n` +
        unreachable.map((u) => `  ${u.name}  (${u.file})`).join('\n'),
    ).toEqual([]);
  });

  it('keeps every exportable constant reachable', () => {
    // The constants are the discoverability surface a code generator relies on
    // (`CHIP_STATUSES` tells it the valid values without guessing).
    const CONSTANT = /^[A-Z][A-Z0-9_]*$/;
    const missing: string[] = [];

    for (const [path, mod] of perFile) {
      for (const name of publicNames(mod)) {
        if (!CONSTANT.test(name)) continue;
        if (name in barrel || name in KNOWN_PRIVATE) continue;
        missing.push(`${name} (${path.replace('../components/ui/', '')})`);
      }
    }

    expect(missing, `Exportable constants missing from the barrel:\n  ${missing.join('\n  ')}`).toEqual(
      [],
    );
  });

  it('does not leak enums through the root barrel', () => {
    // `adsmurai-dsr-react/enums` is the only documented path for enums, and
    // AI-INSTRUCTIONS.md states importing them from the root is an error.
    const leaked = Object.keys(enums).filter((name) => name in barrel);
    expect(leaked, `Enums reachable from the root barrel: ${leaked.join(', ')}`).toEqual([]);
  });
});
