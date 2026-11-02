import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from '@/components/atoms';

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  args: { placeholder: 'Type your message here.', 'aria-label': 'Message' },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Invalid: Story = { args: { 'aria-invalid': true } };
export const Disabled: Story = { args: { disabled: true } };
