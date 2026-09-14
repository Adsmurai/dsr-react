import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import { copyFileSync } from 'fs';
import { resolve } from 'path';

/**
 * The token layer is generated (see scripts/generate-tokens.mjs) and lives in
 * src/ so a DS bump shows up as a reviewable diff. It isn't part of the JS
 * graph, so copy it into dist/ where the ./theme.css and ./preset exports
 * point. `files: ["dist"]` then picks it up for the tarball.
 */
function copyTokenLayer(): Plugin {
  const assets = [
    ['src/styles/theme.css', 'dist/theme.css'],
    ['src/tailwind/preset.js', 'dist/preset.js'],
    ['src/tailwind/preset.cjs', 'dist/preset.cjs'],
    ['src/tailwind/tokens.json', 'dist/tokens.json'],
  ] as const;

  return {
    name: 'dsr-copy-token-layer',
    closeBundle() {
      for (const [from, to] of assets) {
        copyFileSync(resolve(__dirname, from), resolve(__dirname, to));
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    copyTokenLayer(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
      // Mirrors tsconfig.build.json: tests and stories are not public API.
      // Leaving stories in also broke dts generation for union-prop components
      // (TS4023) and shipped .stories.d.ts referencing storybook types.
      exclude: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.stories.ts',
        '**/*.stories.tsx',
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        enums: resolve(__dirname, 'src/enums/index.ts'),
        types: resolve(__dirname, 'src/types/index.ts'),
      },
      name: 'DsrReact',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-hook-form',
        'zod',
        '@hookform/resolvers',
        '@hookform/resolvers/zod',
        /^@radix-ui\//,
        'recharts',
        'lucide-react',
        'date-fns',
        'embla-carousel-react',
        'sonner',
        'cmdk',
        'next-themes',
        'react-day-picker',
        'react-resizable-panels',
        'vaul',
        'input-otp',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'react-table',
        /^@tiptap\//,
        /^@dnd-kit\//,
        /^@mui\//,
        /^@emotion\//,
        /^@adsmurai\/js-client-sdk/,
        /^notistack/,
        /^echarts/,
        /^marked/,
        /^react-beautiful-dnd/,
        /^sanitize-url/,
        /^uuid/,
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
        // preserveModules stays OFF: measured against a scratch consumer, one
        // module per file took the "import only Button" bundle from 3.53 MB to
        // 7.19 MB, because the per-module re-export tree defeats the
        // deduplication a single chunk gives us. See CHANGELOG, Known issues.
        preserveModules: false,
        assetFileNames: 'styles.[ext]',
      },
    },
    // Pinned with preserveModules on purpose: DSR imports CSS from 139 of its
    // own modules, and per-module CSS would shatter dist/styles.css and break
    // the ./styles contract.
    // Pinned: DSR imports CSS from 139 of its own modules, so per-module CSS
    // would shatter dist/styles.css and break the ./styles contract.
    cssCodeSplit: false,
    sourcemap: false,
    // The published package is public, so shipping the internal design
    // system's source unminified is an avoidable disclosure.
    minify: true,
  },
});
