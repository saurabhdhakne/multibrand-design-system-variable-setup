import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms';

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Add to library</TooltipContent>
    </Tooltip>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { defaultOpen: true } };
