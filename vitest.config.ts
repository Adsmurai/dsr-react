import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    server: {
      deps: {
        // DSR 15 imports raw CSS from its ESM entry (lib/styles/base.css).
        // Inlining lets Vite transform it instead of Node choking on ".css".
        inline: ['@adsmurai/design-system-react'],
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/components/ui/**/*.tsx'],
      exclude: ['src/components/ui/index.ts', '**/*.test.tsx'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
