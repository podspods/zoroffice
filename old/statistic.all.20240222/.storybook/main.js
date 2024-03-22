/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ["../components/**/*.mdx", "../components/**/*.stories.tsx", "../app/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    '@storybook/addon-styling'
  ],
  staticDirs: ['./msw'],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  core:{
    disableTelemetry: true
  },
  typescript: {
    tsconfigPath: '../tsconfig.json'
  }
};
export default config;
