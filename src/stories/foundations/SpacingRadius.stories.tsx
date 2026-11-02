import type { Meta, StoryObj } from '@storybook/react-vite';
import { tokens, type TokenName } from '@/tokens';

const byPrefix = (prefix: string) => (Object.keys(tokens) as TokenName[]).filter((n) => n.startsWith(prefix));

function SpacingRadius() {
  return (
    <div className="grid gap-layout-xs">
      {['component', 'layout', 'inset', 'gap'].map((group) => (
        <section key={group}>
          <h3 className="mb-gap-sm text-h6 font-semibold text-text-default-heading">Spacing / {group}</h3>
          <div className="grid gap-gap-xs">
            {byPrefix(`Spacing.${group}.`).map((name) => {
              const size = name.split('-').pop();
              return (
                <div key={name} className="grid grid-cols-[180px_1fr] items-center gap-gap-sm">
                  <code className="text-caption">
                    {group}-{size}
                  </code>
                  <div className="h-3 rounded-xs bg-primary" style={{ width: tokens[name].var }} />
                </div>
              );
            })}
          </div>
        </section>
      ))}
      <section>
        <h3 className="mb-gap-sm text-h6 font-semibold text-text-default-heading">Border radius</h3>
        <div className="flex flex-wrap gap-gap-md">
          {byPrefix('Border-Radius.').map((name) => (
            <div key={name} className="grid justify-items-center gap-gap-xs">
              <div className="size-16 border-2 border-primary bg-primary-100" style={{ borderRadius: tokens[name].var }} />
              <code className="text-caption">{name.replace('Border-Radius.', '')}</code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: 'Foundations/Spacing & Radius',
  component: SpacingRadius,
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof SpacingRadius>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tokens: Story = {};
