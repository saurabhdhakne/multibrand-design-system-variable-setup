import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Button } from '@/components/atoms';
import { ThemeSwitcher } from './ThemeSwitcher';

const meta = {
  title: 'Molecules/ThemeSwitcher',
  component: ThemeSwitcher,
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Built from the Figma collections in the token export: add a mode in Figma and it shows up here. */
export const Default: Story = {
  render: () => (
    <div className="grid gap-gap-md">
      <ThemeSwitcher />
      <div className="flex flex-wrap gap-gap-sm">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Badge variant="success">Success</Badge>
      </div>
    </div>
  ),
};
