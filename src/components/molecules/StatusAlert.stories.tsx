import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusAlert } from './StatusAlert';

const meta = {
  title: 'Molecules/StatusAlert',
  component: StatusAlert,
  args: { status: 'information', title: 'Heads up!', children: 'You can switch brand and theme from the toolbar.' },
  decorators: [(Story) => <div className="max-w-lg"><Story /></div>],
} satisfies Meta<typeof StatusAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Information: Story = {};
export const Success: Story = { args: { status: 'success', title: 'Saved', children: 'Your changes were saved.' } };
export const Warning: Story = { args: { status: 'warning', title: 'Storage almost full', children: '92% of 10 GB used.' } };
export const Error: Story = { args: { status: 'error', title: 'Payment failed', children: 'Your card was declined.' } };

export const AllStatuses: Story = {
  render: () => (
    <div className="grid gap-gap-sm">
      <StatusAlert status="information" title="Information" />
      <StatusAlert status="success" title="Success" />
      <StatusAlert status="warning" title="Warning" />
      <StatusAlert status="error" title="Error" />
    </div>
  ),
};
