import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormField } from './FormField';

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  args: { label: 'Email', type: 'email', placeholder: 'you@company.com' },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithDescription: Story = { args: { description: "We'll never share your email." } };
export const Required: Story = { args: { required: true } };
export const WithError: Story = { args: { defaultValue: 'jane@', error: 'Enter a valid email address' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'jane@company.com' } };
