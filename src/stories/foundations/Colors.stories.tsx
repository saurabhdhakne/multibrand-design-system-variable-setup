import type { Meta, StoryObj } from '@storybook/react-vite';
import { tokens, type TokenName } from '@/tokens';

/** Group color tokens by collection, then by their first path segment (text, surface, Primary, Blue…). */
function groups(collection: string) {
  const out = new Map<string, TokenName[]>();
  for (const name of Object.keys(tokens) as TokenName[]) {
    const t = tokens[name];
    if (t.collection !== collection || t.type !== 'color') continue;
    const group = name.split('.')[0];
    out.set(group, [...(out.get(group) ?? []), name]);
  }
  return [...out];
}

function Palette({ collection }: { collection: string }) {
  return (
    <div className="grid gap-layout-xs">
      {groups(collection).map(([group, names]) => (
        <section key={group}>
          <h3 className="mb-gap-sm text-h6 font-semibold text-text-default-heading">{group}</h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-gap-sm">
            {names.map((name) => (
              <div key={name} className="grid min-w-0 gap-gap-xs">
                <div className="h-12 rounded-md border" style={{ background: tokens[name].var }} />
                <code className="text-caption break-all">{name}</code>
                <small className="text-caption break-all text-muted-foreground">{tokens[name].cssName}</small>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

const meta = {
  title: 'Foundations/Colors',
  component: Palette,
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof Palette>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Semantic tokens components use. Change Theme in the toolbar to see Light/Dark. */
export const Mapped: Story = { args: { collection: 'Mapped' } };
/** Brand aliases. Change Brand in the toolbar to see Ocean/Natural. */
export const Alias: Story = { args: { collection: 'Alias' } };
/** Raw palette. Don't use these directly in components. */
export const Primitives: Story = { args: { collection: 'Brand' } };
