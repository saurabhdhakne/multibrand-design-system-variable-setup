import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { AppHeader } from './AppHeader';

const meta = {
  title: 'Organisms/AppHeader',
  component: AppHeader,
  parameters: { layout: 'fullscreen' },
  args: {
    productName: 'Acme',
    nav: [
      { label: 'Dashboard', href: '#dashboard' },
      { label: 'Projects', href: '#projects' },
      { label: 'Team', href: '#team' },
      { label: 'Reports', href: '#reports' },
    ],
    activeHref: '#dashboard',
    user: { name: 'Saurabh Dhakne', email: 'saurabh@company.com' },
    onSearch: fn(),
    onSignOut: fn(),
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutNav: Story = { args: { nav: [] } };
