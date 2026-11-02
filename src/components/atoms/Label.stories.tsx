import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '@/components/atoms';

const meta = {
  title: 'Atoms/Label',
  component: Label,
  args: { children: 'Email address' },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
