import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRightIcon, LoaderCircleIcon, MailIcon, PlusIcon } from 'lucide-react';
import { fn } from 'storybook/test';
import { Button } from '@/components/atoms';

const variants = ['default', 'secondary', 'outline', 'ghost', 'link', 'destructive'] as const;
const sizes = ['xs', 'sm', 'default', 'lg'] as const;

const meta = {
  title: 'Atoms/Button',
  component: Button,
  args: { children: 'Button', onClick: fn() },
  argTypes: {
    variant: { control: 'select', options: variants },
    size: { control: 'select', options: [...sizes, 'icon', 'icon-xs', 'icon-sm', 'icon-lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-gap-sm">
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-gap-sm">
      {sizes.map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-gap-sm">
      <Button {...args}>
        <MailIcon /> Login with email
      </Button>
      <Button {...args} variant="outline">
        Continue <ArrowRightIcon />
      </Button>
      <Button {...args} size="icon" aria-label="Add">
        <PlusIcon />
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: { disabled: true },
  render: (args) => (
    <Button {...args}>
      <LoaderCircleIcon className="animate-spin" /> Please wait
    </Button>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
