import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['**/*.test.ts', '**/*.test.tsx'],
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
        preserveModules: false,
        assetFileNames: 'styles.[ext]',
      },
    },
    sourcemap: false,
    minify: false,
  },
});
