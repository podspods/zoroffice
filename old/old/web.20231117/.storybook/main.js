/** @type { import('@storybook/nextjs').StorybookConfig } */

  const config = {
    stories: ["../components/**/*.mdx", 
    '../app/[lang]/notifications/**/*.stories.tsx',
    "../components/**/*.stories.tsx"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    '@storybook/addon-styling'
  ],
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
    check: true,
    tsconfigPath: '../tsconfig.json'
  }
};
export default config;
