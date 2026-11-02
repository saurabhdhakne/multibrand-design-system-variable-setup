import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SettingsDialog } from './SettingsDialog';

const meta = {
  title: 'Organisms/SettingsDialog',
  component: SettingsDialog,
  args: {
    onSave: fn(),
    defaultValues: {
      displayName: 'Saurabh Dhakne',
      language: 'en',
      notifications: { email: true, push: false, weeklyDigest: true },
    },
  },
} satisfies Meta<typeof SettingsDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const Open: Story = {
  args: { defaultOpen: true },
  parameters: { docs: { story: { inline: false, iframeHeight: 560 } } },
};
