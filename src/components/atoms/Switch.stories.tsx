import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Label, Switch } from '@/components/atoms';

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  args: { onCheckedChange: fn() },
  render: (args) => (
    <div className="flex items-center gap-gap-xs">
      <Switch id="airplane" {...args} />
      <Label htmlFor="airplane">Airplane mode</Label>
    </div>
  ),
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
