import type { StorybookConfig } from '@storybook/react-vite';

// Vite config (Tailwind, `@/` alias) is picked up from the project's vite.config.ts.
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
};

export default config;
