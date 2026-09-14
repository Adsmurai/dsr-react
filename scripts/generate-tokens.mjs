/**
 * Generates the design-token layer from the SCSS source of
 * @adsmurai/design-system, which is the single source of truth.
 *
 * Why compile the SCSS instead of transcribing values: the token values are
 * computed (`$spacing-6: 3 * $unit`), the palette changes across DS majors,
 * and the DS spec itself says never to hardcode a hex, a radius or a font
 * size. Compiling means a DS bump regenerates the tokens instead of silently
 * drifting from them.
 *
 * Outputs (all committed, so a DS bump shows up as a reviewable diff):
 *   src/styles/theme.css      shadcn tokens as :root custom properties
 *   src/tailwind/preset.js    Tailwind preset (ESM)
 *   src/tailwind/preset.cjs   Tailwind preset (CJS)
 *   src/tailwind/tokens.json  raw token map, for docs and tooling
 *
 * Run with `npm run tokens`. The build runs it too, so it cannot drift.
 */
import { compileString } from 'sass';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * DS tokens to pull out of SCSS. Key = name in the emitted map,
 * value = SCSS expression evaluated against the DS config module.
 *
 * `config` forwards color/radius/spacings/breakpoints/fonts. Shadows live in
 * their own module (`components/ds-shadow`) — the DS spec calls this out as
 * the one token group that is not under `config/`.
 */
const SCSS_TOKENS = {
  // Brand ramps
  primary: 'config.$primary',
  primary400: 'config.$primary400',
  primary050: 'config.$primary050',
  primary025: 'config.$primary025',
  corporate: 'config.$corporate',
  secondary: 'config.$secondary',
  'brand-black': 'config.$brand-black',

  // Grayscale ramp
  grayscale800: 'config.$grayscale800',
  grayscale500: 'config.$grayscale500',
  grayscale100: 'config.$grayscale100',
  grayscale075: 'config.$grayscale075',
  grayscale050: 'config.$grayscale050',

  // Neutrals and surfaces
  neutral01: 'config.$neutral01',
  neutral02: 'config.$neutral02',
  neutral03: 'config.$neutral03',
  'bg-card': 'config.$bg-card',
  white: 'config.$white',

  // State
  'system-success': 'config.$system-success',
  'system-warning': 'config.$system-warning',
  'system-error': 'config.$system-error',
  'system-info': 'config.$system-info',

  // Radius
  'radius-0': 'config.$radius-0',
  'radius-2': 'config.$radius-2',
  'radius-4': 'config.$radius-4',
  'radius-8': 'config.$radius-8',
  'radius-12': 'config.$radius-12',
  'radius-16': 'config.$radius-16',
  'radius-24': 'config.$radius-24',
  'radius-32': 'config.$radius-32',
  'radius-999': 'config.$radius-999',

  // Spacing (9 steps derived from $unit)
  unit: 'config.$unit',
  'spacing-1': 'config.$spacing-1',
  'spacing-2': 'config.$spacing-2',
  'spacing-3': 'config.$spacing-3',
  'spacing-4': 'config.$spacing-4',
  'spacing-5': 'config.$spacing-5',
  'spacing-6': 'config.$spacing-6',
  'spacing-7': 'config.$spacing-7',
  'spacing-8': 'config.$spacing-8',
  'spacing-9': 'config.$spacing-9',

  // Breakpoints
  'bp-xs': 'map.get(config.$breakpoints, xs)',
  'bp-sm': 'map.get(config.$breakpoints, sm)',
  'bp-md': 'map.get(config.$breakpoints, md)',
  'bp-lg': 'map.get(config.$breakpoints, lg)',
  'bp-xl': 'map.get(config.$breakpoints, xl)',

  // Font families
  'ff-title': 'config.$ff-title',
  'ff-body': 'config.$ff-body',
  'ff-mono': 'config.$ff-mono',

  // Shadows (purple-tinted: built from alphas of $brand-black)
  'shadow-xs': 'shadow.$shadow-xs',
  'shadow-sm': 'shadow.$shadow-sm',
  'shadow-md': 'shadow.$shadow-md',
  'shadow-lg': 'shadow.$shadow-lg',
};

function readDsTokens() {
  const decls = Object.entries(SCSS_TOKENS)
    .map(([name, expr]) => `  --${name}: #{${expr}};`)
    .join('\n');

  const source = `
@use "sass:map";
@use "@adsmurai/design-system/scss/config/config" as config;
@use "@adsmurai/design-system/scss/components/ds-shadow" as shadow;
:root {
${decls}
}
`;

  const { css } = compileString(source, { loadPaths: [resolve(root, 'node_modules')] });

  const tokens = {};
  for (const [, name, value] of css.matchAll(/--([\w-]+):\s*([^;]+);/g)) {
    tokens[name] = value.trim();
  }

  const missing = Object.keys(SCSS_TOKENS).filter((k) => !(k in tokens));
  if (missing.length) {
    throw new Error(`SCSS did not resolve these tokens: ${missing.join(', ')}`);
  }
  return tokens;
}

/**
 * shadcn's Tailwind convention is `colors.x = 'hsl(var(--x))'`, so the custom
 * property has to hold bare HSL channels, not a colour function. sidebar.tsx
 * relies on this directly via `hsl(var(--sidebar-border))`.
 */
function hexToHslChannels(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!m) throw new Error(`Not a solid hex colour, cannot convert to HSL: "${hex}"`);
  const [r, g, b] = m.slice(1).map((h) => parseInt(h, 16) / 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;

  let h = 0;
  let s = 0;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const round = (n, p = 1) => Number(n.toFixed(p));
  return `${round(h)} ${round(s * 100)}% ${round(l * 100)}%`;
}

/**
 * shadcn token -> DS token. This is the brand decision layer: everything else
 * in this script is mechanical.
 *
 * Only the tokens actually referenced by `src/components/ui/**` are emitted;
 * `--card` is included even though Card doesn't use it, because it is part of
 * the shadcn contract a consumer may extend.
 */
const SHADCN_COLORS = {
  background: 'neutral01',
  foreground: 'grayscale800',
  card: 'bg-card',
  'card-foreground': 'grayscale800',
  popover: 'white',
  'popover-foreground': 'grayscale800',
  primary: 'primary',
  'primary-foreground': 'white',
  secondary: 'grayscale050',
  'secondary-foreground': 'grayscale800',
  muted: 'grayscale050',
  'muted-foreground': 'grayscale500',
  accent: 'primary050',
  'accent-foreground': 'primary',
  destructive: 'system-error',
  'destructive-foreground': 'white',
  border: 'grayscale100',
  input: 'grayscale100',
  ring: 'primary',

  // Sidebar surface is a light purple tint of the brand, per DS $neutral03.
  'sidebar-background': 'neutral03',
  'sidebar-foreground': 'grayscale800',
  'sidebar-accent': 'primary050',
  'sidebar-accent-foreground': 'primary',
  'sidebar-border': 'grayscale100',
  'sidebar-ring': 'primary',

  // chart.tsx documents `hsl(var(--chart-N))` as the way to colour a series.
  'chart-1': 'primary',
  'chart-2': 'system-success',
  'chart-3': 'system-warning',
  'chart-4': 'system-error',
  'chart-5': 'primary400',
};

function buildThemeCss(ds) {
  const lines = Object.entries(SHADCN_COLORS).map(
    ([token, dsKey]) => `    --${token}: ${hexToHslChannels(ds[dsKey])}; /* $${dsKey} ${ds[dsKey]} */`,
  );

  return `/**
 * Generated by scripts/generate-tokens.mjs from @adsmurai/design-system.
 * Do not edit by hand — run \`npm run tokens\`.
 *
 * These are defaults, not overrides. The whole block sits in a native
 * \`@layer base\`, which ranks BELOW unlayered rules, so an app that already
 * defines its own \`:root\` theme (any shadcn/Lovable project) keeps winning
 * with no configuration. Apps without one get the Adsmurai palette.
 *
 * Values are bare HSL channels because that is what Tailwind's
 * \`hsl(var(--token))\` convention and sidebar.tsx both expect.
 */
@layer base {
  :root {
${lines.join('\n')}
    --radius: ${ds['radius-8']}; /* $radius-8 — DS: 8px is the step for containers, cards and dropdowns */
  }
}
`;
}

function buildPreset(ds) {
  const px = (v) => v.trim();
  const hsl = (t) => `hsl(var(--${t}))`;
  const withOpacity = (t) => `hsl(var(--${t}) / <alpha-value>)`;

  /**
   * SCSS interpolation strips the quotes off `"Hanken Grotesk"`, and an
   * unquoted multi-word family name is valid CSS but brittle. Emit an array
   * and re-quote anything that isn't a bare identifier.
   */
  const fontStack = (v) =>
    v
      .split(',')
      .map((part) => part.trim().replace(/^["']|["']$/g, ''))
      .map((name) => (/^[a-zA-Z-]+$/.test(name) ? name : `"${name}"`));

  const preset = {
    darkMode: ['class'],
    // No `content` here on purpose: Tailwind does not honour a `content` glob
    // declared in a preset (verified against Tailwind 3, with and without a
    // `content` in the consuming config). The library's own classes are
    // pre-compiled into dist/styles.css instead — see
    // scripts/build-utilities.mjs — so a consumer needs no glob at all.
    theme: {
      // DS breakpoints, NOT Tailwind's defaults. Only `md: 768px` coincides,
      // and it is shifted: DS `sm` equals Tailwind's default `md`.
      screens: {
        xs: px(ds['bp-xs']),
        sm: px(ds['bp-sm']),
        md: px(ds['bp-md']),
        lg: px(ds['bp-lg']),
        xl: px(ds['bp-xl']),
      },
      extend: {
        colors: {
          border: withOpacity('border'),
          input: withOpacity('input'),
          ring: withOpacity('ring'),
          background: withOpacity('background'),
          foreground: withOpacity('foreground'),
          primary: {
            DEFAULT: withOpacity('primary'),
            foreground: withOpacity('primary-foreground'),
          },
          secondary: {
            DEFAULT: withOpacity('secondary'),
            foreground: withOpacity('secondary-foreground'),
          },
          destructive: {
            DEFAULT: withOpacity('destructive'),
            foreground: withOpacity('destructive-foreground'),
          },
          muted: {
            DEFAULT: withOpacity('muted'),
            foreground: withOpacity('muted-foreground'),
          },
          accent: {
            DEFAULT: withOpacity('accent'),
            foreground: withOpacity('accent-foreground'),
          },
          popover: {
            DEFAULT: withOpacity('popover'),
            foreground: withOpacity('popover-foreground'),
          },
          card: {
            DEFAULT: withOpacity('card'),
            foreground: withOpacity('card-foreground'),
          },
          sidebar: {
            DEFAULT: hsl('sidebar-background'),
            foreground: hsl('sidebar-foreground'),
            accent: hsl('sidebar-accent'),
            'accent-foreground': hsl('sidebar-accent-foreground'),
            border: hsl('sidebar-border'),
            ring: hsl('sidebar-ring'),
          },
          chart: {
            1: hsl('chart-1'),
            2: hsl('chart-2'),
            3: hsl('chart-3'),
            4: hsl('chart-4'),
            5: hsl('chart-5'),
          },
        },
        borderRadius: {
          none: px(ds['radius-0']),
          xs: px(ds['radius-2']),
          sm: px(ds['radius-4']),
          DEFAULT: px(ds['radius-8']),
          md: px(ds['radius-8']),
          lg: px(ds['radius-12']),
          xl: px(ds['radius-16']),
          '2xl': px(ds['radius-24']),
          '3xl': px(ds['radius-32']),
          full: px(ds['radius-999']),
        },
        fontFamily: {
          // $ff-body is the base font on html/body per DS base/_common.scss
          sans: fontStack(ds['ff-body']),
          title: fontStack(ds['ff-title']),
          body: fontStack(ds['ff-body']),
          mono: fontStack(ds['ff-mono']),
        },
        boxShadow: {
          xs: ds['shadow-xs'],
          sm: ds['shadow-sm'],
          DEFAULT: ds['shadow-sm'],
          md: ds['shadow-md'],
          lg: ds['shadow-lg'],
        },
        spacing: {
          // DS steps live alongside Tailwind's default numeric scale.
          // Note there is deliberately no 20px step between -5 and -6.
          'ds-1': px(ds['spacing-1']),
          'ds-2': px(ds['spacing-2']),
          'ds-3': px(ds['spacing-3']),
          'ds-4': px(ds['spacing-4']),
          'ds-5': px(ds['spacing-5']),
          'ds-6': px(ds['spacing-6']),
          'ds-7': px(ds['spacing-7']),
          'ds-8': px(ds['spacing-8']),
          'ds-9': px(ds['spacing-9']),
        },
      },
    },
  };

  // Line comments, not a block: the usage example contains a `**/*` glob, and
  // that closes a block comment early — which silently produces an invalid
  // preset file.
  const banner = `// Tailwind preset for adsmurai-dsr-react.
// Generated by scripts/generate-tokens.mjs — do not edit by hand.
//
// OPTIONAL. The library's own components are already styled by
// \`adsmurai-dsr-react/styles\`; you only need this preset if you want to write
// YOUR OWN markup against the Adsmurai design tokens — the DS colour palette,
// its breakpoints (xs 576 / sm 768 / md 992 / lg 1200 / xl 1440, which are NOT
// Tailwind's defaults), radii, fonts and purple-tinted shadows.
//
// Usage:
//   import dsrPreset from 'adsmurai-dsr-react/preset';
//   export default { presets: [dsrPreset], content: ['./src/**/*.{ts,tsx}'] };
//
// Colour utilities resolve against the custom properties in
// \`adsmurai-dsr-react/theme.css\`, so import that too.`;

  const body = JSON.stringify(preset, null, 2);
  return {
    esm: `${banner}\nexport default ${body};\n`,
    cjs: `${banner}\nmodule.exports = ${body};\n`,
    json: preset,
  };
}

const ds = readDsTokens();
const preset = buildPreset(ds);

mkdirSync(resolve(root, 'src/styles'), { recursive: true });
mkdirSync(resolve(root, 'src/tailwind'), { recursive: true });

writeFileSync(resolve(root, 'src/styles/theme.css'), buildThemeCss(ds));
writeFileSync(resolve(root, 'src/tailwind/preset.js'), preset.esm);
writeFileSync(resolve(root, 'src/tailwind/preset.cjs'), preset.cjs);
writeFileSync(
  resolve(root, 'src/tailwind/tokens.json'),
  `${JSON.stringify({ ds, shadcn: SHADCN_COLORS, preset: preset.json }, null, 2)}\n`,
);

console.log(
  `tokens: ${Object.keys(ds).length} DS tokens -> ${Object.keys(SHADCN_COLORS).length} shadcn tokens`,
);
console.log(`  breakpoints: ${['xs', 'sm', 'md', 'lg', 'xl'].map((b) => `${b}=${ds[`bp-${b}`]}`).join(' ')}`);
console.log('  wrote src/styles/theme.css, src/tailwind/preset.{js,cjs}, src/tailwind/tokens.json');
