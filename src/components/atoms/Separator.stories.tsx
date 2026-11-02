import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '@/components/atoms';

const meta = {
  title: 'Atoms/Separator',
  component: Separator,
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <p className="text-body-sm font-medium">Design system</p>
      <p className="text-caption text-muted-foreground">Figma tokens, shadcn components.</p>
      <Separator {...args} className="my-gap-md" />
      <p className="text-caption">Footer content</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <div className="flex h-5 items-center gap-gap-sm text-body-sm">
      Docs <Separator {...args} /> Source <Separator {...args} /> Changelog
    </div>
  ),
};
