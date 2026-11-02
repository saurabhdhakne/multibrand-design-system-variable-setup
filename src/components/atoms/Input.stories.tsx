import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '@/components/atoms';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  args: { placeholder: 'you@company.com', type: 'email', 'aria-label': 'Email' },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithValue: Story = { args: { defaultValue: 'jane@company.com' } };
export const Invalid: Story = { args: { defaultValue: 'not-an-email', 'aria-invalid': true } };
export const Disabled: Story = { args: { disabled: true } };
export const File: Story = { args: { type: 'file', placeholder: undefined, 'aria-label': 'Upload file' } };
