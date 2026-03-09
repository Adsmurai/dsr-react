import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
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
