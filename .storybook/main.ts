import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@chromatic-com/storybook",
  ],
  framework: "@storybook/react-vite",
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": resolve(__dirname, "../src"),
        },
      },
      // Scoped to Storybook on purpose: a root postcss.config would also run
      // Tailwind over DSR's CSS during the library build and change the
      // published styles.css.
      css: {
        postcss: {
          plugins: [
            tailwindcss({ config: resolve(__dirname, "tailwind.config.js") }),
            autoprefixer(),
          ],
        },
      },
    });
  },
};

export default config;
