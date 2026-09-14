import type { Preview } from "@storybook/react-vite";

import "./preview.css";

const preview: Preview = {
  parameters: {
    // DS breakpoints, so a story can be checked at the widths the library's
    // own media queries actually use.
    viewport: {
      options: {
        dsXs: { name: "DS xs (576)", styles: { width: "576px", height: "900px" } },
        dsSm: { name: "DS sm (768)", styles: { width: "768px", height: "900px" } },
        dsMd: { name: "DS md (992)", styles: { width: "992px", height: "900px" } },
        dsLg: { name: "DS lg (1200)", styles: { width: "1200px", height: "900px" } },
        dsXl: { name: "DS xl (1440)", styles: { width: "1440px", height: "900px" } },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "DSR Components",
          [
            "Button",
            "Badge",
            "Input",
            "Select",
            "Checkbox",
            "RadioGroup",
            "Switch",
            "Tabs",
            "Card",
            "Alert",
            "Modal",
            "Tooltip",
            "Accordion",
            "Chip",
            "DataTable",
            "*",
          ],
          "Custom Components",
          ["Dialog", "Sheet", "Carousel", "Form", "*"],
        ],
      },
    },
  },
};

export default preview;
