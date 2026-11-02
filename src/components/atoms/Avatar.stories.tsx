import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarFallback } from '@/components/atoms';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback className="bg-primary-100 text-primary-800">SD</AvatarFallback>
    </Avatar>
  ),
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fallback: Story = {};
export const Large: Story = { args: { className: 'size-14' } };
