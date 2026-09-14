/**
 * PROTOTYPE — not wired into the build. Do not import from src/.
 *
 * Proves that this package can be made tree-shakeable without publishing the
 * design system separately and without any change on the DSR side. Measured on
 * React 18 against a scratch Vite consumer:
 *
 *   import { Button }   3,534 kB -> 467 kB JS  (1,089 -> 154 kB gzip)
 *                         284 kB ->  10 kB CSS
 *   MUI / ECharts / Tiptap / Recharts: present -> absent
 *   Types resolve, nothing extra to install, verified rendering in a browser.
 *
 * How it works. DSR ships as a per-file ESM tree, which is fully
 * tree-shakeable; bundling it collapses that into one 1.7 MB blob. This script
 * keeps the tree instead:
 *
 *   1. copies DSR's `lib/` into dist/vendor/dsr (including its own
 *      lib/node_modules — DSR references its pinned third-party copies by
 *      relative path, so that directory is what makes the tree self-contained)
 *   2. patches DSR's vendored `react/jsx-runtime` and `react-dom/client`
 *      references back to bare specifiers, so the consumer's single React
 *      instance is used instead of a second bundled copy
 *   3. rewrites our own emitted `@adsmurai/design-system-react` imports to a
 *      relative path into that vendored tree
 *
 * To use it, three things have to change together — none of them alone helps
 * (DSR external alone measured 3.65 MB, preserveModules alone measured 7.19 MB):
 *
 *   - vite.config.ts: add /^@adsmurai\/design-system(-react)?/ to
 *     `rollupOptions.external`, set `output.preserveModules: true` with
 *     `entryFileNames: '[name].js'`, and keep `cssCodeSplit: false`
 *   - vite.config.ts: `build.lib.formats: ['es']` and package.json drops
 *     `main` plus every `require` condition — DSR's exports map has no
 *     `require` condition, so a CJS build cannot resolve it
 *   - run this after `vite build`, in place of `npm run styles`
 *
 * Known costs: ESM-only, tarball 1.01 -> 1.42 MB, 104 published files instead
 * of 5, and `./styles` shrinks to tokens plus our own utilities because DSR's
 * CSS then arrives per component through its own imports.
 *
 * See CHANGELOG.md, 2.0.0 "Known issues".
 */
import { cpSync, readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { resolve, dirname, relative, join } from 'node:path';
const root = '/home/javimg/projects/lovable/dsr-react';
const src = resolve(root, 'node_modules/@adsmurai/design-system-react/lib');
const vendorDir = resolve(root, 'dist/vendor/dsr');
const SPEC = '@adsmurai/design-system-react';
mkdirSync(vendorDir, { recursive: true });
cpSync(src, vendorDir, { recursive: true, filter: (f) => {
  if (statSync(f).isDirectory()) return true;
  if (/\.map$/.test(f)) return false;
  if (/\.(test|stories|spec)\./.test(f)) return false;
  return /\.(js|d\.ts|css)$/.test(f);
}});
function walk(dir, skipVendor) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { if (skipVendor && p.includes('/vendor/')) continue; out.push(...walk(p, skipVendor)); }
    else if (/\.(js|ts)$/.test(e.name)) out.push(p);
  }
  return out;
}
// PARCHE: el react vendorizado de DSR -> especificador bare
let patched = 0;
for (const f of walk(vendorDir, false)) {
  const b = readFileSync(f, 'utf8');
  const a = b.replace(/(["'])(?:\.\.\/)+node_modules\/react\/jsx-runtime\.js\1/g, '"react/jsx-runtime"')
             .replace(/(["'])(?:\.\.\/)+node_modules\/react-dom\/client\.js\1/g, '"react-dom/client"');
  if (a !== b) { writeFileSync(f, a); patched++; }
}
const target = join(vendorDir, 'index.js');
let rewritten = 0;
for (const f of walk(resolve(root, 'dist'), true)) {
  const b = readFileSync(f, 'utf8');
  if (!b.includes(SPEC)) continue;
  let rel = relative(dirname(f), target); if (!rel.startsWith('.')) rel = './' + rel;
  const a = b.split(`"${SPEC}"`).join(`"${rel}"`).split(`'${SPEC}'`).join(`'${rel}'`);
  if (a !== b) { writeFileSync(f, a); rewritten++; }
}
console.log(`vendor: ${patched} ficheros de DSR parcheados (react bare), ${rewritten} nuestros reescritos`);
