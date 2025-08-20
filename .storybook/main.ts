import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  framework: "@storybook/react-webpack5",
  stories: ["../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../src/**/*.mdx"],
  addons: ["@storybook/addon-webpack5-compiler-swc", "@storybook/addon-docs", "storybook-css-modules", "@storybook/preset-scss"],
  staticDirs: ["../public"],
};

export default config;
