/**
 * Assembles the single stylesheet a consumer has to import.
 *
 * `dist/styles.css` after this step = three layers, in this order:
 *
 *   1. DSR's own CSS (274 `.e-*` classes), emitted by the vite build because
 *      DSR's ESM entry imports it.
 *   2. The shadcn token defaults, wrapped in a native `@layer base` so an app
 *      with its own `:root` theme keeps winning.
 *   3. The Tailwind utilities this library's components actually use.
 *
 * Why all three in one file: every extra setup step is a step an AI code
 * generator omits. One mandatory import (`adsmurai-dsr-react/styles`) and the
 * components render correctly with no Tailwind config in the consuming app.
 * `./theme.css` and `./preset` stay available for consumers who want the
 * tokens in their own markup.
 *
 * Layer 3 has to be compiled here rather than scanned by the consumer:
 * a Tailwind `content` glob declared in a preset is not honoured (verified
 * against Tailwind 3, with and without a `content` in the consuming config),
 * so there is no way to make a consumer scan our dist for us.
 *
 * Emits `components` + `utilities` but NOT `base` — shipping Tailwind's
 * preflight would reset the consuming app's own styles.
 */
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = resolve(root, 'dist/styles.css');

const DSR_MARKER = '/* --- 1/3 @adsmurai/design-system-react CSS --- */';
const THEME_MARKER = '/* --- 2/3 design token defaults (see ./theme.css) --- */';
const UTIL_MARKER = '/* --- 3/3 precompiled component utilities --- */';

if (!existsSync(target)) {
  throw new Error(`dist/styles.css not found — run the vite build first (${target})`);
}

const current = readFileSync(target, 'utf8');
// Idempotent: strip anything a previous run appended.
const dsrCss = (current.includes(THEME_MARKER) ? current.slice(0, current.indexOf(THEME_MARKER)) : current)
  .replace(DSR_MARKER, '')
  .trimEnd();

const theme = readFileSync(resolve(root, 'src/styles/theme.css'), 'utf8');

const { css: utilities } = await postcss([
  tailwindcss({ config: resolve(root, 'scripts/tailwind.lib.config.js') }),
]).process('@tailwind components;\n@tailwind utilities;\n', { from: undefined });

const composed = [
  DSR_MARKER,
  dsrCss,
  '',
  THEME_MARKER,
  theme.trimEnd(),
  '',
  UTIL_MARKER,
  utilities.trimEnd(),
  '',
].join('\n');

writeFileSync(target, composed);

const kb = (s) => `${(Buffer.byteLength(s) / 1024).toFixed(1)} kB`;
const classes = new Set([...utilities.matchAll(/^\.([\w\\:./[\]()#%-]+)\s*[,{]/gm)].map((m) => m[1]));
console.log(
  `styles: DSR ${kb(dsrCss)} + tokens ${kb(theme)} + ${classes.size} utilities ${kb(utilities)} = ${kb(composed)}`,
);
