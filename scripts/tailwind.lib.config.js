/**
 * Tailwind config used ONLY to pre-compile the library's own utility classes
 * into the published stylesheet (see scripts/build-utilities.mjs).
 *
 * Why this exists: a Tailwind `content` glob declared inside a *preset* is not
 * honoured — verified against Tailwind 3, both with and without a `content` in
 * the consuming config. So we cannot make a consumer scan our `dist` just by
 * shipping a preset. Compiling our classes ourselves removes the need entirely:
 * the consumer imports one stylesheet and the components look right.
 */
import dsrPreset from '../src/tailwind/preset.js';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [dsrPreset],
  // Only the component sources — stories and tests are not shipped.
  content: [
    './src/components/**/*.{ts,tsx}',
    './src/hooks/**/*.{ts,tsx}',
    '!./src/**/*.stories.tsx',
    '!./src/**/*.test.tsx',
  ],
};
