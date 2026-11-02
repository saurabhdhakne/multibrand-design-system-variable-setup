import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserChip } from './UserChip';

const meta = {
  title: 'Molecules/UserChip',
  component: UserChip,
  args: { name: 'Saurabh Dhakne', email: 'saurabh@company.com' },
} satisfies Meta<typeof UserChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithRole: Story = { args: { role: 'Admin' } };
export const NameOnly: Story = { args: { email: undefined } };
