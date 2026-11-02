import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@/components/atoms';

const variants = ['default', 'secondary', 'outline', 'destructive', 'information', 'success', 'warning'] as const;

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  args: { children: 'Badge' },
  argTypes: { variant: { control: 'select', options: variants } },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** `information`, `success` and `warning` are added on top of shadcn, backed by the Figma status tokens. */
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-gap-sm">
      {variants.map((variant) => (
        <Badge key={variant} {...args} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};
