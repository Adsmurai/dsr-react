/**
 * Tailwind config for Storybook only.
 *
 * The published library deliberately ships no Tailwind config — it ships a
 * *preset* (`adsmurai-dsr-react/preset`). This file consumes that same preset,
 * so Storybook renders through exactly the contract a consumer gets. If a
 * token is missing here, it is missing for consumers too.
 */
import dsrPreset from '../src/tailwind/preset.js';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [dsrPreset],
  // Point at source rather than the preset's dist glob: Storybook renders src.
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
};
